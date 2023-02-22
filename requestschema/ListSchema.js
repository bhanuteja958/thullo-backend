const joi = require('joi');

const CreateListSchema = joi.object({
    name: joi.string().max(50).required(),
    board_id: joi.string().required(),
});

const UpdateListSchema = joi.object({
    name: joi.string().max(50).required()
});

module.exports = {
    CreateListSchema,
    UpdateListSchema,
}