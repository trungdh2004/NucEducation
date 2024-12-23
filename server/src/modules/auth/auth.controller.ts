import { asyncHandler } from "./../../middleware/asyncHandler";
import { HTTPSTATUS } from "./../../config/http.config";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import {
  loginValidator,
  registerValidator,
  verificationCodeValidator,
} from "../../validators/auth.validator";
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthenticationCookie,
} from "../../utils/cookie";
import { UnauthorizedException } from "../../utils/catch-errors";

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
        throw new UnauthorizedException("User not authorized");
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

      return res
        .status(HTTPSTATUS.OK)
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .json({
          accessToken,
          message: "Refresh token successful",
        });
    }
  );

  public verifyEmail = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code } = verificationCodeValidator.parse(req.body);
      const { user } = await this.authService.verifyEmail(code);
      return res.status(HTTPSTATUS.OK).json({ user });
    }
  );
}
