const joi = require('joi');

const AddAttachemntSchema = joi.object({
    card_id: joi.string().required(),
    attachment_url: joi.string().required(),
});

const UpdateAttachmentSchema = joi.object({
    attachment_url: joi.string().required()
});

module.exports = {
    AddAttachemntSchema,
    UpdateAttachmentSchema
}