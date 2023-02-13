const joi = require('joi');

const RegisterSchema = joi.object({
    first_name: joi.string(),
    last_name: joi.string(),
    email: joi.string().email(),
    password: joi.string().min(7).max(20)
});

module.exports = RegisterSchema;