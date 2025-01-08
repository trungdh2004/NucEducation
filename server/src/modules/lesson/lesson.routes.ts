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
lessonRouter.post("/paging", authentication, lessonController.pagingLesson);
lessonRouter.put("/endLesson/:id", authentication, lessonController.endLesson);
lessonRouter.get("/detail/:id", authentication, lessonController.lessonDetail);
lessonRouter.post("/code", lessonController.joinCodeLesson);
export default lessonRouter;
