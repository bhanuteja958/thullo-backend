import joi from "joi";

export const AddLabelSchema = joi.object({
    card_id: joi.string().required(),
    name: joi.string().required(),
    color: joi.string().required().pattern(/[a-fA-F0-9]{6}/)
});

export const UpdateLabelSchema = joi.object({
    name: joi.string().required(),
    color: joi.string().allow('').pattern(/[a-fA-F0-9]{6}/)
});