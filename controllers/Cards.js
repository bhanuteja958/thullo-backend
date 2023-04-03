const {generateAPIResponse, checkIfUserIsBoardMember} = require('../common/helper');
const { createCard, updateCard, getCard, deleteCard, addMember, removeMember, checkIfCardMember} = require('../services/cards');

const createCardForAList = async (req) => {
    let response = {};
    try {
        const {list_id} = req.body;

        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(list_id, 'list', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const createCardResult = await createCard(req.body, req.userInfo.id);

        if(createCardResult.errorMessage) {
            response = generateAPIResponse(createCardResult.errorMessage);
            return [createCardResult.status, response];
        }

        response = generateAPIResponse("Successfully created a card", true);
        return [201, response];

    } catch(error) {
        console.log(error);
    }
}

const updateCardOfList = async (req) => {
    let response = {};
    try {
        const {card_id} = req.params;

        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const updateCardResult = await updateCard(card_id, req.body, req.userInfo.id);

        if(updateCardResult.errorMessage) {
            response = generateAPIResponse(updateCardResult.errorMessage);
            return [updateCardResult.status, response];
        }

        response = generateAPIResponse('Successfully updated card', true);
        return [200, response];

    } catch(error) {
        console.log(error);
    }
}

const getCardDataOfList = async (req) => {
    let response = {};
    try {
        const {card_id} = req.params;
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const getCardResult = await getCard(card_id);

        if(getCardResult.errorMessage) {
            response = generateAPIResponse(getCardResult.errorMessage);
            return [getCardResult.status, response];
        }

        response = generateAPIResponse("Successfully fetched card data", true, data=getCardResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }   
}

const deleteCardFromList = async (req) => {
    let response = {};
    try {
        const {card_id} = req.params;
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }


        const deleteCardResult = await deleteCard(card_id);

        if(deleteCardResult.errorMessage) {
            response = generateAPIResponse(deleteCardResult.errorMessage);
            return [deleteCardResult.status, response];
        }

        response = generateAPIResponse("Successfully deleted card from list");
        return [200, response];
    } catch(error) {
        console.log(error);
    }   
}

const addMemberToCard = async (req) => {
    let response = {};
    try {
        const {card_id, user_id} = req.body;
        const createdBy = req.userInfo.id;

        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const checkIfCardMemberResult = await checkIfCardMember(card_id, user_id);

        if(checkIfCardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfCardMemberResult.errorMessage);
            return [checkIfCardMemberResult.status, response];
        }

        const addMemberResult = await addMember(card_id, user_id, createdBy );

        if(addMemberResult.errorMessage) {
            response = generateAPIResponse(addMemberResult.errorMessage);
            return [addMemberResult.status, response];
        }

        response = generateAPIResponse('Successfully assigned member to card', true);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

const removeMemberFromCard = async(req) => {
    let response = {};
    try {
        const {card_id, user_id} = req.params;
        
        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(card_id, 'card', req.userInfo.id);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const removeMemberResult = await removeMember(card_id, user_id);
        
        if(removeMemberResult.errorMessage) {
            response = generateAPIResponse(removeMemberResult.errorMessage);
            return [400, response];
        }

        response = generateAPIResponse('Successfully removed user from card');
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    createCardForAList,
    updateCardOfList,
    getCardDataOfList,
    deleteCardFromList,
    addMemberToCard,
    removeMemberFromCard
}