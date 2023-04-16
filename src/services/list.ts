import { generateServiceResponse } from "../common/helper.js";
import { List } from "../models/List.model.js";


export const createList = async (listName:string, boardId:string, userId:string) => {
    try {
        const createListResult = await List.create({
            name: listName,
            board_id: boardId,
            created_by: userId,
        });

        if(!createListResult) {
            return generateServiceResponse(
                400,
                true,
                "Something went wrong",
            );
        }

        return generateServiceResponse(
            200,
            false,
            "Successfully created list"
        );
    } catch(error) {
        throw error
    }
}


export const updateList = async (newListName:string, listId:string) => {
    try {
        const updateListResult = await List.update({
            name: newListName,
        }, {
            where: {
                id: listId
            }
        })

        if(updateListResult[0] === 0) {
            return generateServiceResponse(
                400,
                true,
                'No list with the given id exists'
            );
        }

        return generateServiceResponse(
            200,
            false,
            'Successfully updated list'
        );
    } catch(error) {
        throw error;
    }
}


export const deleteList = async (listId:string) => {
    try{
        const deleteListResult = await List.destroy({
            where: {
                id: listId
            }
        })

        if(deleteListResult === 0) {
            return generateServiceResponse(
                400,
                true,
                'No list with the given id exists',  
            )
        }

        return generateServiceResponse(
            200,
            false,
            'Successfully deleted list'
        );
    } catch(error) {
        throw error;
    }
}


export const getBoardIdForList = async (listId:string) => {
    try {
        const boardIdForList:any = await List.findByPk(listId, {
            attributes:['board_id']
        });
        if(!boardIdForList) {
            return generateServiceResponse(
                400,
                true,
                'No list with the given id exists',  
            )
        }
        return generateServiceResponse(
            200,
            false,
            'successfully fetched boardId',
            boardIdForList.dataValues.board_id
        );
    } catch(error) {
        throw error;
    }
}