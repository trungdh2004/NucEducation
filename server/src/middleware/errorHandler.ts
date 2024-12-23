import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { z } from "zod";
import { clearAuthenticationCookie, REFRESH_PATH } from "../utils/cookie";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: `Invalid payload`,
    errors,
  });
};

export const errorhandler: ErrorRequestHandler = (err, req, res, next): any => {
  if (req.path === REFRESH_PATH) {
    clearAuthenticationCookie(res);
  }

  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: `Invalid JSON payload passed.`,
      error: err.message,
    });
  }

  if (err instanceof z.ZodError) {
    return formatZodError(res, err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: `Internal Server Error`,
    error: err.message || "Unknown error occurred",
  });
};
