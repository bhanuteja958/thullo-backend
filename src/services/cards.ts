import { generateServiceResponse } from "../common/helper.js";
import { Card } from "../models/Card.model.js";
import { CardUserMapping } from "../models/CardUserMapping.model.js";
import { List } from "../models/List.model.js";

export const getBoardIdOfCard = async (cardId: string) => {
    try {
        const getBoardIdOfCardResult = await Card.findOne({
            include: [
                {model: List, required: true, attributes:['board_id']},
            ],
            where: {
                id: cardId
            }   
        });

        if(!getBoardIdOfCardResult) {
            return generateServiceResponse(
                400,
                true,
                "No card with the given id exists"
            )
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully fetched board id",
            getBoardIdOfCardResult.dataValues.board_id
        )
    } catch(error) {
        throw error;
    }
}

export const createCard = async (cardData:any, userId: string) => {
    try {
        const createCardResult = await Card.create({
            ...cardData,
            created_by: userId,
            modified_by: userId
        });

        return generateServiceResponse(
            200,
            false,
            "sucessfully created card"
        )
    } catch(error) {
        throw error;
    }
}

export const getCard = async (cardId:string) => {
    try {
        const getCardResult = await Card.findOne({
            where: {
                id: cardId,
            }
        });

        if(!getCardResult) {
            return generateServiceResponse(
                400,
                true,
                "No card with the given id exists",
            )
        }

        return generateServiceResponse(
            200,
            false,
            'Successfully fetched card details',
            getCardResult.dataValues
        )
    } catch(error) {
       throw error;
    }
}

export const updateCard = async (cardId:string, cardValuesToBeUpdated:any, userId: string) => {
    try {
        const updateCardResult = await Card.update({
            ...cardValuesToBeUpdated,
            modified_by: userId
        }, {
            where: {
                id: cardId
            }
        });

        if(updateCardResult[0] === 0) {
            return generateServiceResponse(
                400,
                true,
                'No card with the given id exists'
            )
        }

        return generateServiceResponse(
            200,
            false,
            "successfully updated card"
        )
    } catch(error) {
        throw error
    }
}

export const deleteCard = async (cardId:string) => {
    try {
        const deleteCardResult = await Card.destroy({
            where: {
                id: cardId
            }
        });

        if(deleteCardResult === 0) {
            return generateServiceResponse(
                400,
                true,
                'No card with the given id exists'
            )
        }

        return generateServiceResponse(
            200,
            false,
            "Succesfully deleted card"
        )
    } catch(error) {
       throw error;
    }
}

export const addMember = async (cardId:string, userId:string, createdBy:string) => {
    try {
        const addMemberResult = await CardUserMapping.create({
            card_id: cardId,
            user_id: userId,
            created_by: createdBy
        });

        return generateServiceResponse(
            200,
            false,
            "Successfully added memeber to card"
        );
    } catch(error) {
        throw error;
    }
}

export const removeMember = async (cardId: string, userId:string) => {
    try {
        const removeMemberResult = await CardUserMapping.destroy({
            where: {
                card_id:cardId,
                user_id:userId,
            }
        });

        if(removeMemberResult === 0) {
            return generateServiceResponse(
                400,
                true,
                'No card with the given id exists'
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully removed member from card"
        )
    } catch(error) {
       throw error;
    }
}

export const checkIfCardMember = async (cardId:string, userId:string) => {
    try {
        const checkIfCardMemberResult = await CardUserMapping.findOne({
            attributes:['id'],
            where:{
                card_id:cardId,
                user_id: userId
            }
        });

        if(checkIfCardMemberResult) {
            return generateServiceResponse(
                400,
                true,
                "User already is a member of card",
                {
                    isAlreadyMember: true
                }
            )
        }

        return generateServiceResponse(
            200,
            false,
            "User is not a card member",
            {
                isAlreadyMember: false
            }
        )
    } catch(error) {
        throw error;
    }
}