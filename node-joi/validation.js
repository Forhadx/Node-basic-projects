const Joi = require("joi");

const signValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(10).required(),
    age: Joi.number().required(),
  }),
};

const advance = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(10).required(),
    age: Joi.number().required(),
  }),
  params: Joi.object().keys({
    id: Joi.number().min(5).required(),
  }),
  query: Joi.object().keys({
    page: Joi.number().min(1).required(),
  }),
};

module.exports = {
  signValidation,
  advance,
};
