import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { createLabel, updateLabel, getLabels, deleteLabel, checkIfLabelCreator} from "../services/labels.js";

export const createLabelForCard = async (req) => {
    let response = {};
    try {
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(req.body.card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const createLabelResult:any = await createLabel(req.body, req.userInfo.id);

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

export const updateLabelOfCard = async(req) => {
    let response = {};
    try {
        const {labelId} = req.params;

        const checkIfLabelCreatorResult = await checkIfLabelCreator(labelId, req.userInfo.id);

        if(checkIfLabelCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfLabelCreatorResult.errorMessage);
            return [checkIfLabelCreatorResult.status, response];
        }

        const updateLabelResult:any = await updateLabel(req.body, labelId);

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

export const getLabelsOfCard = async (req) => {
    let response = {};
    try {
        const {cardId} = req.params;
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(cardId, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const getLabelsResult:any = await getLabels(cardId);

        if(getLabelsResult.errorMessage) {
            response = generateAPIResponse(getLabelsResult.errorMessage);
            return [getLabelsResult.status, response];
        }

        response = generateAPIResponse('Successfully fetched labels', true, getLabelsResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

export const deleteLabelOfCard = async (req) => {
    let response = {}
    try {
        const {labelId} = req.params;
        const checkIfLabelCreatorResult = await checkIfLabelCreator(labelId, req.userInfo.id);

        if(checkIfLabelCreatorResult.errorMessage) {
            response = generateAPIResponse(checkIfLabelCreatorResult.errorMessage);
            return [checkIfLabelCreatorResult.status, response];
        }
        
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