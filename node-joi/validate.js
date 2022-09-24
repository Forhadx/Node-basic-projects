const Joi = require("joi");
// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  console.log("Validate req: ", req);
  const validSchema = pick(schema, ["params", "query", "body"]);

  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  // console.log("ERROR?");
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(", ");
    // return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    // console.log("ERROR: ", errorMessage);
    return res.json({ message: error.details[0].message });
  }

  console.log("VAlUE: ", value);
  Object.assign(req, value);
  return next();
};

module.exports = validate;

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
