const { Label } = require("../models/Label.model")

const createLabel = async (labelData, userId) => {
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

const updateLabel = async (labelDataToBeUpdated, labelId) => {
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

const getLabels = (cardId) => {
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

const deleteLabel = (labelId) => {
    try {
        const deleteLabelResult = Label.destroy({
            attributes: ['id','name','color'],
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

const getLabelCardId = async (labelId) => {
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

module.exports = {
    createLabel,
    updateLabel,
    getLabels,
    deleteLabel,
    getLabelCardId
}