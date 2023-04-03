const { Comment } = require("../models/Comment.model")

const createComment = async (commentData, userId) => {
    try {
        const createCommentResult = await Comment.create({
            ...commentData,
            created_by: userId
        })
    
        if(!createCommentResult) {
            return {
                errorMesssage: 'Error while creating comment',
                status: 400
            }
        }
        return createCommentResult;
    } catch(error) {
        console.log("Error while creating comment: ", error);
        return {
            errorMessage: 'Error while creating comment',
            status:400,
        }
    }
}

const getComments = async (cardId) => {
    try {       
        const getCommentsResult = await Comment.findAll({
            attributes:['id','content','created_on'],
            where: {
                card_id: cardId,
            }
        });
        if(!getCommentsResult) {
            return {
                errorMessage: 'No commments for this card',
                status: 400,
            }
        }
        return getCommentsResult;
    } catch(error) {
        console.log("Error while getting comments: ", error);
        return {
            errorMessage: 'Error while getting comments',
            status:400,
        }
    }
    
}

const updateComment = async(commentUpdateData, commentId) => {
    try {
        const updateCommentResult = await Comment.update({
            ...commentUpdateData
        }, {
            where: {
                id: commentId,
            }
        })  

        if(updateCommentResult[0] === 0) {
            return {
                errorMessage: 'No comment with the given id exsits',
                status: 400,
            }
        }
        return updateCommentResult
    } catch(error) {
        console.log("Error while updating comment: ", error);
        return {
            errorMessage: 'Error while updating comment',
            status:400,
        }
    }
}

const deleteComment = async(commentId) => {
    try {
        const deleteCommentResult = await Comment.destroy({
            where: {
                id: commentId
            }
        });

        if(deleteCommentResult === 0) {
            return {
                errorMessage: 'No Comment with the given id exists',
                status: 400
            }
        }
        return deleteCommentResult;
    } catch(error) {
        console.log("Error while deleting comment: ", error);
        return {
            errorMessage: 'Error while deleting comment',
            status:400,
        }
    }
}

const getCommentCardId = async (commentId) => {
    try {
        const commentIdResult = await Comment.findOne({
            attributes: ['card_id'],
            where: {
                id: commentId
            }
        });
        if(!commentIdResult) {
            return {
                errorMessage: 'No comment with the given id exists',
                status: 400
            }
        }
        return commentIdResult;
    } catch(error) {
        console.log("Error while card id of comment: ", error);
        return {
            errorMessage: 'Error while card id of comment',
            status:400,
        }
    }
}

const checkIfCommentCreator = async (commentId, userId) => {
    try {   
        const checkIfCommentCreatorResult = await Comment.findOne({
            attributes: ['created_by'],
            where: {
                id: commentId,
            }
        });
    
        if(!checkIfCommentCreatorResult) {
            return  {
                errorMessage: 'No attachemnt with the given id exists',
                status: 400
            };
        }
    
        if(checkIfCommentCreatorResult.created_by === userId) {
            return checkIfCommentCreatorResult;
        } else {
            return  {
                errorMessage: 'You don\'t have permission to take this action',
                status: 400
            }
        }
    } catch(error) {
        console.log('Error while checking  comment creator',error);
        return {
            errorMessage: 'Something went wrong',
            status: 400
        };
    }
    
}

module.exports = {
    createComment,
    updateComment,
    getComments,
    deleteComment,
    getCommentCardId,
    checkIfCommentCreator
}