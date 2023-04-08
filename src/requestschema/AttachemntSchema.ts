import joi from "joi";

export const AddAttachemntSchema = joi.object({
    card_id: joi.string().required(),
    attachment_url: joi.string().required(),
});

export const UpdateAttachmentSchema = joi.object({
    attachment_url: joi.string().required()
});