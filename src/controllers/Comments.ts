import { Request } from "express";
import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { APIResponse, ServiceResponse } from "../common/types.js";
import { createComment, updateComment, deleteComment, getComments, checkIfCommentCreator} from "../services/comments.js";

export const createCommentOnCard = async (req:Request) => {
    let response:APIResponse;
    try {
        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(req.body.card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const createCommentResult:ServiceResponse = await createComment(req.body, req.body.userInfo.id);

        if(createCommentResult.isError) {
            response = generateAPIResponse(createCommentResult.message);
            return {
                status: createCommentResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully created comment', true);
        return {
            status: 201,
            response
        };
    } catch(error) {
        throw error;
    }
}

export const  updateCommentOfCard = async (req:Request) => {
    let response:APIResponse
    try {
        const {comment_id} = req.params;

        const checkIfCommentCreatorResult:ServiceResponse = await checkIfCommentCreator(comment_id, req.body.userInfo.id);

        if(checkIfCommentCreatorResult.isError) {
            response = generateAPIResponse(checkIfCommentCreatorResult.message);
            return {
                status: checkIfCommentCreatorResult.status,
                response
            };
        }

        const updateCommentResult:ServiceResponse = await updateComment(req.body, comment_id);

        if(updateCommentResult.isError) {
            response = generateAPIResponse(updateCommentResult.message);
            return {
                status:updateCommentResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully updated comment', true);
        return {
            status: 200,
            response
        };
    } catch(error) {
       throw error;
    }
}

export const deleteCommentOfCard = async(req:Request) => {
    let response:APIResponse
    try {
        const {comment_id} = req.params;

        const checkIfCommentCreatorResult:ServiceResponse = await checkIfCommentCreator(comment_id, req.body.userInfo.id);

        if(checkIfCommentCreatorResult.isError) {
            response = generateAPIResponse(checkIfCommentCreatorResult.message);
            return {
                status: checkIfCommentCreatorResult.status,
                response
            };
        }

        const deleteCommentResult:ServiceResponse = await deleteComment(comment_id);

        if(deleteCommentResult.isError) {
            response = generateAPIResponse(deleteCommentResult.message);
            return {
                status: deleteCommentResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully deleted comment', true);
        return {
            status: 200,
            response
        };
    } catch(error) {
       throw error;
    }
}

export const getCommentsOfCard = async(req:Request) => {
    let response = {};
    try {
        const {card_id} = req.params;

        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const getCommentsResult:ServiceResponse =await getComments(card_id);

        if(getCommentsResult.isError) {
            response = generateAPIResponse(getCommentsResult.message);
            return {
                status: getCommentsResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully fecthed comments', true, getCommentsResult);
        return {
            status:200,
            response
        };
    } catch(error) {
        throw error;
    }
}