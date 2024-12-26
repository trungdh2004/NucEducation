import { Request, Response, Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";
import categoryRouter from "../modules/category/category.routes";
import uploadRouter from "../modules/upload/update.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.use("/category", categoryRouter);
routes.use("/upload", uploadRouter);

export default routes;
