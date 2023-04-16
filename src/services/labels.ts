import { generateServiceResponse } from "../common/helper.js";
import { Label } from "../models/Label.model.js";


export const createLabel = async (labelData:any, userId:string) => {
    try {
        const createLabelResult = await Label.create({
            ...labelData,
            created_by: userId,
        });

        return generateServiceResponse(
            200,
            false,
            "Successfully created label"
        );
    } catch(error) {
        throw error;
    }
}


export const updateLabel = async (labelDataToBeUpdated:any, labelId:string) => {
    try {
        const updateLabelResult = await Label.update({
            ...labelDataToBeUpdated,
        }, {
            where: {
                id: labelId,   
            }
        });

        if(updateLabelResult[0] === 0) {
            return generateServiceResponse(
                400,
                true,
                'No label with the given id exists'
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully updated label"
        );
    } catch(error) {
       throw error;
    }
}


export const getLabels = (cardId:string) => {
    try {
        const getLabelsResult = Label.findAll({
            attributes: ['id','name','color'],
            where: {
                card_id: cardId
            },
        });

        if(!getLabelsResult) {
            return generateServiceResponse(
                400,
                true,
                'No labels exist  for the given card id'
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Sucessfully fetched labels",
            getLabelsResult
        );
    } catch(error) {
        throw error;
    }
}


export const deleteLabel = (labelId:string) => {
    try {
        const deleteLabelResult:any = Label.destroy({
            where: {
                id: labelId,
            },
        });

        if(deleteLabelResult === 0) {
            return generateServiceResponse(
                400,
                true,
                "No label with the given id exists"
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Sucesssfully deleted label"
        );
    } catch(error) {
       throw error;
    }
}


export const getLabelCardId = async (labelId:string) => {
    try {
        const labelIdResult = await Label.findOne({
            attributes: ['card_id'],
            where: {
                id: labelId
            }
        });
        if(!labelIdResult) {
            return generateServiceResponse(
                400,
                true,
                'No label with the given id exists'
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Sucessfully fetched label",
            labelIdResult.dataValues
        )
    } catch(error) {
        throw error;
    }
}


export const checkIfLabelCreator = async (labelId:string, userId:string) => {
    try {
        const checkIfLabelCreatorResult:any = await Label.findOne({
            attributes: ['created_by'],
            where: {
                id: labelId,
            }
        });
    
        if(!checkIfLabelCreatorResult) {
            return generateServiceResponse(
                400,
                true,
                'No label with the given id exists'
            );
        }

        return generateServiceResponse(
            200,
            false,
            checkIfLabelCreatorResult.created_by === userId ? 'User is the creator of label' : 'User is not the creator of the label',
            {
                isCreator: checkIfLabelCreatorResult.created_by === userId
            }
        );
    } catch(error) {
        throw error;
    }
    
}