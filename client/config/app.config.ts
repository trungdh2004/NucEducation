export const getEnv = (key: string, defaultValue: string = "") => {
  const value = process.env[key];

  console.log("env", {
    value,
    env: process.env.NEXT_PUBLIC_SERVER_URL!,
  });

  if (value === undefined) {
    return defaultValue;
  }
  return value;
};

const appObjectConfig = () => ({
  SERVER_URL:
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000/api/v1",
  CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
});

export const configApp = appObjectConfig();
