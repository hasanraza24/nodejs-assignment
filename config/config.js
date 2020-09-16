const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(8081),
  HOST: Joi.string().required(),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_URL: Joi.string().required()
    .description('Mongo DB host url'),
  MAIL_API_KEY: Joi.string().required()
    .description('API Key of mailgun'),
  MAIL_DOMAIN: Joi.string().required()
    .description('Domain for sending mail from mailgun')
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  host: envVars.HOST,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    url: envVars.MONGO_URL
  },
  mail: {
    apiKey: envVars.MAIL_API_KEY,
    domain: envVars.MAIL_DOMAIN
  }
};

module.exports = config;
