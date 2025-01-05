import QuestionModel from "../../database/models/Question.model";
import { QuizModel } from "../../database/models/Quiz.model";
import { QuestionAiDto, QuestionDto } from "../../interface/quizz.interface";
import { BadRequestException } from "../../utils/catch-errors";

export class QuestionService {
  public async create(data: QuestionDto) {
    const checkQuiz = await QuizModel.findById(data.quizId);

    if (!checkQuiz) {
      throw new BadRequestException("Không có bài tập");
    }


    const newQuestion = await QuestionModel.create({
      aiGenerated: data.aiGenerated,
      query: {
        text: data.query.text,
        image: data.query.image,
      },
      type: data.type,
      answer: data.answer,
      options: data.options,
      time: data.time,
      quizId: data.quizId,
    });

    if (!newQuestion) {
      throw new BadRequestException("Tạo thất bại");
    }

    return newQuestion;
  }

  public async update(id: string, data: QuestionDto) {
    const existingQuestion = await QuestionModel.findById(id);

    if (!existingQuestion) {
      throw new BadRequestException("Không có câu hỏi");
    }

    const checkQuiz = await QuizModel.findById(data.quizId);

    if (!checkQuiz) {
      throw new BadRequestException("Không có bài tập");
    }

    const newQuestion = await QuestionModel.findByIdAndUpdate(
      id,
      {
        aiGenerated: data.aiGenerated,
        query: {
          text: data.query.text,
          image: data.query.image,
        },
        type: data.type,
        answer: data.answer,
        options: data.options,
        time: data.time,
        quizId: data.quizId,
      },
      { new: true }
    );

    if (!newQuestion) {
      throw new BadRequestException("Update thành công");
    }

    return newQuestion;
  }

  public async findById(id: string) {
    const existingQuestion = await QuestionModel.findById(id);

    if (!existingQuestion) {
      throw new BadRequestException("Không có câu hỏi");
    }

    return existingQuestion;
  }

  public async delete(id: string) {
    const existingQuestion = await QuestionModel.findById(id);

    if (!existingQuestion) {
      throw new BadRequestException("Không có câu hỏi");
    }

    const deleteQuestion = await QuestionModel.findByIdAndDelete(id);
    return id;
  }

  public async copyQuestion(id: string) {
    const question = await QuestionModel.findById(id);

    if (!question) {
      throw new BadRequestException("Không có câu hỏi đó");
    }

    const data = {
      time: question.time,
      type: question.type,
      answer: question.answer,
      query: question.query,
      quizId: question.quizId,
      options: question.options.map((option) => ({
        text: option.text,
        value: option.value,
      })),
    };

    const newQuestion = await QuestionModel.create(data);

    return newQuestion;
  }

  public async createMany(quizId: string, data: QuestionDto[]) {
    const checkQuiz = await QuizModel.findById(quizId);

    if (!checkQuiz) {
      throw new BadRequestException("Không có bài tập");
    }

    console.log("data", data);

    const newQuestion = await QuestionModel.create(data);

    if (!newQuestion) {
      throw new BadRequestException("Tạo thất bại");
    }

    return newQuestion;
  }
}
