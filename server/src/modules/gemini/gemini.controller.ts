import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { GeminiService } from "./gemini.service";
import { BadRequestException } from "../../utils/catch-errors";
import { HTTPSTATUS } from "../../config/http.config";

export class GeminiController {
  private geminiService: GeminiService;

  constructor(geminiService: GeminiService) {
    this.geminiService = geminiService;
  }

  createQuestionAi = asyncHandler(async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      throw new BadRequestException("Không có text");
    }

    const data = await this.geminiService.createQuestion(text);

    return res.status(HTTPSTATUS.OK).json(data);
  });
}
