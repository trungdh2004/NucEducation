import { Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { LessonService } from "./lesson.service";
import { RequestUser } from "../../interface/config.interface";
import {
  lessonPlayerValidator,
  lessonValidator,
  pagingLessonValidator,
} from "../../validators/lesson.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { BadRequestException } from "../../utils/catch-errors";
export class LessonController {
  private lessonService: LessonService;

  constructor(lessonService: LessonService) {
    this.lessonService = lessonService;
  }

  public createLiveLesson = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const body = lessonValidator.parse(req.body);
      const user = req.user;

      const newLesson = await this.lessonService.createLive(
        body,
        user?._id as string
      );

      return res.status(HTTPSTATUS.OK).json(newLesson);
    }
  );

  public findByJoin = asyncHandler(async (req: RequestUser, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("Chưa truyề id");
    }

    const lesson = await this.lessonService.findByLessonJoin(id);

    return res.status(HTTPSTATUS.OK).json(lesson);
  });

  public playerLesson = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const body = lessonPlayerValidator.parse(req.body);

      const data = await this.lessonService.playerLesson(
        body.id,
        body.playerId
      );

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public pagingLesson = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const body = pagingLessonValidator.parse(req.body);
      const user = req.user;

      const data = await this.lessonService.paging({
        ...body,
        deleted: body?.deleted || false,
        createBy: user?._id as string,
      });

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public pagingAdminLesson = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const body = pagingLessonValidator.parse(req.body);

      const data = await this.lessonService.pagingAdmin({
        ...body,
        deleted: body?.deleted || false,
      });

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public lessonDetail = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const { id } = req.params;
      const user = req.user;

      if (!id) {
        throw new BadRequestException("Chưa truyền id");
      }

      const data = await this.lessonService.reportsLesson(
        id,
        user?.id as string
      );
      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public endLesson = asyncHandler(async (req: RequestUser, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
      throw new BadRequestException("chưa nhập id");
    }

    const data = await this.lessonService.endLesson(id, user?.id);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public joinCodeLesson = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const { code } = req.body;
      if (!code) {
        throw new BadRequestException("Chưa truyền mã ");
      }

      const data = await this.lessonService.joinCode(code);

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public reportsLessonAdmin = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestException("Chưa truyền mã ");
      }

      const data = await this.lessonService.reportsLessonAdmin(id);

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );
}
