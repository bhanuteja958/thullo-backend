import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { createAttachment, updateAttachment, deleteAttachment, getAttachments, checkIfAttachmentCreator } from "../services/attachments.js";

export const createAttachmentForCard = async (req) => {
    let response = {};
    try {
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(req.body.card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const createAttachementResult:any = await createAttachment(req.body, req.userInfo.id);

        if(createAttachementResult.errorMessage) {
            response = generateAPIResponse(createAttachementResult.errorMessage);
            return [createAttachementResult.status, response];
        }

        response = generateAPIResponse("Successfully created attachementForCard", true);
        return [201, response]
    } catch(error) {
        console.log(error);
    }
};

export const updateAttachmentOfCard = async(req) => {
    let response = {};
    try {
        const {attachmentId} = req.params;
        const checkIfAttachmentCreatorResult:any = await checkIfAttachmentCreator(attachmentId, req.userInfo.id);

        if(checkIfAttachmentCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfAttachmentCreatorResult.errorMessage);
            return [checkIfAttachmentCreatorResult.status, response];
        }

        const updateAttachmentResult:any = await updateAttachment(req.body, attachmentId);

        if(updateAttachmentResult.errorMessage) {
            response = generateAPIResponse(updateAttachmentResult.errorMessage);
            return [updateAttachmentResult.status, response];
        }

        response = generateAPIResponse("Successfully updated attachement of Card", true);
        return [200, response]
    } catch(error) {
        console.log(error);
    }
}

export const getAttachmentsOfCard = async (req) => {
    let response = {};
    try {
        const {cardId} = req.params;
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(cardId, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const getAttachmentsResult:any = await getAttachments(cardId);

        if(getAttachmentsResult.errorMessage) {
            response = generateAPIResponse(getAttachmentsResult.errorMessage);
            return [getAttachmentsResult.status, response];
        }

        response = generateAPIResponse('Successfully fetched attachements', true, getAttachmentsResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

export const deleteAttachmentOfCard = async (req) => {
    let response = {}
    try {
        const {attachmentId} = req.params;
        
        const checkIfAttachmentCreatorResult = await checkIfAttachmentCreator(attachmentId, req.userInfo.id);

        if(checkIfAttachmentCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfAttachmentCreatorResult.errorMessage);
            return [checkIfAttachmentCreatorResult.status, response];
        }

        const deleteAttachmentResult:any = await deleteAttachment(attachmentId);

        if(deleteAttachmentResult.errorMessage) {
            response = generateAPIResponse(deleteAttachmentResult.errorMessage);
            return [deleteAttachmentResult.status, response];
        }

        response = generateAPIResponse('Successfully deleted attachment of card', true);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}
