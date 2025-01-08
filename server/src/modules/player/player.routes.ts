import { Router } from "express";
import { playerController } from "./player.module";

const playerRouter = Router();

playerRouter.post("/create", playerController.createPlayer);
playerRouter.post("/proceedGame", playerController.proceedGame);
playerRouter.put("/finishGame/:id", playerController.finishGame);
playerRouter.get("/dataFinish/:id", playerController.playerDataFinish);
playerRouter.get("/detailPlayer/:id", playerController.findDetailsPlayers);

export default playerRouter;
