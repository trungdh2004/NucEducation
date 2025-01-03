import { Request, Response, Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import categoryRouter from "../modules/category/category.routes";
import uploadRouter from "../modules/upload/update.routes";
import quizRouter from "../modules/quizz/quiz.routes";
import questionRouter from "../modules/question/question.routes";
import geminiRouter from "../modules/gemini/gemini.routes";
import lessonRouter from "../modules/lesson/lesson.routes";
import playerRouter from "../modules/player/player.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.use("/category", categoryRouter);
routes.use("/upload", uploadRouter);
routes.use("/quiz", quizRouter);
routes.use("/question", questionRouter);
routes.use("/gemini", geminiRouter);
routes.use("/lesson", lessonRouter);
routes.use("/player", playerRouter);

export default routes;
