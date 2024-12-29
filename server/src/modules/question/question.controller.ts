import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { QuestionService } from "./question.service";
import { questionValidator } from "../../validators/quizz.validator";
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
}
