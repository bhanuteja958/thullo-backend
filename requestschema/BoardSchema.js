const joi = require('joi');

const CreateBoardSchema = joi.object({
    title: joi.string().required(),
    cover_photo_url: joi.string().allow(''),
    description: joi.string().allow(''),
    visibility: joi.string().valid('public','private') 
});

const UpdateBoardSchema = joi.object({
    title: joi.string(),
    cover_photo_url: joi.string().allow(''),
    description: joi.string().allow(''),
    visibility: joi.string().valid('public','private') 
})

module.exports ={
    CreateBoardSchema,
    UpdateBoardSchema
};