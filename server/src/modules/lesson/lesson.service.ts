import { funcDisturbance } from "../../common/funcArray";
import { formatResponse } from "../../config/response";
import LessonModel from "../../database/models/Lesson.model";
import LessonQuestionModel, {
  QuestionDocument,
} from "../../database/models/LessonQuestion";
import QuestionModel from "../../database/models/Question.model";
import { QuizModel } from "../../database/models/Quiz.model";
import { ILessonDto, ILessonPaging } from "../../interface/lesson.interface";
import { BadRequestException } from "../../utils/catch-errors";
import { generateOrderCode } from "../../utils/generateCode";
import { playerService } from "../player/player.module";

export class LessonService {
  async createLive(data: ILessonDto, userId: string) {
    const code = generateOrderCode();

    const checkQuiz = await QuizModel.findById(data.quizId);

    if (!checkQuiz) {
      throw new BadRequestException("Không tìm thấy quiz");
    }

    if (!checkQuiz.isPublic) {
      throw new BadRequestException("Quiz chưa đăng tải");
    }

    const listQuestion = await QuestionModel.find({
      quizId: data.quizId,
    });

    if (!listQuestion.length) {
      throw new BadRequestException("Không có câu hỏi");
    }

    const newLesson = await LessonModel.create({
      name: data.name,
      quizId: data.quizId,
      type: data.type,
      quizName: data.quizName,
      code,
      startAt: Date.now(),
      createBy: userId,
      totalQuestions: listQuestion.length,
    });

    if (!newLesson) {
      throw new BadRequestException("Tạo bài thất bại");
    }

    const dataQuestion = listQuestion.map((item) => ({
      aiGenerated: item.aiGenerated,
      time: item.time,
      type: item.type,
      query: item.query,
      answer: item.answer,
      options: item.options,
      lessonId: newLesson._id,
      quizId: item.quizId,
    }));

    await LessonQuestionModel.create(dataQuestion);

    await QuizModel.findByIdAndUpdate(data.quizId, {
      $inc: {
        "stats.lesson": 1,
      },
    });

    return newLesson;
  }

  async findByLessonJoin(id: string) {
    const lesson = await LessonModel.findById(id).populate("");

    if (!lesson) {
      throw new BadRequestException("Không có");
    }

    return lesson;
  }

  async playerLesson(id: string, playerId: string) {
    const lesson = await this.findByLessonJoin(id);

    if (!lesson.inRunning) {
      throw new BadRequestException("Cuộc thi đã kết thúc");
    }

    const player = await playerService.findById(playerId);

    if (player.lessonId.toString() !== lesson?._id?.toString()) {
      throw new BadRequestException("Cuộc chơi không phải bài này");
    }

    const listQuestion = await LessonQuestionModel.find({
      _id: {
        $nin: [...player.question],
      },
      lessonId: lesson._id,
    }).select("-answer");

    const countQuestion = await LessonQuestionModel.countDocuments({
      lessonId: lesson._id,
    });

    const countIndex = player.question.length;

    return {
      lesson: lesson,
      listQuestion: funcDisturbance<QuestionDocument>(listQuestion),
      countIndex,
      player,
      countQuestion,
    };
  }

  async findByIdQuestionLesson(id: string) {
    const lesson = await LessonQuestionModel.findById(id);

    if (!lesson) {
      throw new BadRequestException("Không có");
    }

    return lesson;
  }

  async paging(data: ILessonPaging) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;

    let queryDate = {};
    let queryRunning = {};

    if (data.date) {
      const dateStart = new Date(data.date);
      const endStart = new Date(data.date);
      dateStart.setHours(0, 0, 0);
      endStart.setHours(23, 59, 0);

      queryDate = {
        startAt: {
          $gte: dateStart,
          $lt: endStart,
        },
      };
    }

    if (data.typeRunning === 1) {
      queryRunning = {
        inRunning: true,
      };
    }

    if (data.typeRunning === 2) {
      queryRunning = {
        inRunning: false,
      };
    }

    const listLesson = await LessonModel.find({
      ...queryDate,
      ...queryRunning,
      deleted: data.deleted,
      createBy: data.createBy,
    })
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    const count = await LessonModel.countDocuments({
      ...queryDate,
      ...queryRunning,
      deleted: data.deleted,
    });

    const res = formatResponse({
      skip,
      limit,
      data: listLesson,
      count,
    });

    return res;
  }

  async findLessonCreateBy(id: string, userId: string) {
    const lesson = await LessonModel.findOne({
      _id: id,
      createBy: userId,
    });

    if (!lesson) {
      throw new BadRequestException("No lesson found");
    }

    return lesson;
  }

  async findLessonQuestion(lesson: string) {
    const list = await LessonQuestionModel.find({
      lessonId: lesson,
    });

    return list;
  }

  async reportsLesson(id: string, userId: string) {
    const lesson = await this.findLessonCreateBy(id, userId);

    const lessonQuestion = await this.findLessonQuestion(id);

    const player = await playerService.playerLesson(id);

    return {
      lesson,
      lessonQuestion,
      player,
    };
  }

  async endLesson(id: string, userId: string) {
    const lesson = await this.findLessonCreateBy(id, userId);
    if (!lesson.inRunning) {
      throw new BadRequestException("Bài học đã kết thúc");
    }

    const update = await LessonModel.findByIdAndUpdate(
      id,
      {
        inRunning: false,
        endedAt: Date.now(),
        code: null,
      },
      { now: true }
    );

    return update;
  }

  async joinCode(code: string) {
    const lesson = await LessonModel.findOne({
      code,
    });

    if (!lesson) {
      throw new BadRequestException("không có");
    }

    if (!lesson.inRunning) {
      throw new BadRequestException("Không còn hoạt động");
    }

    if (lesson.deleted) {
      throw new BadRequestException("Đã bị xóa");
    }

    return lesson;
  }

  async pagingAdmin(data: Omit<ILessonPaging, "createBy">) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;

    let queryDate = {};
    let queryRunning = {};

    if (data.date) {
      const dateStart = new Date(data.date);
      const endStart = new Date(data.date);
      dateStart.setHours(0, 0, 0);
      endStart.setHours(23, 59, 0);

      queryDate = {
        startAt: {
          $gte: dateStart,
          $lt: endStart,
        },
      };
    }

    if (data.typeRunning === 1) {
      queryRunning = {
        inRunning: true,
      };
    }

    if (data.typeRunning === 2) {
      queryRunning = {
        inRunning: false,
      };
    }

    const listLesson = await LessonModel.find({
      ...queryDate,
      ...queryRunning,
      deleted: data.deleted,
    })
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "createBy",
        select: "name avatar",
      });

    const count = await LessonModel.countDocuments({
      ...queryDate,
      ...queryRunning,
      deleted: data.deleted,
    });

    const res = formatResponse({
      skip,
      limit,
      data: listLesson,
      count,
    });

    return res;
  }

  async reportsLessonAdmin(id: string) {
    const lesson = await this.findByLessonJoin(id);

    const lessonQuestion = await this.findLessonQuestion(id);

    const player = await playerService.playerLesson(id);

    return {
      lesson,
      lessonQuestion,
      player,
    };
  }
}
