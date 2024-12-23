import { Request, Response, Router } from "express";
import authRouter from "../modules/auth/auth.routes";

const routes = Router();

routes.use("/auth", authRouter);

export default routes
