const Joi = require('joi');

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required() // Added parentheses here
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Bad request',
      error: error.details.map(detail => detail.message) // Improved error message formatting
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required() // Added parentheses here
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Bad request',
      error: error.details.map(detail => detail.message) // Improved error message formatting
    });
  }

  next();
};

module.exports = {
    signupValidation,
  loginValidation
};