import { Router } from "express";
import authentication from "../../middleware/authencation";
import { lessonController } from "./lesson.module";

const lessonRouter = Router();

lessonRouter.post(
  "/createLive",
  authentication,
  lessonController.createLiveLesson
);
lessonRouter.post("/playerLesson", lessonController.playerLesson);
lessonRouter.get(
  "/findByJoin/:id",
  authentication,
  lessonController.findByJoin
);
lessonRouter.post("/paging", authentication, lessonController.pagingLesson);
lessonRouter.post(
  "/pagingAdmin",
  authentication,
  lessonController.pagingAdminLesson
);
lessonRouter.put("/endLesson/:id", authentication, lessonController.endLesson);
lessonRouter.get("/detail/:id", authentication, lessonController.lessonDetail);
lessonRouter.get(
  "/reportsLessonAdmin/:id",
  authentication,
  lessonController.reportsLessonAdmin
);
lessonRouter.post("/code", lessonController.joinCodeLesson);
export default lessonRouter;
