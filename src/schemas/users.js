const Joi = require("joi");
// const { emailRegExp } = require("../controllers/auth/register.js");

const emailRegExp = /^[a-z0-9]+@[a-z]+\/[a-z]{2,3}$/;
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});
const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = schemas;
