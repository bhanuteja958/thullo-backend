import joi from "joi";

export const CreateBoardSchema = joi.object({
    title: joi.string().required(),
    coverPhotoUrl: joi.string().allow(''),
    description: joi.string().allow(''),
    visibility: joi.string().valid('public','private') 
});

export const UpdateBoardSchema = joi.object({
    title: joi.string(),
    cover_photo_url: joi.string().allow(''),
    description: joi.string().allow(''),
    visibility: joi.string().valid('public','private') 
});

export const AddMemberSchema = joi.object({
    board_id: joi.string().required(),
    user_id: joi.string().required(),
});