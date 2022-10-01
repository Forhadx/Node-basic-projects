const Joi = require("joi");

const signValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(10).required(),
    age: Joi.number().required(),
  }),
};

module.exports = {
  signValidation,
};
