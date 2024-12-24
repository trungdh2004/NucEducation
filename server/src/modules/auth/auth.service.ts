import {
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  laterMinutesFromNow,
  ONE_DAY_IN_MS,
  thirtyDaysFromNow,
} from "../../config/date-time";
import UserModel from "../../database/models/User.model";
import VerificationModel from "../../database/models/Verification.model";
import { ErrorCode } from "../../enums/error-code.enums";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
} from "../../interface/auth.interface";
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
import sendToMail, { getTemplateEmail } from "../../mailers/mailer";
import { generateCodeOtp } from "../../utils/uuid";
import OTPModel from "../../database/models/Otp.model";

export class AuthService {
  public async register(data: RegisterDto) {
    const { name, email, password, confirmPassword } = data;

    const existingUser = await UserModel.exists({ email });

    if (existingUser) {
      throw new BadRequestException(
        "Email đã được đăng kí",
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

    const urlVerifyEmail =
      config.APP_ORIGIN + "/auth/verifyEmail?code=" + verificationCode.code;

    const temMail = getTemplateEmail("verifyEmail");

    await sendToMail(
      email,
      { url: urlVerifyEmail },
      temMail.template,
      temMail.subject
    );

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
        `Email chưa đăng kí`,
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new BadRequestException(
        `Mật khẩu không đúng`,
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    if (!user.isVerify) {
      throw new BadRequestException("Tài khoản chưa được xác nhận");
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

  public async sendMailVerify(email: string) {
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestException("Email chưa được đăng kí");
    }

    if (user.isVerify) {
      throw new BadRequestException("Tài khoản đã được xác nhận");
    }

    let code = "";

    const verificationCode = await VerificationModel.findOne({
      userId: user._id,
    });

    if (!verificationCode) {
      const newVerification = await VerificationModel.create({
        userId: user._id,
        expiresAt: fortyFiveMinutesFromNow(),
      });

      code = newVerification.code;
    } else {
      code = verificationCode.code;
      verificationCode.expiresAt = fortyFiveMinutesFromNow();
      await verificationCode.save();
    }

    const urlVerifyEmail = config.APP_ORIGIN + "/auth/verifyEmail?code=" + code;

    const temMail = getTemplateEmail("verifyEmail");

    await sendToMail(
      email,
      { url: urlVerifyEmail },
      temMail.template,
      temMail.subject
    );

    return user;
  }

  public async sendMailOTP(email: string) {
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestException("Email chưa được đăng kí");
    }

    if (!user.isVerify) {
      throw new BadRequestException("Tài khoản chưa được xác nhận");
    }

    const code = generateCodeOtp();

    const otpUser = await OTPModel.findOne({
      userId: user.id,
    });

    if (!otpUser) {
      const newOtp = await OTPModel.create({
        userId: user.id,
        code: code,
        expiresAt: laterMinutesFromNow(5),
      });
    } else {
      otpUser.code = code;
      otpUser.expiresAt = laterMinutesFromNow(5);
      otpUser.save();
    }

    const temMail = getTemplateEmail("requestOTP");

    await sendToMail(email, { code: code }, temMail.template, temMail.subject);

    return code;
  }

  public async logout(sessionId: string) {
    return await SessionModel.findByIdAndDelete(sessionId);
  }

  public async verifyOtp(email: string, code: string) {
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestException("Email chưa được đăng kí");
    }

    const newOtp = await OTPModel.findOne({
      userId: user.id,
    });

    if (!newOtp) {
      throw new BadRequestException("OTP not found");
    }

    if (newOtp.expiresAt < new Date()) {
      throw new BadRequestException("OTP hết hạn");
    }

    if (newOtp.code !== code) {
      throw new BadRequestException("OTP không chính xác");
    }

    return code;
  }

  public async forgotPassword(data: ForgotPasswordDto) {
    const user = await UserModel.findOne({
      email: data.email,
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    user.password = data.password;
    user.save();

    return user;
  }
}
