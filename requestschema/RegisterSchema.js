const joi = require('joi');

const RegisterSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().allow(''),
    email: joi.string().email().required(),
    password: joi.string().min(7).max(20).required()
});

module.exports = RegisterSchema;