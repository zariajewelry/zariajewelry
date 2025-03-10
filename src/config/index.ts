import envVarsSchema from "./validation";


const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  // Server
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  
  // Database
  database: {
    url: envVars.DATABASE_URL,
  },
  
  // Authentication
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
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
  
};

export default config;