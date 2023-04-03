const { generateAPIResponse, checkIfUserIsBoardMember } = require("../common/Helper");
const { createAttachment, updateAttachment, deleteAttachment, getAttachments, checkIfAttachmentCreator } = require("../services/attachments");

const createAttachmentForCard = async (req) => {
    let response = {};
    try {
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(req.body.card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const createAttachementResult = await createAttachment(req.body, req.userInfo.id);

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

const updateAttachmentOfCard = async(req) => {
    let response = {};
    try {
        const {attachmentId} = req.params;
        const checkIfAttachmentCreatorResult = await checkIfAttachmentCreator(attachmentId, req.userInfo.id);

        if(checkIfAttachmentCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfAttachmentCreatorResult.errorMessage);
            return [checkIfAttachmentCreatorResult.status, response];
        }

        const updateAttachmentResult = await updateAttachment(req.body, attachmentId);

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

const getAttachmentsOfCard = async (req) => {
    let response = {};
    try {
        const {cardId} = req.params;
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(cardId, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const getAttachmentsResult = await getAttachments(cardId);

        if(getAttachmentsResult.errorMessage) {
            response = generateAPIResponse(getAttachmentsResult.errorMessage);
            return [getAttachmentsResult.status, response];
        }

        response = generateAPIResponse('Successfully fetched attachements', true, data=getAttachmentsResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

const deleteAttachmentOfCard = async (req) => {
    let response = {}
    try {
        const {attachmentId} = req.params;
        
        const checkIfAttachmentCreatorResult = await checkIfAttachmentCreator(attachmentId, req.userInfo.id);

        if(checkIfAttachmentCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfAttachmentCreatorResult.errorMessage);
            return [checkIfAttachmentCreatorResult.status, response];
        }

        const deleteAttachmentResult = await deleteAttachment(attachmentId);

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

module.exports = {
    createAttachmentForCard,
    updateAttachmentOfCard,
    getAttachmentsOfCard,
    deleteAttachmentOfCard
}
