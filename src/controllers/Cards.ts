import { Request } from "express";
import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { APIResponse, ServiceResponse } from "../common/types.js";
import { createCard, updateCard, getCard, deleteCard, addMember, removeMember, checkIfCardMember } from "../services/cards.js";

export const createCardForAList = async (req:Request) => {
    let response:APIResponse;
    try {
        const {list_id} = req.body;

        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(list_id, 'list', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status:checkIfBoardMemberResult.status,
                response
            };
        }

        const createCardResult:ServiceResponse = await createCard(req.body, req.body.userInfo.id);

        if(createCardResult.isError) {
            response = generateAPIResponse(createCardResult.message);
            return {
                status: createCardResult.status,
                response
            };
        }

        response = generateAPIResponse("Successfully created a card", true);
        return {
            status:201, 
            response
        };
    } catch(error) {
        throw error;
    }
}

export const updateCardOfList = async (req:Request) => {
    let response:APIResponse;
    try {
        const {card_id} = req.params;

        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const updateCardResult:ServiceResponse = await updateCard(card_id, req.body, req.body.userInfo.id);

        if(updateCardResult.isError) {
            response = generateAPIResponse(updateCardResult.message);
            return {
                status: updateCardResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully updated card', true);
        return {
            status:200,
            response
        };

    } catch(error) {
        throw error;
    }
}

export const getCardDataOfList = async (req:Request) => {
    let response:APIResponse;
    try {
        const {card_id} = req.params;
        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const getCardResult:ServiceResponse = await getCard(card_id);

        if(getCardResult.isError) {
            response = generateAPIResponse(getCardResult.message);
            return {
                status: getCardResult.status,
                response
            };
        }

        response = generateAPIResponse("Successfully fetched card data", true, getCardResult);
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }   
}

export const deleteCardFromList = async (req:Request) => {
    let response:APIResponse;
    try {
        const {card_id} = req.params;
        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }


        const deleteCardResult:ServiceResponse = await deleteCard(card_id);

        if(deleteCardResult.isError) {
            response = generateAPIResponse(deleteCardResult.message);
            return {
                status: deleteCardResult.status,
                response
            };
        }

        response = generateAPIResponse("Successfully deleted card from list");
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }   
}

export const addMemberToCard = async (req:Request) => {
    let response:APIResponse;
    try {
        const {card_id, user_id} = req.body;
        const createdBy = req.body.userInfo.id;

        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const checkIfCardMemberResult:ServiceResponse = await checkIfCardMember(card_id, user_id);

        if(checkIfCardMemberResult.isError) {
            response = generateAPIResponse(checkIfCardMemberResult.message);
            return {
                status: checkIfCardMemberResult.status,
                response
            };
        }

        const addMemberResult:ServiceResponse = await addMember(card_id, user_id, createdBy );

        if(addMemberResult.isError) {
            response = generateAPIResponse(addMemberResult.message);
            return {
                status: addMemberResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully assigned member to card', true);
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }
}

export const removeMemberFromCard = async(req:Request) => {
    let response:APIResponse;
    try {
        const {card_id, user_id} = req.params;
        
        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(card_id, 'card', req.body.userInfo.id);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            };
        }

        const removeMemberResult:ServiceResponse = await removeMember(card_id, user_id);
        
        if(removeMemberResult.isError) {
            response = generateAPIResponse(removeMemberResult.message);
            return {
                status:400,
                response
            };
        }

        response = generateAPIResponse('Successfully removed user from card');
        return {
            status:200,
            response
        };
    } catch(error) {
        throw error;
    }
}