const joi = require('joi');

const LoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

module.exports = {
    LoginSchema
}