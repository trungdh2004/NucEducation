import apiRequest from "@/lib/fetchApi";
import { FormLoginType, FormRegisterType } from "@/types/User.type";

export const loginApi = (data: FormLoginType) =>
  apiRequest.post("/auth/login", data);

export const registerApi = (data: FormRegisterType) =>
  apiRequest.post("/auth/register", data);

export const verifyEmailApi = (code: string) =>
  apiRequest.post("/auth/verifyEmail", { code });

export const sendMailVerify = (email: string) =>
  apiRequest.post("/auth/sendEmailVerify", { email });

export const sendMailOtp = (email: string) =>
  apiRequest.post("/auth/sendMailOtp", { email });

export const verifyOtpApi = (email: string, code: string) =>
  apiRequest.post("/auth/verifyOtp", { email, code });

export const forgotPassApi = (
  email: string,
  password: string,
  confirmPassword: string
) => apiRequest.post("/auth/forgotPass", { email, password, confirmPassword });
