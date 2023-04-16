import { Request } from "express";
import { generateAPIResponse, checkIfUserIsBoardMember } from "../common/helper.js";
import { APIResponse, ServiceResponse } from "../common/types.js";
import { createBoard, getBoards, getSingleBoard, updateSingleBoard, deleteBoard, addMember, removeMember, checkIfBoardAdmin, checkIfAlreadyMember } from "../services/board.js";


export const createUserBoard = async (req: Request) => {
    let response: APIResponse;
    try {
        const {title, description, cover_photo_url, visibility} = req.body

        const createBoardResult:ServiceResponse = await createBoard(title, cover_photo_url, description, visibility, req.body.userInfo.id);
        
        if(createBoardResult.isError){
            response = generateAPIResponse(createBoardResult.message);
            return {
                status: createBoardResult.status,
                response
            }
        }

        response = generateAPIResponse('Succesfully created board', true)
        return {
            status: 200,
            response
        }
    } catch (error) {
        throw error;
    }
}

export const getBoardsOfUser = async (req:Request) => {
    let response: APIResponse
    try {
        const loggedInUserId = req.body.userInfo.id;

        const getBoardsResult:ServiceResponse = await getBoards(loggedInUserId);

        if(getBoardsResult.isError) {
            response = generateAPIResponse(getBoardsResult.message);
            return {
                status: getBoardsResult.status,
                response
            }
        }

        response = generateAPIResponse('Successfully fetched boards', true, getBoardsResult);
        return {
            status: 200,
            response
        }
    } catch (error) {
        throw error;
    }
}

export const getBoardData = async (req:Request) => {
    let response: APIResponse
    try {
        const boardId = req.params.boardId;
        const loggedInUserId = req.body.userInfo.id;

        const checkIfBoardMemberResult:ServiceResponse = await checkIfUserIsBoardMember(boardId, 'board', loggedInUserId);

        if(checkIfBoardMemberResult.isError) {
            response = generateAPIResponse(checkIfBoardMemberResult.message);
            return {
                status: checkIfBoardMemberResult.status,
                response
            }
        }

        const boardDataResult:ServiceResponse = await getSingleBoard(boardId);

        if(boardDataResult.isError) {
           response = generateAPIResponse(boardDataResult.message);
           return {
            status: boardDataResult.status,
            response
           }
        }

        response = generateAPIResponse('Successfully feched board data', true, boardDataResult);
        return {
            status: 200,
            response
        }
    } catch(error) {
        throw error;
    }
}   

export const updateBoardData = async (req:Request) => {
    let response :APIResponse;
    try {
        const boardId = req.params.boardId
        const loggedInUserId = req.body.userInfo.id;
        const boardValuesToBeUpdated = req.body;

        const checkIfAdminResult:ServiceResponse = await checkIfBoardAdmin(boardId, loggedInUserId);

        if(checkIfAdminResult.isError) {
            response = generateAPIResponse(checkIfAdminResult.message);
            return {
                status: checkIfAdminResult.status,
                response
            }
        }

        //update board
        const boardDataResult:ServiceResponse = await updateSingleBoard(boardId, loggedInUserId, boardValuesToBeUpdated);

        if(boardDataResult.isError) {
            response = generateAPIResponse(boardDataResult.message);
            return {
                status: boardDataResult.status,
                response
            }
        }

        response = generateAPIResponse('Successfully updated board data', true);
        return {
            status: 200,
            response
        }
    } catch(error) {
        throw error;
    }
}

export const deleteBoardData = async (req:Request) => {
    let response:APIResponse;
    try {
        const loggedInUserId = req.body.userInfo.id;
        const boardId = req.params.boardId

        const checkIfAdminResult:ServiceResponse = await checkIfBoardAdmin(boardId, loggedInUserId);

        if(checkIfAdminResult.isError) {
            response = generateAPIResponse(checkIfAdminResult.message);
            return {
                status: checkIfAdminResult.status,
                response
            }
        }

        //delete board
        const deleteBoardResult:ServiceResponse = await deleteBoard(boardId, loggedInUserId);

        if(deleteBoardResult.isError) {
            response = generateAPIResponse(deleteBoardResult.message);
            return {
                status: deleteBoardResult.status,
                response
            }
        }

        response = generateAPIResponse("Successfully deleted board");
        return {
            status: 200, 
            response
        }

    } catch(error) {
        throw error;
    }   
}

export const addMemberToBoard = async (req:Request) => {
    let response: APIResponse
    try {
        const {board_id, user_id} = req.body;
        const loggedInUserId = req.body.userInfo.id

        const checkIfAdminResult = await checkIfBoardAdmin(board_id, loggedInUserId);

        if(checkIfAdminResult.isError) {
            response = generateAPIResponse(checkIfAdminResult.message);
            return {
                status: checkIfAdminResult.status,
                response
            }
        }

        const checkIfAlreadyMemberResult:ServiceResponse = await checkIfAlreadyMember(board_id, user_id);

        if(checkIfAlreadyMemberResult.isError) {
            response = generateAPIResponse(checkIfAlreadyMemberResult.message);
            return {
                status: checkIfAlreadyMemberResult.status,
                response
            }
        }

        const addMemberResult:ServiceResponse = await addMember(board_id, user_id);

        if(addMemberResult.isError) {
            response = generateAPIResponse(addMemberResult.message);
            return {
                status: addMemberResult.status,
                response
            }
        }

        response = generateAPIResponse('Successfully added user to the board', true);
        return {
            status: 201,
            response
        }
    } catch(error) {
        throw error;
    }
}


export const removeMemberFromBoard = async (req:Request) => {
    let response:APIResponse
    try {

        const {board_id, user_id} = req.params;
        const loggedInUserId = req.body.userInfo.id

        const checkIfAdminResult:ServiceResponse = await checkIfBoardAdmin(board_id,loggedInUserId);

        if(checkIfAdminResult.isError) {
            response = generateAPIResponse(checkIfAdminResult.message);
            return {
                status:checkIfAdminResult.status,
                response
            }
        }

        const removeMemberResult:ServiceResponse = await removeMember(board_id, user_id);

        if(removeMemberResult.isError) {
            response = generateAPIResponse(removeMemberResult.message);
            return {
                status: removeMemberResult.status,
                response
            }
        }

        response = generateAPIResponse('Succesfully removed user from the board', true)
        return {
            status: 200,
            response
        }
    } catch(error) {
        throw error;
    }
}