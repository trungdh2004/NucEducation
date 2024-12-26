export const getEnv = (key: string, defaultValue: string = "") => {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value;
};

const appObjectConfig = () => ({
  SERVER_URL: getEnv("SERVER_URL", "http://localhost:8000/api/v1"),
});

export const configApp = appObjectConfig();
