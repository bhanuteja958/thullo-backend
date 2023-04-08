import { generateAPIResponse } from "../common/helper.js";
import { checkIfBoardAdmin } from "../services/board.js";
import { createList, updateList, deleteList, getBoardIdForList } from "../services/list.js";

export const createListForBoard = async(req) => {
    let response = {}
    try {
        const {name, board_id} = req.body;

        const checkIfAdminResult = await checkIfBoardAdmin(board_id, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        const createListResult:any = await createList(name, board_id, req.userInfo.id);

        if(createListResult.errorMessage) {
            response = generateAPIResponse(createListResult.errorMessage);
            return [createListResult.status, response];
        }

        response = generateAPIResponse("Successfully created list", true);
        return [201, response];

    } catch(error) {
        console.log(error);
    }
}

export const updateListOfBoard = async (req) => {
    let response = {}
    try {
        const {name} = req.body;
        const {list_id} = req.params;

        const getBoardIdForListResult = await getBoardIdForList(list_id);

        if(getBoardIdForListResult.errorMessage) {
            response = generateAPIResponse(getBoardIdForListResult.errorMessage);
            return [getBoardIdForListResult.status, response];
        }

        const checkIfAdminResult = await checkIfBoardAdmin(getBoardIdForListResult, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        const updateListResult:any = await updateList(name, list_id);
        if(updateListResult.errorMessage){
            response = generateAPIResponse(updateListResult.errorMessage);
            return [updateListResult.status, response];
        }

        response = generateAPIResponse('Successfully updated list details', true);
        return [200, response];
    } catch(error) {
        console.log(error);
    }   
}

export const deleteListFromBoard = async(req) => {
    let response = {}
    try {
        const {list_id} = req.params;

        const getBoardIdForListResult = await getBoardIdForList(list_id);

        if(getBoardIdForListResult.errorMessage) {
            response = generateAPIResponse(getBoardIdForListResult.errorMessage);
            return [getBoardIdForListResult.status, response];
        }

        const checkIfAdminResult = await checkIfBoardAdmin(getBoardIdForListResult, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        const deleteListResult:any = await deleteList(list_id);
        if(deleteListResult.errorMessage){
            response = generateAPIResponse(deleteListResult.errorMessage);
            return [deleteListResult.status, response];
        }

        response = generateAPIResponse('Successfully deleted list');
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}