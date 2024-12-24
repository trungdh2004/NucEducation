import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../database/models/User.model";
import { ErrorCode } from "../enums/error-code.enums";
import { userService } from "../modules/user/user.module";
import {
  BadRequestException,
  UnauthorizedException,
} from "../utils/catch-errors";
import { verifyJwtToken } from "../utils/jwt";
import { asyncHandler } from "./asyncHandler";
import { RequestUser } from "../interface/config.interface";
import { errorhandler } from "./errorHandler";

const authentication = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;


    if (!token) {
      throw new UnauthorizedException(
        "User not authorized",
        ErrorCode.AUTH_UNAUTHORIZED_ACCESS
      );
    }

    const { payload, error } = await verifyJwtToken(token);

    if (!payload) {
      throw new BadRequestException(
        "Token not valid",
        ErrorCode.AUTH_INVALID_TOKEN
      );
    }

    const user = await userService.getUserById(payload.userId as string);

    if (!user.isVerify) {
      throw new BadRequestException(
        "Account not verified",
        ErrorCode.VERIFICATION_ERROR
      );
    }

    if (user.isBlock) {
      throw new BadRequestException(
        "User is a block",
        ErrorCode.AUTH_UNAUTHORIZED_ACCESS
      );
    }

    req.user = user;
    req.sessionId = payload.sessionId as string;
    next();
  }
);

export default authentication;
