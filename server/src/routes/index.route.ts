import { Request, Response, Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import categoryRouter from "../modules/category/category.routes";
import uploadRouter from "../modules/upload/update.routes";
import quizRouter from "../modules/quizz/quiz.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.use("/category", categoryRouter);
routes.use("/upload", uploadRouter);
routes.use("/quiz", quizRouter);

export default routes;
