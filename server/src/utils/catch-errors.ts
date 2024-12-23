import { HTTPSTATUS, HttpStatusCode } from "../config/http.config";
import { ErrorCode } from "../enums/error-code.enums";
import { AppError } from "./appError";

export class NotFoundException extends AppError {
  constructor(message: string = "Resource not found", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSTATUS.NOT_FOUND,
      errorCode || ErrorCode.RESOURCE_NOT_FOUND
    );
  }
}

export class BadRequestException extends AppError {
  constructor(message: string = "Bad Request", errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCode.AUTH_NOT_FOUND);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message: string = "Unauthorized", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSTATUS.UNAUTHORIZED,
      errorCode || ErrorCode.ACCESS_UNAUTHORIZED
    );
  }
}

export class InvalidRequestException extends AppError {
  constructor(message: string = "Invalid Request", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSTATUS.BAD_REQUEST,
      errorCode || ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
}

export class HttpException extends AppError {
  constructor(message: string, code: HttpStatusCode, errorCode?: ErrorCode) {
    super(message, code, errorCode);
  }
}
