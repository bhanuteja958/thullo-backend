import { Attachment } from "../models/Attachment.model.js";

export const createAttachment = async (attachmentData, userId) => {
    try {
        const createAttachmentResult = await Attachment.create({
            ...attachmentData,
            created_by: userId
        });
        
        return createAttachmentResult;
    } catch(error) {
        console.log('Error while creatng attachment : ', error);
        return {
            errorMessage: 'Error while creating attachment',
            status: 400
        }
    }
}

export const updateAttachment = async (attachementDataToBeUpdated, attachmentId) => {
    try {
        const updateAttachmentResult = await Attachment.update({
            ...attachementDataToBeUpdated
        }, {
            where: {
                id: attachmentId
            }
        });

        if(updateAttachmentResult[0] === 0) {
            return {
                errorMessage: 'No attachment with the given id exists',
                status: 400
            }
        }

        return updateAttachmentResult
    } catch(error) {
        console.log('Error while updating attachment : ', error);
        return {
            errorMessage: 'Error while updating attachment',
            status: 400
        }
    }
}

export const getAttachments = async (cardId) => {
    try {
        const getAttachmentsResult = await Attachment.findAll({
            attributes: ['id','card_id','created_by', 'attachment_url', 'created_on'],
            where: {
                card_id: cardId,
            }
        });
        if(!getAttachmentsResult) {
            return {
                errorMessage: 'No attachments exist for the ',
                status: 400
            };
        }
        return getAttachmentsResult;
    } catch(error) {
        console.log('Error while fetching attachments : ', error);
        return {
            errorMessage: 'Error while fetching attachments',
            status: 400
        }
    }
}

export const deleteAttachment = async (attachmentId) => {
    try {   
        const deleteAttachmentResult = await Attachment.destroy({
            where: {
                id: attachmentId,
            }
        });

        if(deleteAttachmentResult === 0) {
            return {
                errorMessage: 'No attachemnt with the given id exists',
                status: 400
            }
        }

        return deleteAttachmentResult;
    } catch(error) {
        console.log('Error while deleting attachment : ', error);
        return {
            errorMessage: 'Error while deleting attachment',
            status: 400
        }
    }
}

export const getAttachmentCardId = async (attachmentId) => {
    try {
        const attachmentIdResult = await Attachment.findOne({
            attributes: ['card_id'],
            where: {
                id: attachmentId
            }
        });
        if(!attachmentIdResult) {
            return {
                errorMessage: 'No attachment with the given id exists',
                status: 400
            }
        }
        return attachmentIdResult;
    } catch(error) {
        console.log("Error while card id of attachment: ", error);
        return {
            errorMessage: 'Error while card id of attachment',
            status:400,
        }
    }
}

export const checkIfAttachmentCreator = async (attachementId, userId) => {
    try {
        const checkIfAttachmentCreatorResult:any = await Attachment.findOne({
            attributes: ['created_by'],
            where: {
                id: attachementId,
            }
        });
    
        if(!checkIfAttachmentCreatorResult) {
            return  {
                errorMessage: 'No attachemnt with the given id exists',
                status: 400
            };
        }
    
        if(checkIfAttachmentCreatorResult.created_by === userId) {
            return checkIfAttachmentCreatorResult;
        } else {
            return  {
                errorMessage: 'You don\'t have permission to take this action',
                status: 400
            }
        }
    } catch(error) {
        console.log('Error while checking attachment creator',error);
        return {
            errorMessage: 'Something went wrong',
            status: 400
        };
    }
    
}