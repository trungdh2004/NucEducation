export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string;
}

export interface ForgotPasswordDto {
  password: string;
  email: string;
  confirmPassword: string;
}
