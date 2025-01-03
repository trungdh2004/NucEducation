import { Router } from "express";
import { playerController } from "./player.module";

const playerRouter = Router();

playerRouter.post("/create", playerController.createPlayer);

export default playerRouter;
