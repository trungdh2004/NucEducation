import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { BadRequestException } from "../../utils/catch-errors";
import { HTTPSTATUS } from "../../config/http.config";

export class UploadController {
  public uploadSinger = asyncHandler(async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      throw new BadRequestException("Upload lỗi");
    }
    return res.status(HTTPSTATUS.OK).json(file);
  });

  public uploadMultiple = asyncHandler(async (req: Request, res: Response) => {
    const files = req.files;

    if (!files) {
      throw new BadRequestException("Upload lỗi");
    }

    return res.status(HTTPSTATUS.OK).json(files);
  });
}
