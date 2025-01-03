import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { PlayerService } from "./player.service";
import { playerValidator } from "../../validators/player.validator";
import { HTTPSTATUS } from "../../config/http.config";

export class PlayerController {
  private playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }

  public createPlayer = asyncHandler(async (req: Request, res: Response) => {
    const body = playerValidator.parse(req.body);

    const data = await this.playerService.create(body);

    return res.status(HTTPSTATUS.OK).json(data);
  });
}
