import { Router } from "express";
import { userController } from "./user.module";
import authentication from "../../middleware/authencation";

const userRouter = Router();

userRouter.get("/current", authentication, userController.getCurrent);
userRouter.get("/listUser", userController.getListUser);

export default userRouter;
