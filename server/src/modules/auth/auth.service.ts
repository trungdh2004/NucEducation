import {
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
  thirtyDaysFromNow,
} from "../../config/date-time";
import UserModel from "../../database/models/User.model";
import VerificationModel from "../../database/models/Verification.model";
import { ErrorCode } from "../../enums/error-code.enums";
import { LoginDto, RegisterDto } from "../../interface/auth.interface";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../utils/catch-errors";
import jwt from "jsonwebtoken";
import {
  refreshTokenSignOptions,
  RefreshTPayload,
  signJwtToken,
  verifyJwtToken,
} from "../../utils/jwt";
import SessionModel from "../../database/models/Session.model";
import { config } from "../../config/app.config";

export class AuthService {
  public async register(data: RegisterDto) {
    const { name, email, password, confirmPassword } = data;

    const existingUser = await UserModel.exists({ email });

    if (existingUser) {
      throw new BadRequestException(
        "User already exists",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const userId = newUser._id;

    const verificationCode = await VerificationModel.create({
      userId: userId,
      expiresAt: fortyFiveMinutesFromNow(),
    });

    return {
      user: newUser,
      verificationCode,
    };
  }

  public async login(data: LoginDto) {
    const { email, password } = data;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new BadRequestException(
        `Invalid email `,
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new BadRequestException(
        `Invalid password`,
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const session = await SessionModel.create({
      userId: user._id,
    });

    const accessToken = await signJwtToken({
      userId: user.id,
      sessionId: session._id,
    });

    const refreshToken = await signJwtToken(
      {
        sessionId: session._id,
      },
      {
        expiresIn: config.JWT.REFRESH_EXPIRES_IN,
        secret: config.JWT.REFRESH_SECRET,
      }
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public async refreshToken(data: string) {
    const { payload, error } = await verifyJwtToken<RefreshTPayload>(
      data,
      refreshTokenSignOptions
    );

    if (!payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const session = await SessionModel.findById(payload.sessionId);

    const now = Date.now();

    if (!session) {
      throw new UnauthorizedException("Session not found");
    }

    if (session.expiredAt.getTime() < now) {
      throw new UnauthorizedException("Session expired");
    }

    const sessionRefreshToken =
      session.expiredAt.getTime() - now <= ONE_DAY_IN_MS;

    if (sessionRefreshToken) {
      session.expiredAt = calculateExpirationDate(
        config.JWT.REFRESH_EXPIRES_IN
      );

      await session.save();
    }

    const accessToken = await signJwtToken({
      userId: session.userId,
      sessionId: session._id,
    });

    const refreshToken = sessionRefreshToken
      ? signJwtToken(
          {
            sessionId: session._id,
          },
          refreshTokenSignOptions
        )
      : undefined;

    return {
      accessToken,
      refreshToken,
    };
  }

  public async verifyEmail(code: string) {
    const validCode = await VerificationModel.findOne({
      code,
      expiresAt: { $gt: Date.now() },
    });

    if (!validCode) {
      throw new BadRequestException("Invalid verification code");
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      validCode.userId,
      {
        isVerify: true,
      },
      { new: true }
    );

    if (!updateUser) {
      throw new BadRequestException(
        "Unable verify email ",
        ErrorCode.VERIFICATION_ERROR
      );
    }

    return {
      user: updateUser,
    };
  }
}
