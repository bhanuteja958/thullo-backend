import { Label } from "../models/Label.model.js";


export const createLabel = async (labelData, userId) => {
    try {
        const createLabelResult = await Label.create({
            ...labelData,
            created_by: userId,
        });

        return createLabelResult;
    } catch(error) {
        console.log('Error while creating label : ', error);
        return {
            errorMessage: 'Error while creating label',
            status: 400
        }
    }
}


export const updateLabel = async (labelDataToBeUpdated, labelId) => {
    try {
        const updateLabelResult = await Label.update({
            ...labelDataToBeUpdated,
        }, {
            where: {
                id: labelId,   
            }
        });

        if(updateLabelResult[0] === 0) {
            return {
                errorMessage: 'No label with the given id exists',
                status: 400
            }
        }
        return updateLabelResult;
    } catch(error) {
        console.log('Error while upating label : ', error);
        return {
            errorMessage: 'Error while updating label',
            status: 400
        }
    }
}


export const getLabels = (cardId) => {
    try {
        const getLabelsResult = Label.findAll({
            attributes: ['id','name','color'],
            where: {
                card_id: cardId
            },
        });

        if(!getLabelsResult) {
            return {
                errorMessage: 'No labels for the given card id',
                status: 400
            }
        }

        return getLabelsResult
    } catch(error) {
        console.log('Error while upating label : ', error);
        return {
            errorMessage: 'Error while updating label',
            status: 400
        }
    }
}


export const deleteLabel = (labelId) => {
    try {
        const deleteLabelResult:any = Label.destroy({
            where: {
                id: labelId,
            },
        });

        if(deleteLabelResult === 0) {
            return {
                errorMessage: "No label with the given id exists",
                status: 400
            };
        }

        return deleteLabelResult;
    } catch(error) {
        console.log('Error while upating label : ', error);
        return {
            errorMessage: 'Error while updating label',
            status: 400
        }
    }
}


export const getLabelCardId = async (labelId) => {
    try {
        const labelIdResult = await Label.findOne({
            attributes: ['card_id'],
            where: {
                id: labelId
            }
        });
        if(!labelIdResult) {
            return {
                errorMessage: 'No label with the given id exists',
                status: 400
            }
        }
        return labelIdResult;
    } catch(error) {
        console.log("Error while card id of label: ", error);
        return {
            errorMessage: 'Error while card id of label',
            status:400,
        }
    }
}


export const checkIfLabelCreator = async (labelId, userId) => {
    try {
        const checkIfLabelCreatorResult:any = await Label.findOne({
            attributes: ['created_by'],
            where: {
                id: labelId,
            }
        });
    
        if(!checkIfLabelCreatorResult) {
            return  {
                errorMessage: 'No label with the given id exists',
                status: 400
            };
        }
    
        if(checkIfLabelCreatorResult.created_by === userId) {
            return checkIfLabelCreatorResult;
        } else {
            return  {
                errorMessage: 'You don\'t have permission to take this action',
                status: 400
            }
        }
    } catch(error) {
        console.log('Error while checking label creator',error);
        return {
            errorMessage: 'Something went wrong',
            status: 400
        };
    }
    
}