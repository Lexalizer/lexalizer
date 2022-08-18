import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  LISTENING_ADDRESS: Joi.string().default('0.0.0.0'),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRATION: Joi.string().default('1d')
});
