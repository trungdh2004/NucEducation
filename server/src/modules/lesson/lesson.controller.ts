import { Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { LessonService } from "./lesson.service";
import { RequestUser } from "../../interface/config.interface";
import {
  lessonPlayerValidator,
  lessonValidator,
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
}
