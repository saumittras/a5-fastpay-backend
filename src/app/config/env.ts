import dotnet from "dotenv";

dotnet.config();

interface envConfigs {
  PORT: string;
  MONGO_DB: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRE: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string;
  BCRYPT_SALT_ROUND: string;
  SUPER_ADMIN_PHONE: string;
  SUPER_ADMIN_PASSWORD: string;
  SUPER_ADMIN_PIN: string;
}

const loadEnvVariables = (): envConfigs => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "MONGO_DB",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRE",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRE",
    "BCRYPT_SALT_ROUND",
    "SUPER_ADMIN_PHONE",
    "SUPER_ADMIN_PASSWORD",
    "SUPER_ADMIN_PIN",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    MONGO_DB: process.env.MONGO_DB!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_PHONE: process.env.SUPER_ADMIN_PHONE as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    SUPER_ADMIN_PIN: process.env.SUPER_ADMIN_PIN as string,
  };
};

export const envVars = loadEnvVariables();
