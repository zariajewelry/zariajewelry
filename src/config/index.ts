import envVarsSchema from "./validation";

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  // Application URLs
  app: {
    clientUrl: envVars.NEXT_PUBLIC_CLIENT_URL,
    supportEmail: "support@zaria-jewelry.com",
    env: envVars.NODE_ENV,
    port: envVars.PORT,
  },

  // Database
  database: {
    url: envVars.DATABASE_URL,
  },

  // NextAuth
  nextAuth: {
    secret: envVars.NEXTAUTH_SECRET,
    url: envVars.NEXTAUTH_URL,
  },

  // Redis for rate limiting
  redis: {
    url: envVars.UPSTASH_REDIS_URL,
    token: envVars.UPSTASH_REDIS_TOKEN,
  },

  // Logging
  logger: {
    level: envVars.LOG_LEVEL,
  },

  // OAuth
  oauth: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    },
  },

  // Email configuration 
  email: {
    host: envVars.EMAIL_HOST,
    port: envVars.EMAIL_PORT,
    secure: envVars.EMAIL_SECURE,
    user: envVars.EMAIL_USER,
    password: envVars.EMAIL_PASSWORD,
    from: envVars.EMAIL_FROM,
  },
};

export default config;
