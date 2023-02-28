const { Board } = require("../models/Board.model");
const { Card } = require("../models/Card.model");
const { CardUserMapping } = require("../models/CardUserMapping.model");
const { List } = require("../models/List.model");
const { User } = require("../models/User.model");

const getBoardIdOfCard = async (card_id) => {
    try {
        const getBoardIdOfCardResult = await Card.findOne({
            include: [
                {model: List, required: true, attributes:['board_id']},
            ],
            where: {
                id: card_id
            }   
        });

        if(!getBoardIdOfCardResult) {
            return {
                errorMessage: "No card with the given id exists",
                status: 400,
            }
        }

        return getBoardIdOfCardResult;
    } catch(error) {
        console.log('Error while getting board id of card: ',error);
        return {
            errorMessage: 'Error while getting board id of card',
            status: 400,
        }
    }
}

const createCard = async (cardData, user_id) => {
    try {
        const createCardResult = await Card.create({
            ...cardData,
            created_by: user_id,
            modified_by: user_id
        });

        return createCardResult;
    } catch(error) {
        console.log('Error while creating card: ',error);
        return {
            errorMessage: 'Error while creating card',
            status: 400,
        }
    }
}

const getCard = async (card_id) => {
    try {
        const getCardResult = await Card.findOne({
            where: {
                id: card_id,
            }
        })

        return getCardResult;
    } catch(error) {
        console.log('Error while getiing card data:',error);
        return {
            errorMessage: 'Error while getting card data',
            status: 400,
        }

    }
}

const updateCard = async (card_id, cardValuesToBeUpdated, user_id) => {
    try {
        const updateCardResult = await Card.update({
            ...cardValuesToBeUpdated,
            modified_by: user_id
        }, {
            where: {
                id: card_id
            }
        });

        if(updateCardResult[0] === 0) {
            return {
                errorMessage: 'No card with the given id exists',
                status: 400
            }
        }

        return updateCardResult
    } catch(error) {
        console.log('Error while updating card: ',error);
        return {
            errorMessage: 'Error while updating card',
            status: 400,
        }
    }
}

const deleteCard = async (card_id) => {
    try {
        const deleteCardResult = await Card.destroy({
            where: {
                id: card_id
            }
        });

        if(deleteCardResult === 0) {
            return {
                errorMessage: 'No card with the given id exists',
                status: 400
            }
        }
    } catch(error) {
        console.log('Error while delete card: ', error);
        return {
            errorMessage: 'Error while delete card',
            status: 400,
        }
    }
}

const addMember = async (card_id, user_id, created_by) => {
    try {
        const addMemberResult = await CardUserMapping.create({
            card_id,
            user_id,
            created_by
        });

        return addMemberResult;
    } catch(error) {
        console.log('Error while adding member to card: ', error);
        return {
            errorMessage: 'Error while adding member to card',
            status: 400,
        }
    }
}

const removeMember = async (card_id, user_id) => {
    try {
        const removeMemberResult = await CardUserMapping.destroy({
            where: {
                card_id,
                user_id,
            }
        });

        if(removeMemberResult === 0) {
            return {
                errorMessage: 'No card with the given id exists',
                status: 400
            }
        }

        return removeMemberResult;
    } catch(error) {
        console.log('Error while removing member from  card: ', error);
        return {
            errorMessage: 'Error while removing member from  card',
            status: 400,
        }
    }
}

module.exports = {
    createCard,
    getCard,
    updateCard,
    deleteCard,
    addMember,
    removeMember,
    getBoardIdOfCard
}