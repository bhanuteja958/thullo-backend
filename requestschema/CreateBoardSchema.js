const joi = require('joi');
const { Model } = require('sequelize');

const CreateBoardSchema = joi.object({
    title: joi.string().required(),
    cover_photo_url: joi.string(),
    description: joi.string(),
    visibility: joi.string().valid('public','private') 
})

module.exports = CreateBoardSchema;