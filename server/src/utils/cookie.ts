import { CookieOptions, Response } from "express";
import { config } from "../config/app.config";
import { calculateExpirationDate } from "../config/date-time";

type CookiePayloadType = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const defaults: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production" ? true : false,
  sameSite: config.NODE_ENV === "production" ? true : false,
  path: "/",
};

export const REFRESH_PATH = `${config.BASE_PATH}/auth/refresh`;

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  const expiresIn = config.JWT.REFRESH_EXPIRES_IN;
  return {
    ...defaults,
    expires: calculateExpirationDate(expiresIn),
    path: REFRESH_PATH,
  };
};
export const getAccessTokenCookieOptions = (): CookieOptions => {
  const expiresIn = config.JWT.EXPIRES_IN;
  return {
    ...defaults,
    expires: calculateExpirationDate(expiresIn),
  };
};

export const setAuthenticationCookie = ({
  res,
  accessToken,
  refreshToken,
}: CookiePayloadType): Response => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};

export const clearAuthenticationCookie = (res: Response): Response => {
  return res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: REFRESH_PATH,
  });
};
