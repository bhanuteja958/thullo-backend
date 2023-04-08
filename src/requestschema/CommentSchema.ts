import joi from "joi";

export const AddCommentSchema = joi.object({
    card_id: joi.string().required(),
    content: joi.string().required()
});

export const UpdateCommentSchema = joi.object({
    content: joi.string().required()
});