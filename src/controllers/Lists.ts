import { Request } from "express";
import { generateAPIResponse } from "../common/helper.js";
import { APIResponse, ServiceResponse } from "../common/types.js";
import { checkIfBoardAdmin } from "../services/board.js";
import { createList, updateList, deleteList, getBoardIdForList } from "../services/list.js";

export const createListForBoard = async(req: Request) => {
    let response: APIResponse
    try {
        const {name, board_id} = req.body;

        const checkIfAdminResult:ServiceResponse = await checkIfBoardAdmin(board_id, req.body.userInfo.id);

        if(checkIfAdminResult.isError) {
            response = generateAPIResponse(checkIfAdminResult.message);
            return {
                status: checkIfAdminResult.status,
                response
            };
        }

        const createListResult:ServiceResponse = await createList(name, board_id, req.body.userInfo.id);

        if(createListResult.isError) {
            response = generateAPIResponse(createListResult.message);
            return {
                status: createListResult.status,
                response
            }
        }

        response = generateAPIResponse("Successfully created list", true);
        return {
            statu: 201,
            response
        }

    } catch(error) {
        throw error;
    }
}

export const updateListOfBoard = async (req:Request) => {
    let response:APIResponse
    try {
        const {name} = req.body;
        const {list_id} = req.params;

        const getBoardIdForListResult:ServiceResponse = await getBoardIdForList(list_id);

        if(getBoardIdForListResult.isError) {
            response = generateAPIResponse(getBoardIdForListResult.message);
            return {
                status: getBoardIdForListResult.status,
                response
            };
        }

        const checkIfAdminResult:ServiceResponse = await checkIfBoardAdmin(getBoardIdForListResult.data, req.body.userInfo.id);

        if(checkIfAdminResult.isError) {
            response = generateAPIResponse(checkIfAdminResult.message);
            return {
                status: checkIfAdminResult.status, 
                response
            };
        }

        const updateListResult:ServiceResponse = await updateList(name, list_id);
        if(updateListResult.isError){
            response = generateAPIResponse(updateListResult.message);
            return {
                status: updateListResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully updated list details', true);
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }   
}

export const deleteListFromBoard = async(req: Request) => {
    let response:APIResponse
    try {
        const {list_id} = req.params;

        const getBoardIdForListResult:ServiceResponse = await getBoardIdForList(list_id);

        if(getBoardIdForListResult.isError) {
            response = generateAPIResponse(getBoardIdForListResult.message);
            return {
                status:getBoardIdForListResult.status,
                response
            };
        }

        const checkIfAdminResult:ServiceResponse = await checkIfBoardAdmin(getBoardIdForListResult.data, req.body.userInfo.id);

        if(checkIfAdminResult.isError) {
            response = generateAPIResponse(checkIfAdminResult.message);
            return {
                status: checkIfAdminResult.status,
                response
            };
        }

        const deleteListResult:ServiceResponse = await deleteList(list_id);
        if(deleteListResult.isError){
            response = generateAPIResponse(deleteListResult.message);
            return {
                status: deleteListResult.status,
                response
            };
        }

        response = generateAPIResponse('Successfully deleted list');
        return {
            status: 200,
            response
        };
    } catch(error) {
        throw error;
    }
}