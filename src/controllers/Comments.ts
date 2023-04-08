import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { createComment, updateComment, deleteComment, getComments, checkIfCommentCreator} from "../services/comments.js";

export const createCommentOnCard = async (req) => {
    let response = {};
    try {
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(req.body.card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const createCommentResult:any = await createComment(req.body, req.userInfo.id);

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

export const  updateCommentOfCard = async (req) => {
    let response = {};
    try {
        const {comment_id} = req.params;

        const checkIfCommentCreatorResult = await checkIfCommentCreator(comment_id, req.userInfo.id);

        if(checkIfCommentCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfCommentCreatorResult.errorMessage);
            return [checkIfCommentCreatorResult.status, response];
        }

        const updateCommentResult:any = await updateComment(req.body, comment_id);

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

export const deleteCommentOfCard = async(req) => {
    let response = {}
    try {
        const {comment_id} = req.params;

        const checkIfCommentCreatorResult = await checkIfCommentCreator(comment_id, req.userInfo.id);

        if(checkIfCommentCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfCommentCreatorResult.errorMessage);
            return [checkIfCommentCreatorResult.status, response];
        }

        const deleteCommentResult:any = await deleteComment(comment_id);

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

export const getCommentsOfCard = async(req) => {
    let response = {};
    try {
        const {card_id} = req.params;

        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const getCommentsResult:any =await getComments(card_id);

        if(getCommentsResult.errorMessage) {
            response = generateAPIResponse(getCommentsResult.errorMessage);
            return [getCommentsResult.status, response];
        }

        response = generateAPIResponse('Successfully fecthed comments', true, getCommentsResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}