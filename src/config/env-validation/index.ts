import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NAME: Joi.string().required(),
  DESCRIPTION: Joi.string().required(),
  SWAGGER_PATH: Joi.string().required(),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
});
