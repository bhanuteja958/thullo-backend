const { checkPayloadSchema, generateAPIResponse } = require("../common/helper")
const { AddCommentSchema, UpdateCommentSchema } = require("../requestschema/CommentSchema");
const { checkIfBoardMember } = require("../services/board");
const { getBoardIdOfCard } = require("../services/cards");
const { createComment, updateComment, deleteComment, getComments } = require("../services/comments")

const createCommentOnCard = async (req) => {
    let response = {};
    try {
        const createCommentResult = await createComment(req.body, req.userInfo.id);

        if(createCommentResult.errorMessage) {
            response = generateAPIResponse(createCommentResult.errorMessage);
            return [createCommentResult.status, response];
        }

        response = generateAPIResponse('Successfully created comment', true);
        return [201, response];
    } catch(error) {
        console.log(error);
    }
}

const  updateCommentOfCard = async (req) => {
    let response = {};
    try {
        const {comment_id} = req.params;

        const updateCommentResult = await updateComment(req.body, comment_id);

        if(updateCommentResult.errorMessage) {
            response = generateAPIResponse(updateCommentResult.errorMessage);
            return [updateCommentResult.status, response];
        }

        response = generateAPIResponse('Successfully updated comment', true);
        return [200, response];

    } catch(error) {
        console.log(error);
    }
}

const deleteCommentOfCard = async(req) => {
    let response = {}
    try {
        const {comment_id} = req.params;

        const deleteCommentResult = await deleteComment(comment_id);

        if(deleteCommentResult.errorMessage) {
            response = generateAPIResponse(deleteCommentResult.errorMessage);
            return [deleteCommentResult.status, response];
        }

        response = generateAPIResponse('Successfully deleted comment', true);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

const getCommentsOfCard = async(req) => {
    let response = {};
    try {
        const {card_id} = req.params;

        const getCommentsResult =await getComments(card_id);

        if(getCommentsResult.errorMessage) {
            response = generateAPIResponse(getCommentsResult.errorMessage);
            return [getCommentsResult.status, response];
        }

        response = generateAPIResponse('Successfully fecthed comments', true, data=getCommentsResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    createCommentOnCard,
    updateCommentOfCard,
    deleteCommentOfCard,
    getCommentsOfCard
}