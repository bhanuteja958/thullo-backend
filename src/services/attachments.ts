import { generateServiceResponse } from "../common/helper.js";
import { Attachment } from "../models/Attachment.model.js";

export const createAttachment = async (attachmentData:any, userId:string) => {
    try {
        const createAttachmentResult = await Attachment.create({
            ...attachmentData,
            created_by: userId
        });
        
        return generateServiceResponse(
            200,
            false,
            "Sucessfully created attachment"
        )
    } catch(error) {
        throw error;
    }
}

export const updateAttachment = async (attachementDataToBeUpdated:any, attachmentId:string) => {
    try {
        const updateAttachmentResult = await Attachment.update({
            ...attachementDataToBeUpdated
        }, {
            where: {
                id: attachmentId
            }
        });

        if(updateAttachmentResult[0] === 0) {
            return generateServiceResponse(
                400,
                true,
                'No attachment with the given id exists'
            )
        }

        return generateServiceResponse(
            200,
            false,
            "Succesfully updated attachment"
        );
    } catch(error) {
        throw error;
    }
}

export const getAttachments = async (cardId:string) => {
    try {
        const getAttachmentsResult = await Attachment.findAll({
            attributes: ['id','card_id','created_by', 'attachment_url', 'created_on'],
            where: {
                card_id: cardId,
            }
        });
        if(!getAttachmentsResult) {
            return generateServiceResponse(
                400,
                false,
                'No attachments exists for the given card'
            )
        }

        return generateServiceResponse(
            200,
            true,
            "Successfully fetched attachments",
            getAttachmentsResult
        );
    } catch(error) {
        throw error;
    }
}

export const deleteAttachment = async (attachmentId:string) => {
    try {   
        const deleteAttachmentResult = await Attachment.destroy({
            where: {
                id: attachmentId,
            }
        });

        if(deleteAttachmentResult === 0) {
            return generateServiceResponse(
                400,
                true,
                'No attachemnt with the given id exists'
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Sucessfully deleted attachment"
        )
    } catch(error) {
        throw error;
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
            return generateServiceResponse(
                400,
                true,
                'No attachment with the given id exists',
            )
        }
        return generateServiceResponse(
            200,
            true,
            "Sucessfully fetched attachment card id",
            attachmentIdResult.dataValues.card_id
        );
    } catch(error) {
        throw error;
    }
}

export const checkIfAttachmentCreator = async (attachementId:string, userId:string) => {
    try {
        const checkIfAttachmentCreatorResult:any = await Attachment.findOne({
            attributes: ['created_by'],
            where: {
                id: attachementId,
            }
        });
    
        if(!checkIfAttachmentCreatorResult) {
            return generateServiceResponse(
                400,
                true,
                'No attachemnt with the given id exists'
            )
        }

        return generateServiceResponse(
            200,
            false,
            checkIfAttachmentCreatorResult.created_by === userId ? 'User is the creator of attachment' : 'User is not the creator of attachment',
            {
                isCreator: checkIfAttachmentCreatorResult.created_by === userId
            }
        );
    } catch(error) {
       throw error;
    }
    
}