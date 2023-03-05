const { generateAPIResponse } = require("../common/Helper");
const { createLabel, updateLabel, getLabels, deleteLabel } = require("../services/labels");

const createLabelForCard = async (req) => {
    let response = {};
    try {
        const createLabelResult = await createLabel(req.body, req.userInfo.id);

        if(createLabelResult.errorMessage) {
            response = generateAPIResponse(createLabelResult.errorMessage);
            return [createLabelResult.status, response];
        }

        response = generateAPIResponse("Successfully created label for Card", true);
        return [201, response]
    } catch(error) {
        console.log(error);
    }
};

const updateLabelOfCard = async(req) => {
    let response = {};
    try {
        const {labelId} = req.params;
        const updateLabelResult = await updateLabel(req.body, labelId);

        if(updateLabelResult.errorMessage) {
            response = generateAPIResponse(updateLabelResult.errorMessage);
            return [updateLabelResult.status, response];
        }

        response = generateAPIResponse("Successfully updated label of Card", true)
        return [200, response]
    } catch(error) {
        console.log(error);
    }
}

const getLabelsOfCard = async (req) => {
    let response = {};
    try {
        const {cardId} = req.params;
        const getLabelsResult = await getLabels(cardId);

        if(getLabelsResult.errorMessage) {
            response = generateAPIResponse(getLabelsResult.errorMessage);
            return [getLabelsResult.status, response];
        }

        response = generateAPIResponse('Successfully fetched labels', true,data=getLabelsResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

const deleteLabelOfCard = async (req) => {
    let response = {}
    try {
        const {labelId} = req.params;
        const deleteLabelResult = await deleteLabel(labelId);

        if(deleteLabelResult.errorMessage) {
            response = generateAPIResponse(deleteLabelResult.errorMessage);
            return [deleteLabelResult.status, response];
        }

        response = generateAPIResponse('Successfully deleted label of card', true);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    createLabelForCard,
    updateLabelOfCard,
    getLabelsOfCard,
    deleteLabelOfCard
}
