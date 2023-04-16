import { Request } from "express";
import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { APIResponse, ServiceResponse } from "../common/types.js";
import { createAttachment, updateAttachment, deleteAttachment, getAttachments, checkIfAttachmentCreator } from "../services/attachments.js";

export const createAttachmentForCard = async (req:Request) => {
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

        const createAttachementResult:ServiceResponse = await createAttachment(req.body, req.body.userInfo.id);

        if(createAttachementResult.isError) {
            response = generateAPIResponse(createAttachementResult.message);
            return {
                status: createAttachementResult.status,
                response
            };
        }

        response = generateAPIResponse("Successfully created attachementForCard", true);
        return {
            status: 201,
            response
        };
    } catch(error) {
        throw error;
    }
};

export const updateAttachmentOfCard = async(req:Request) => {
    let response:APIResponse
    try {
        const {attachmentId} = req.params;
        const checkIfAttachmentCreatorResult:ServiceResponse = await checkIfAttachmentCreator(attachmentId, req.body.userInfo.id);

        if(checkIfAttachmentCreatorResult.isError) {
            response = generateAPIResponse(checkIfAttachmentCreatorResult.message);
            return {
                status: checkIfAttachmentCreatorResult.status,
                response
            };
        }

        const updateAttachmentResult:ServiceResponse = await updateAttachment(req.body, attachmentId);

        if(updateAttachmentResult.isError) {
            response = generateAPIResponse(updateAttachmentResult.message);
            return {
                status: updateAttachmentResult.status,
                response
            };
        }

        response = generateAPIResponse("Successfully updated attachement of Card", true);
        return {
            status: 200,
            response
        }
    } catch(error) {
        throw error;
    }
}

export const getAttachmentsOfCard = async (req:Request) => {
    let response:APIResponse;
    try {
        const {cardId} = req.params;
        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(cardId, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const getAttachmentsResult:ServiceResponse = await getAttachments(cardId);

        if(getAttachmentsResult.isError) {
            response = generateAPIResponse(getAttachmentsResult.message);
            return {
                status: getAttachmentsResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully fetched attachements', true, getAttachmentsResult);
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }
}

export const deleteAttachmentOfCard = async (req:Request) => {
    let response:APIResponse;
    try {
        const {attachmentId} = req.params;
        
        const checkIfAttachmentCreatorResult = await checkIfAttachmentCreator(attachmentId, req.body.userInfo.id);

        if(checkIfAttachmentCreatorResult.isError) {
            response = generateAPIResponse(checkIfAttachmentCreatorResult.message);
            return {
                status: checkIfAttachmentCreatorResult.status,
                response
            };
        }

        const deleteAttachmentResult:ServiceResponse = await deleteAttachment(attachmentId);

        if(deleteAttachmentResult.isError) {
            response = generateAPIResponse(deleteAttachmentResult.message);
            return {
                status: deleteAttachmentResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully deleted attachment of card', true);
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }
}
