const { generateAPIResponse } = require("../common/Helper");
const { createAttachment, updateAttachment, deleteAttachment, getAttachments } = require("../services/attachments");

const createAttachmentForCard = async (req) => {
    let response = {};
    try {
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
