const { generateAPIResponse, checkIfUserIsBoardMember} = require("../common/helper");
const { createBoard, getBoards, getSingleBoard, updateSingleBoard, deleteBoard, addMember, removeMember, checkIfBoardAdmin, checkIfBoardMember, checkIfAlreadyMember } = require("../services/board");

const createUserBoard = async (req) => {
    let response = {};
    try {
        req.body.userId = req.userInfo.id;

        const createBoardResult = await createBoard(req.body);
        
        if(createBoardResult.errorMessage){
            response = generateAPIResponse(createBoardResult.errorMessage);
            return [createBoardResult.status, response];
        }

        response = generateAPIResponse('Succesfully created board', true)
        return [201, response];
    } catch (error) {
        console.log(error);
    }
}

const getBoardsOfUser = async (req) => {
    let response = {}
    try {
        const userId = req.userInfo.id;

        const getBoardsResult = await getBoards(userId);

        if(getBoardsResult.errorMessage) {
            response = generateAPIResponse(getBoardsResult.errorMessage);
            return [getBoardsResult.status, response];
        }

        response = generateAPIResponse('Successfully fetched boards', true, data=getBoardsResult);
        return [200, response];
    } catch (error) {
        console.log(error);
    }
}

const getBoardData = async (req) => {
    try {
        const boardId = req.params.boardId;
        const userId = req.userInfo.id;

        const checkIfBoardMemberResult = await checkIfUserIsBoardMember(boardId, 'board', userId);

        if(checkIfBoardMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfBoardMemberResult.errorMessage);
            return [checkIfBoardMemberResult.status, response];
        }

        const boardDataResult = await getSingleBoard(boardId);

        if(boardDataResult.errorMessage) {
            response = generateAPIResponse(boardDataResult.errorMessage);
            return [boardDataResult.status, response];
        }

        response = generateAPIResponse('Successfully feched board data', true, data=boardDataResult);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}   

const updateBoardData = async (req) => {
    let response = {};
    try {
        const boardId = req.params.boardId
        const userId = req.userInfo.id;
        const boardValuesToBeUpdated = req.body;

        const checkIfAdminResult = await checkIfBoardAdmin(boardId, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        //update board
        const boardDataResult = await updateSingleBoard(boardId, userId, boardValuesToBeUpdated);

        if(boardDataResult.errorMessage) {
            response = generateAPIResponse(boardDataResult.errorMessage);
            return [boardDataResult.status, response];
        }

        response = generateAPIResponse('Successfully updated board data', true);
        return [200, response];
    } catch(error) {
        console.log(error);
    }
}

const deleteBoardData = async (req) => {
    let response = {};
    try {
        const userId = req.userInfo.id;
        const boardId = req.params.boardId

        const checkIfAdminResult = await checkIfBoardAdmin(boardId, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        //delete board
        const deleteBoardResult = await deleteBoard(boardId, userId);

        if(deleteBoardResult.errorMessage) {
            response = generateAPIResponse(deleteBoardResult.errorMessage);
            return [deleteBoardResult.status, response];
        }

        response = generateAPIResponse("Successfully deleted board");
        return [200, response];

    } catch(error) {
        console.log(error);
    }   
}

const addMemberToBoard = async (req) => {
    let response = {}
    try {
        const {board_id, user_id} = req.body;

        const checkIfAdminResult = await checkIfBoardAdmin(board_id, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        const checkIfAlreadyMemberResult = await checkIfAlreadyMember(board_id, user_id);

        if(checkIfAlreadyMemberResult.errorMessage) {
            response = generateAPIResponse(checkIfAlreadyMemberResult.errorMessage);
            return [checkIfAlreadyMemberResult.status, response];
        }

        const addMemberResult = await addMember(board_id, user_id);

        if(addMemberResult.errorMessage) {
        response = generateAPIResponse(addMemberResult.errorMessage)
        return [addMemberResult.status, response];
        }

        response = generateAPIResponse('Successfully added user to the board', true);
        return [201, response];
    } catch(error) {
        console.log(error);
    }
}


const removeMemberFromBoard = async (req) => {
    let response = {}
    try {

        const {board_id, user_id} = req.params;

        const checkIfAdminResult = await checkIfBoardAdmin(board_id, req.userInfo.id);

        if(checkIfAdminResult.errorMessage) {
            response = generateAPIResponse(checkIfAdminResult.errorMessage);
            return [checkIfAdminResult.status, response];
        }

        const removeMemberResult = await removeMember(board_id, user_id);

        if(removeMemberResult.errorMessage) {
            response = generateAPIResponse(removeMemberResult.errorMessage);
            return [removeMemberResult.status, response];
        }

        response = generateAPIResponse('Succesfully removed user from the board', true)
        return [200, response];
    } catch(error) {

    }
}


module.exports = {
    createUserBoard,
    getBoardsOfUser,
    getBoardData,
    updateBoardData,
    deleteBoardData,
    addMemberToBoard,
    removeMemberFromBoard
}