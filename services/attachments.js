const { Attachment } = require("../models/Attachment.model");

const createAttachment = async (attachmentData, userId) => {
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

const updateAttachment = async (attachementDataToBeUpdated, attachmentId) => {
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

const getAttachments = async (cardId) => {
    try {
        const getAttachmentsResult = await Attachment.findAll({
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

const deleteAttachment = async (attachmentId) => {
    try {   
        const deleteAttachmentResult = await Attachment.destroy({
            where: {
                id: attachmentId
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

const getAttachmentCardId = async (attachmentId) => {
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

module.exports = {
    createAttachment,
    updateAttachment,
    getAttachments,
    deleteAttachment,
    getAttachmentCardId 
}