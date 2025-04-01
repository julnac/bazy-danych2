const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

module.exports = userSchema;
