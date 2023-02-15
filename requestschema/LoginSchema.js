const joi = require('joi');

const LoginSchema = joi.object({
    email: joi.string().email(),
    password: joi.string()
});

module.exports = {
    LoginSchema
}