import { Request } from "express";
import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { APIResponse, ServiceResponse } from "../common/types.js";
import { createLabel, updateLabel, getLabels, deleteLabel, checkIfLabelCreator} from "../services/labels.js";

export const createLabelForCard = async (req:Request) => {
    let response:APIResponse
    try {
        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(req.body.card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const createLabelResult:ServiceResponse = await createLabel(req.body, req.body.userInfo.id);

        if(createLabelResult.isError) {
            response = generateAPIResponse(createLabelResult.message);
            return {
                status: createLabelResult.status,
                response
            };
        }

        response = generateAPIResponse("Successfully created label for Card", true);
        return {
            status: 201,
            response
        };
    } catch(error) {
        throw error;
    }
};

export const updateLabelOfCard = async(req:Request) => {
    let response:APIResponse;
    try {
        const {labelId} = req.params;

        const checkIfLabelCreatorResult:ServiceResponse = await checkIfLabelCreator(labelId, req.body.userInfo.id);

        if(checkIfLabelCreatorResult.isError) {
            response = generateAPIResponse(checkIfLabelCreatorResult.message);
            return {
                status: checkIfLabelCreatorResult.status,
                response
            };
        }

        const updateLabelResult:ServiceResponse = await updateLabel(req.body, labelId);

        if(updateLabelResult.isError) {
            response = generateAPIResponse(updateLabelResult.message);
            return {
                status: updateLabelResult.status,
                response
            };
        }

        response = generateAPIResponse("Successfully updated label of Card", true)
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }
}

export const getLabelsOfCard = async (req:Request) => {
    let response:APIResponse;
    try {
        const {cardId} = req.params;
        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(cardId, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const getLabelsResult:ServiceResponse = await getLabels(cardId);

        if(getLabelsResult.isError) {
            response = generateAPIResponse(getLabelsResult.message);
            return {
                status: getLabelsResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully fetched labels', true, getLabelsResult);
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }
}

export const deleteLabelOfCard = async (req:Request) => {
    let response:APIResponse;
    try {
        const {labelId} = req.params;
        const checkIfLabelCreatorResult:ServiceResponse = await checkIfLabelCreator(labelId, req.body.userInfo.id);

        if(checkIfLabelCreatorResult.isError) {
            response = generateAPIResponse(checkIfLabelCreatorResult.message);
            return {
                status: checkIfLabelCreatorResult.status,
                response
            };
        }
        
        const deleteLabelResult:ServiceResponse = await deleteLabel(labelId);

        if(deleteLabelResult.isError) {
            response = generateAPIResponse(deleteLabelResult.message);
            return {
                status: deleteLabelResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully deleted label of card', true);
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }
}