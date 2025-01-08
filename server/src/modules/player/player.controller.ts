import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { PlayerService } from "./player.service";
import {
  playerProceedValidator,
  playerValidator,
} from "../../validators/player.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { BadRequestException } from "../../utils/catch-errors";

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

  public proceedGame = asyncHandler(async (req: Request, res: Response) => {
    const body = playerProceedValidator.parse(req.body);

    const data = await this.playerService.proceedGame(body);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public finishGame = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestException("CHưa nhập id");
    }
    const data = await this.playerService.finishPlayer(id);

    return res.status(HTTPSTATUS.OK).json(data);
  });

  public playerDataFinish = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("CHưa nhập id");
      }
      const data = await this.playerService.getDataFinishPlayer(id);

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );

  public findDetailsPlayers = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("chưa có id");
      }

      const data = await this.playerService.findDetails(id);

      return res.status(HTTPSTATUS.OK).json(data);
    }
  );
}
