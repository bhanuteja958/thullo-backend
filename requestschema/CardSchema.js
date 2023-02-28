const joi = require('joi');

const CreateCardSchema = joi.object({
    list_id: joi.string().required(),
    title: joi.string().required(),
    description: joi.string().allow(''),
    cover_photo_url: joi.string().allow(''),  
});

const UpdateCardSchema = joi.object({
    title: joi.string(),
    description: joi.string().allow(''),
    cover_photo_url: joi.string().allow('')
});

const AddMemberSchema = joi.object({
    card_id: joi.string().required(),
    user_id: joi.string().required()
});

module.exports = {
    CreateCardSchema,
    UpdateCardSchema,
    AddMemberSchema
}