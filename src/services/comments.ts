import { generateServiceResponse } from "../common/helper.js";
import { Comment } from "../models/Comment.model.js";


export const createComment = async (commentData:any, userId:string) => {
    try {
        const createCommentResult = await Comment.create({
            ...commentData,
            created_by: userId
        })
    
        if(!createCommentResult) {
            return generateServiceResponse(
                400,
                true,
                'Error while creating comment'
            );
        }
        return generateServiceResponse(
            200,
            false,
            "Successfully created comment"
        );
    } catch(error) {
        throw error;
    }
}


export const getComments = async (cardId:string) => {
    try {       
        const getCommentsResult = await Comment.findAll({
            attributes:['id','content','created_on'],
            where: {
                card_id: cardId,
            }
        });
        if(!getCommentsResult) {
            return generateServiceResponse(
                400,
                true,
                'No commments for this card'
            )
        }
        return generateServiceResponse(
            200,
            false,
            "Successfully fetched comments",
            getCommentsResult
        )
    } catch(error) {
        throw error;
    }
    
}


export const updateComment = async(commentUpdateData:any, commentId:string) => {
    try {
        const updateCommentResult = await Comment.update({
            ...commentUpdateData
        }, {
            where: {
                id: commentId,
            }
        })  

        if(updateCommentResult[0] === 0) {
            return generateServiceResponse(
                400,
                false,
                'No comment with the given id exsits'
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully updated comment"
        );
    } catch(error) {
        throw error;
    }
}


export const deleteComment = async(commentId:string) => {
    try {
        const deleteCommentResult = await Comment.destroy({
            where: {
                id: commentId
            }
        });

        if(deleteCommentResult === 0) {
            return generateServiceResponse(
                400,
                true,
                'No Comment with the given id exists'
            );
        }
        return generateServiceResponse(
            200,
            false,
            "Successfully deleted comment"
        );
    } catch(error) {
        throw error;
    }
}


export const getCommentCardId = async (commentId:string) => {
    try {
        const commentIdResult = await Comment.findOne({
            attributes: ['card_id'],
            where: {
                id: commentId
            }
        });
        if(!commentIdResult) {
            return generateServiceResponse(
                400,
                true,
                'No comment with the given id exists'
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully fethced comment",
            commentIdResult.dataValues
        );
    } catch(error) {
        throw error;
    }
}

export const checkIfCommentCreator = async (commentId:string, userId:string) => {
    try {   
        const checkIfCommentCreatorResult:any = await Comment.findOne({
            attributes: ['created_by'],
            where: {
                id: commentId,
            }
        });
    
        if(!checkIfCommentCreatorResult) {
            return generateServiceResponse(
                400,
                true,
                'No comment with the given id exists'
            )
        }

        return generateServiceResponse(
            200,
            false,
            checkIfCommentCreatorResult.created_by === userId ? "User is the creator of comment" : "User is not the creator of comment",
            {
                isCreator: checkIfCommentCreatorResult.created_by === userId
            }
        );
    } catch(error) {
        throw error;
    }
}