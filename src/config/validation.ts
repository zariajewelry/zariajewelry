import Joi from "joi";

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .default("development"),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string()
      .required()
      .description("Database connection string is required"),
    JWT_SECRET: Joi.string().required().description("JWT secret is required"),
    JWT_EXPIRES_IN: Joi.string().default("1d"),
    LOG_LEVEL: Joi.string()
      .valid("error", "warn", "info", "http", "debug")
      .default("info"),

    GOOGLE_CLIENT_ID: Joi.string()
      .required()
      .description("Google OAuth Client ID is required"),
    GOOGLE_CLIENT_SECRET: Joi.string()
      .required()
      .description("Google OAuth Client Secret is required"),
  })
  .unknown();

export default envVarsSchema;
