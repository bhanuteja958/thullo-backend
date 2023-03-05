const joi = require('joi');

const AddCommentSchema = joi.object({
    card_id: joi.string().required(),
    content: joi.string().required()
});

const UpdateCommentSchema = joi.object({
    content: joi.string().required()
});

module.exports = {
    AddCommentSchema,
    UpdateCommentSchema
}