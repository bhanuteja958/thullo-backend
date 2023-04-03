const { response } = require("express");
const { generateAPIResponse, checkPayloadSchema, checkIfUserIsBoardMember } = require("../common/helper");
const { CreateListSchema, UpdateListSchema } = require("../requestschema/ListSchema");
const { checkIfBoardAdmin } = require("../services/board");
const { extractAndVerifyToken } = require("../services/jwttoken");
const { createList, updateList, deleteList, getBoardIdForList } = require("../services/list");

const createListForBoard = async(req) => {
    let response = {}
    try {
        const {name, board_id} = req.body;

        const checkIfAdminResult = await checkIfBoardAdmin(board_id, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        const createListResult = await createList(name, board_id, req.userInfo.id);

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

const updateListOfBoard = async (req) => {
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

        const updateListResult = await updateList(name, list_id);
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

const deleteListFromBoard = async(req) => {
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

        const deleteListResult = await deleteList(list_id);
        if(deleteListResult.errorMessage){
            response = generateAPIResponse(deleteList.errorMessage);
            return [deleteListResult.status, response];
        }

        response = generateAPIResponse('Successfully deleted list');
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    createListForBoard,
    updateListOfBoard,
    deleteListFromBoard,
}