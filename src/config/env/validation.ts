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
    LOG_LEVEL: Joi.string()
      .valid("error", "warn", "info", "http", "debug")
      .default("info"),

    GOOGLE_CLIENT_ID: Joi.string()
      .required()
      .description("Google OAuth Client ID is required"),
    GOOGLE_CLIENT_SECRET: Joi.string()
      .required()
      .description("Google OAuth Client Secret is required"),

    // NextAuth settings
    NEXTAUTH_SECRET: Joi.string()
      .required()
      .description("NextAuth secret for JWT encryption is required"),
    NEXTAUTH_URL: Joi.string().description(
      "NextAuth URL for production environments"
    ),

    // Redis configuration
    UPSTASH_REDIS_URL: Joi.string()
      .required()
      .description("Upstash Redis URL is required for rate limiting"),
    UPSTASH_REDIS_TOKEN: Joi.string()
      .required()
      .description("Upstash Redis token is required for authentication"),

    // Email configuration - NUEVAS CONFIGURACIONES
    EMAIL_HOST: Joi.string()
      .description("SMTP server host")
      .default("smtp.example.com"),
    EMAIL_PORT: Joi.number().description("SMTP server port").default(587),
    EMAIL_SECURE: Joi.boolean()
      .description("Whether to use TLS")
      .default(false),
    EMAIL_USER: Joi.string().description("SMTP username/email").default(""),
    EMAIL_PASSWORD: Joi.string()
      .description("SMTP password")
      .allow("", null)
      .default(""),
    EMAIL_FROM: Joi.string()
      .description("Default sender email address")
      .default("no-reply@zaria-jewelry.com"),

    // Application URL for public facing links
    NEXT_PUBLIC_CLIENT_URL: Joi.string()
      .description("Public URL of your application for links in emails")
      .default("http://localhost:3000"),
  })
  .unknown();

export default envVarsSchema;
