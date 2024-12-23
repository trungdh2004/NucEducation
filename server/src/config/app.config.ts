import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "http://localhost:3000"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  MONGO_URI: getEnv("MONGO_URI"),
  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m"),
    REFRESH_SECRET: getEnv("JWT_JWT_REFRESH_SECRET", "1h"),
    REFRESH_EXPIRES_IN: getEnv("JWT_JWT_REFRESH_EXPIRES_IN", "30d"),
  },
  NODEMAILER: getEnv("NODEMAILER"),
  NODEMAILER_PASS: getEnv("NODEMAILER_PASS"),
});

export const config = appConfig();
