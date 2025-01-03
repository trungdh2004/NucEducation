import { Router } from "express";
import authentication from "../../middleware/authencation";
import { lessonController } from "./lesson.module";

const lessonRouter = Router();

lessonRouter.post(
  "/createLive",
  authentication,
  lessonController.createLiveLesson
);
lessonRouter.post(
  "/playerLesson",
  authentication,
  lessonController.playerLesson
);
lessonRouter.get(
  "/findByJoin/:id",
  authentication,
  lessonController.findByJoin
);
export default lessonRouter;
