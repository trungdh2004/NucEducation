import { Router } from "express";
import { authController } from "./auth.module";
import authentication from "../../middleware/authencation";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/refresh", authController.refresh);
authRouter.post("/verifyEmail", authController.verifyEmail);
authRouter.post("/sendEmailVerify", authController.sendMailVerify);
authRouter.get("/logout", authentication, authController.logout);
authRouter.post("/sendMailOtp", authController.sendMailOtp);
authRouter.post("/verifyOtp", authController.forgotOtp);
authRouter.post("/forgotPass", authController.forgotPassword);
authRouter.post("/changeName", authentication, authController.changeName);
authRouter.post(
  "/changePassword",
  authentication,
  authController.changePassword
);
authRouter.post("/paging", authentication, authController.paging);

export default authRouter;
