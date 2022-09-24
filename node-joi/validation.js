const Joi = require("joi");

// const signValidation = Joi.object({
//   name: Joi.string(),
//   age: Joi.number(),
// });

const signValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
  }),
};

module.exports = {
  signValidation,
};
