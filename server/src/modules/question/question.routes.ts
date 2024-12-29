import { Router } from "express";
import { questionController } from "./question.module";
import authentication from "../../middleware/authencation";

const questionRouter = Router();

questionRouter.post(
  "/create",
  authentication,
  questionController.createQuestion
);
questionRouter.put(
  "/update/:id",
  authentication,
  questionController.updateQuestion
);
questionRouter.get("/getOne/:id", questionController.getByIdQuestion);

export default questionRouter;
