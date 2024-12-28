import { Router } from "express";
import { quizController } from "./quiz.module";
import authentication from "../../middleware/authencation";

const quizRouter = Router();

quizRouter.post("/create", authentication, quizController.createQuiz);
quizRouter.get("/findById/:id", quizController.getByIdQuiz);
quizRouter.get(
  "/findByIdPrivate/:id",
  authentication,
  quizController.getByIdPrivateQuiz
);
quizRouter.put("/update/:id", authentication, quizController.updateQuiz);
quizRouter.get("/findMeta/:id", quizController.getMeta);

export default quizRouter;
