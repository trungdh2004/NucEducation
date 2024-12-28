import QuestionModel from "../../database/models/Question.model";
import { QuizModel } from "../../database/models/Quiz.model";
import { QuizDto, QuizUpdateDto } from "../../interface/quizz.interface";
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
    const exisQuiz = await QuizModel.findById(id);

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
    const exisQuiz = await QuizModel.findById(id);

    if (!exisQuiz) {
      throw new BadRequestException("Không có bài viết");
    }

    console.log({
      userId,
      createdBy: exisQuiz.createBy.toString(),
    });

    if (exisQuiz.createBy.toString() !== userId) {
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

    if (exisQuiz.createBy.toString() !== userId) {
      throw new BadRequestException("Bạn không có quyền");
    }

    const updateQuiz = await QuizModel.findByIdAndUpdate(
      id,
      {
        name: data.name,
        description: data.description,
        level: data.level,
        image: data.image,
        category: data.category,
        difficulty: data.difficulty,
      },
      { new: true }
    );

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
}
