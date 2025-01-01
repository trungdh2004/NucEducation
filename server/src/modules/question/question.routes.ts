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
questionRouter.get(
  "/copy/:id",
  authentication,
  questionController.copyQuestion
);
questionRouter.delete(
  "/delete/:id",
  authentication,
  questionController.deleteIdQuestion
);
questionRouter.post(
  "/createManyAI/:id",
  authentication,
  questionController.createManyQuestion
);
export default questionRouter;
