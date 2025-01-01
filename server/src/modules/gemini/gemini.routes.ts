import { Router } from "express";
import { geminiController } from "./gemini.module";

const geminiRouter = Router();

geminiRouter.post("/createQuestion", geminiController.createQuestionAi);

export default geminiRouter;
