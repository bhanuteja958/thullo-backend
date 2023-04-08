import joi from "joi";

export const CreateListSchema = joi.object({
    name: joi.string().max(50).required(),
    board_id: joi.string().required(),
});

export const UpdateListSchema = joi.object({
    name: joi.string().max(50).required()
});