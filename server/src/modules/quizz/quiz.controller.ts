import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { QuizService } from "./quiz.service";
import {
  pagingQuizValidator,
  pagingValidator,
  quizCreateValidator,
  quizUpdateValidator,
} from "../../validators/quizz.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { BadRequestException } from "../../utils/catch-errors";
import { RequestUser } from "../../interface/config.interface";

export class QuizController {
  private quizService: QuizService;

  constructor(service: QuizService) {
    this.quizService = service;
  }

  public createQuiz = asyncHandler(async (req: RequestUser, res: Response) => {
    const body = quizCreateValidator.parse(req.body);
    const user = req.user;

    const newQuiz = await this.quizService.create(body, user?._id as string);

    return res.status(HTTPSTATUS.OK).json({
      message: "Tạo thành công",
      data: newQuiz,
    });
  });

  public updateQuiz = asyncHandler(async (req: RequestUser, res: Response) => {
    const body = quizUpdateValidator.parse(req.body);
    const { id } = req.params;
    const user = req.user;

    if (!id) {
      throw new BadRequestException("Chưa nhập id");
    }

    const data = await this.quizService.updateQuiz(
      id,
      body,
      user?._id as string
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Update thành công",
      data: data,
    });
  });

  public getByIdQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.quizService.findById(id);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public getByIdPrivateQuiz = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const { id } = req.params;
      const user = req.user;
      if (!id) {
        throw new BadRequestException("Chưa truyền id");
      }

      const data = await this.quizService.findByIdPrivate(
        id,
        user?._id as string
      );

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public getMeta = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.quizService.findMeta(id);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public deleteQuiz = asyncHandler(async (req: RequestUser, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.quizService.delete(id, user?.id as string);

    return res.status(HTTPSTATUS.OK).json({
      message: "Xóa thành công",
    });
  });

  public loveQuiz = asyncHandler(async (req: RequestUser, res: Response) => {
    const { id } = req.params;
    const { isLoved } = req.body;
    const user = req.user;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.quizService.loved(id, !!isLoved);

    return res.status(HTTPSTATUS.OK).json({
      message: "Đã thêm yêu thích",
    });
  });

  public publicQuiz = asyncHandler(async (req: RequestUser, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
      throw new BadRequestException("Chưa truyền id");
    }

    const data = await this.quizService.public(id, user?._id as string);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public pagingQuiz = asyncHandler(async (req: RequestUser, res: Response) => {
    const body = pagingQuizValidator.parse(req.body);
    const user = req.user;

    const searchData = {
      ...body,
      sort: body.sort || -1,
      ...(body.isLoved ? { isLoved: body.isLoved } : {}),
      ...(body.isPublic !== undefined ? { isPublic: body.isPublic } : {}),
    };

    const data = await this.quizService.pagingToUser(
      searchData,
      user?._id as string
    );

    return res.status(HTTPSTATUS.OK).json(data);
  });
  public paging = asyncHandler(async (req: RequestUser, res: Response) => {
    const body = pagingValidator.parse(req.body);

    const searchData = {
      ...body,
      sort: body.sort || -1,
      ...(body.isPublic !== undefined ? { isPublic: body.isPublic } : {}),
    };

    const data = await this.quizService.paging(searchData);

    return res.status(HTTPSTATUS.OK).json(data);
  });
}
