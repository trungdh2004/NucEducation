import { Request, Response } from "express";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/catch-errors";
import {
  clearAuthenticationCookie,
  defaults,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthenticationCookie,
} from "../../utils/cookie";
import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  sendMailVerifyValidator,
  verificationCodeValidator,
  verifyOtpValidator,
} from "../../validators/auth.validator";
import { HTTPSTATUS } from "./../../config/http.config";
import { asyncHandler } from "./../../middleware/asyncHandler";
import { AuthService } from "./auth.service";
import { RequestUser } from "../../interface/config.interface";
import { config } from "../../config/app.config";
import { laterMinutesFromNow } from "../../config/date-time";
import { pagingValidator } from "../../validators/searchObject";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = registerValidator.parse(req.body);
      const { user } = await this.authService.register(body);

      return res.status(HTTPSTATUS.OK).json({
        user,
      });
    }
  );

  public login = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = loginValidator.parse(req.body);
      const { user, accessToken, refreshToken } = await this.authService.login(
        body
      );

      return setAuthenticationCookie({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.OK)
        .json({
          message: "User login successful",
          user,
        });
    }
  );

  public refresh = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const token = req.cookies.refreshToken;

      if (!token) {
        throw new BadRequestException("User not authorized");
      }

      const { accessToken, refreshToken } = await this.authService.refreshToken(
        token
      );

      if (refreshToken) {
        res.cookie(
          "refreshToken",
          refreshToken,
          getRefreshTokenCookieOptions()
        );
      }

      res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());

      return res.status(HTTPSTATUS.OK).json({
        accessToken,
        message: "Refresh token successful",
      });
    }
  );

  public sendMailVerify = asyncHandler(async (req: Request, res: Response) => {
    const body = sendMailVerifyValidator.parse(req.body);

    const user = await this.authService.sendMailVerify(body.email);

    return res.status(HTTPSTATUS.OK).json({
      message: "Mời bạn kiểm tra email",
    });
  });

  public verifyEmail = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code } = verificationCodeValidator.parse(req.body);
      const { user } = await this.authService.verifyEmail(code);
      return res.status(HTTPSTATUS.OK).json({ user });
    }
  );

  public logout = asyncHandler(
    async (req: RequestUser, res: Response): Promise<any> => {
      const sessionId = req?.sessionId;

      console.log("sessionId", sessionId);

      if (!sessionId) {
        throw new NotFoundException("Session is invalid.");
      }

      await this.authService.logout(sessionId);
      return clearAuthenticationCookie(res)
        .status(HTTPSTATUS.OK)
        .json({ message: "User logout successful" });
    }
  );

  public sendMailOtp = asyncHandler(async (req: Request, res: Response) => {
    const body = sendMailVerifyValidator.parse(req.body);

    const code = await this.authService.sendMailOTP(body.email);

    res.cookie("codeOTP", code, {
      ...defaults,
      path: `${config.BASE_PATH}/auth/otp`,
      expires: laterMinutesFromNow(5),
    });

    return res.status(HTTPSTATUS.OK).json({
      message: "Bạn vui lòng kiểm tra email",
    });
  });

  public forgotOtp = asyncHandler(async (req: Request, res: Response) => {
    const body = verifyOtpValidator.parse(req.body);

    const data = await this.authService.verifyOtp(body.email, body.code);

    return res.status(HTTPSTATUS.OK).json({
      message: "Xác nhập otp thành công",
    });
  });

  public forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const body = forgotPasswordValidator.parse(req.body);

    const data = await this.authService.forgotPassword(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Đổi mật khẩu thành công",
    });
  });

  public changeName = asyncHandler(async (req: RequestUser, res: Response) => {
    const { name } = req.body;
    const user = req.user;

    if (!name) {
      throw new BadRequestException("Chưa truyền tên");
    }

    const data = await this.authService.changeName(user?.id, name);

    return res.status(HTTPSTATUS.OK).json(data);
  });
  public changePassword = asyncHandler(
    async (req: RequestUser, res: Response) => {
      const { password } = req.body;
      const user = req.user;

      if (!password) {
        throw new BadRequestException("Chưa truyền tên");
      }

      const data = await this.authService.changePassword(user?.id, password);

      return res.status(HTTPSTATUS.OK).json({
        message: "Đổi mật khẩu thành công",
      });
    }
  );
  public paging = asyncHandler(async (req: RequestUser, res: Response) => {
    const body = pagingValidator.parse(req.body);

    const data = await this.authService.pagingUser(body);

    return res.status(HTTPSTATUS.OK).json(data);
  });
}
