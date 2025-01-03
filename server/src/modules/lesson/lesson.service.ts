import { funcDisturbance } from "../../common/funcArray";
import LessonModel from "../../database/models/Lesson.model";
import LessonQuestionModel, {
  QuestionDocument,
} from "../../database/models/LessonQuestion";
import QuestionModel from "../../database/models/Question.model";
import { QuizModel } from "../../database/models/Quiz.model";
import { ILessonDto } from "../../interface/lesson.interface";
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
}
