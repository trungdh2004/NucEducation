import { formatResponse } from "../../config/response";
import QuestionModel from "../../database/models/Question.model";
import { QuizModel } from "../../database/models/Quiz.model";
import {
  QuizDto,
  QuizPagingDto,
  QuizPagingToUserDto,
  QuizUpdateDto,
} from "../../interface/quizz.interface";
import { BadRequestException } from "../../utils/catch-errors";

export class QuizService {
  async create(data: QuizDto, userId: string) {
    const newQuiz = await QuizModel.create({
      name: data.name,
      createBy: userId,
    });

    if (!newQuiz) {
      throw new BadRequestException("Tạo bài tập thất bại");
    }

    return newQuiz;
  }

  async findById(id: string) {
    const exisQuiz = await QuizModel.findById(id).populate([
      {
        path: "createBy",
        select: "avatar name",
      },
      {
        path: "category",
      },
    ]);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    const listQuestion = await QuestionModel.find({
      quizId: exisQuiz._id,
    });

    return {
      quiz: exisQuiz,
      questions: listQuestion,
    };
  }

  async findByIdPrivate(id: string, userId: string) {
    const exisQuiz = await QuizModel.findById(id).populate("category");

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    if (exisQuiz.createBy.toString() !== userId.toString()) {
      throw new BadRequestException("Bạn không có quyền truy cập");
    }

    const listQuestion = await QuestionModel.find({
      quizId: exisQuiz._id,
    });

    return {
      quiz: exisQuiz,
      questions: listQuestion,
    };
  }

  async updateQuiz(id: string, data: QuizUpdateDto, userId: string) {
    const exisQuiz = await QuizModel.findById(id);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    if (exisQuiz.createBy.toString() !== userId.toString()) {
      throw new BadRequestException("Bạn không có quyền");
    }

    const updateQuiz = await QuizModel.findByIdAndUpdate(
      id,
      {
        name: data.name,
        level: data.level,
        image: data.image,
        category: data.category,
        difficulty: data.difficulty,
      },
      { new: true }
    ).populate("category");

    return updateQuiz;
  }

  async publicQuiz(id: string, userId: string) {
    const exisQuiz = await QuizModel.findById(id);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    if (exisQuiz.createBy.toString() !== userId) {
      throw new BadRequestException("Bạn không có quyền");
    }

    const updateQuiz = await QuizModel.findByIdAndUpdate(
      id,
      {
        isPublic: true,
        publicAt: Date.now(),
      },
      { new: true }
    );

    return updateQuiz;
  }

  async findMeta(id: string) {
    const exisQuiz = await QuizModel.findById(id);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài tập");
    }

    return exisQuiz;
  }

  async pagingToUser(data: QuizPagingToUserDto, user: string) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;

    const queryLoved = data.isLoved ? { isLoved: data.isLoved } : {};
    const queryPublic =
      data.isPublic !== undefined ? { isPublic: data.isPublic } : {};

    const listQuiz = await QuizModel.find({
      ...queryLoved,
      ...queryPublic,
      createBy: user,
      deleted: false,
    })
      .sort({ createdAt: data.sort })
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "createBy",
          select: "name avatar",
        },
        {
          path: "category",
          select: "name",
        },
      ]);

    const count = await QuizModel.countDocuments({
      ...queryLoved,
      ...queryPublic,
      createBy: user,
      deleted: false,
    });

    const res = formatResponse({
      skip,
      limit,
      data: listQuiz,
      count,
    });

    return res;
  }

  async delete(id: string, userId: string) {
    const exisQuiz = await QuizModel.findById(id);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    if (exisQuiz.createBy.toString() !== userId.toString()) {
      throw new BadRequestException("Bài tập không phải của bạn");
    }

    const update = await QuizModel.findByIdAndUpdate(
      id,
      {
        deleted: true,
      },
      { now: true }
    );

    return update;
  }

  async loved(id: string, is: boolean) {
    const exisQuiz = await QuizModel.findById(id).populate([
      {
        path: "createBy",
        select: "avatar name",
      },
      {
        path: "category",
      },
    ]);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    const update = await QuizModel.findByIdAndUpdate(
      id,
      {
        isLoved: is,
      },
      { now: true }
    );

    return update;
  }

  async public(id: string, userId: string) {
    const exisQuiz = await QuizModel.findById(id);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    if (!exisQuiz.image) {
      throw new BadRequestException("Bài tập chưa có hình ảnh");
    }

    if (!exisQuiz.category) {
      throw new BadRequestException("Bài tập chưa có chủ đề");
    }

    if (!exisQuiz.difficulty) {
      throw new BadRequestException("Bài tập chưa có độ khó");
    }

    if (!exisQuiz.level) {
      throw new BadRequestException("Bài tập chưa có cấp độ");
    }

    const question = await QuestionModel.exists({
      quizId: id,
    });

    if (!question) {
      throw new BadRequestException("Bài tập chưa có câu hỏi");
    }

    if (exisQuiz.createBy.toString() !== userId.toString()) {
      throw new BadRequestException("Bạn không có quyền");
    }

    const update = await QuizModel.findByIdAndUpdate(
      id,
      {
        isPublic: true,
        publicAt: Date.now(),
      },
      { now: true }
    );

    return update;
  }

  async paging(data: QuizPagingDto) {
    const limit = data.pageSize || 10;
    const skip = (data.pageIndex - 1) * limit || 0;

    const queryPublic =
      data.isPublic !== undefined ? { isPublic: data.isPublic } : {};

    const queryCategory = data.category
      ? {
          category: data.category,
        }
      : {};

    let queryKeyword = data.keyword
      ? {
          name: {
            $regex: data.keyword,
            $options: "i",
          },
        }
      : {};

    const queryDifficulty = data.difficulty
      ? {
          difficulty: data.difficulty,
        }
      : {};
    const queryLevel = data.level
      ? {
          level: data.level,
        }
      : {};
    const queryDeleted = data.deleted
      ? {
          deleted: data.deleted,
        }
      : {};

    const listQuiz = await QuizModel.find({
      ...queryPublic,
      ...queryCategory,
      ...queryDifficulty,
      ...queryLevel,
      ...queryDeleted,
      ...queryKeyword,
    })
      .sort({ createdAt: data.sort })
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "createBy",
          select: "name avatar",
        },
        {
          path: "category",
          select: "name",
        },
      ]);

    const count = await QuizModel.countDocuments({
      ...queryPublic,
      ...queryCategory,
      ...queryDifficulty,
      ...queryLevel,
      ...queryDeleted,
      ...queryKeyword,
    });

    const res = formatResponse({
      skip,
      limit,
      data: listQuiz,
      count,
    });

    return res;
  }
}
