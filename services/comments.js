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

module.exports = {
    createComment,
    updateComment,
    getComments,
    deleteComment
}