import { asyncHandler } from "./../../middleware/asyncHandler";
import { Request, Response } from "express";
import { QuestionService } from "./question.service";
import {
  questionManyValidator,
  questionValidator,
} from "../../validators/quizz.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { BadRequestException } from "../../utils/catch-errors";

export class QuestionController {
  private questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  public createQuestion = asyncHandler(async (req: Request, res: Response) => {
    const body = questionValidator.parse(req.body);

    const data = await this.questionService.create({
      ...body,
      aiGenerated: false,
    });

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const body = questionValidator.parse(req.body);
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Không có id");
    }

    const data = await this.questionService.update(id, {
      ...body,
      aiGenerated: false,
    });

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public getByIdQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Không có id");
    }

    const data = await this.questionService.findById(id);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public deleteIdQuestion = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Không có id");
      }

      await this.questionService.delete(id);

      return res.status(HTTPSTATUS.OK).json({
        message: "Đã xóa thành công",
        id,
      });
    }
  );

  public copyQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.questionService.copyQuestion(id);

    return res.status(HTTPSTATUS.OK).json({
      data,
      message: "Tạo thành công",
    });
  });

  public createManyQuestion = asyncHandler(
    async (req: Request, res: Response) => {
      const body = questionManyValidator.parse(req.body);

      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Không có id quiz");
      }
      const dataQuestion = body.data.map((question) => ({
        ...question,
        aiGenerated: true,
        time: 30000,
        quizId: id,
        query: {
          text: question.query.text,
          image: question.query.image || undefined,
        },
      }));
      const data = await this.questionService.createMany(id, dataQuestion);

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );
}
