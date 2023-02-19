const { generateAPIResponse, checkPayloadSchema } = require("../common/helper");
const { CreateBoardSchema } = require("../requestschema/BoardSchema");
const { createBoard, getBoards, getSingleBoard, updateSingleBoard, deleteBoard } = require("../services/board");
const { extractAndVerifyToken } = require("../services/jwttoken");

const createUserBoard = async (req) => {
    let response = {};
    try {
        const verifyTokenResult = extractAndVerifyToken(req.headers?.authorization);
        
        if(verifyTokenResult.errorMessage) {
            response = generateAPIResponse(verifyTokenResult.errorMessage);
            return [verifyTokenResult.status, response];
        }

        const checkPayloadSchemaResult = checkPayloadSchema(CreateBoardSchema, req.body);

        if(checkPayloadSchemaResult.errorMessage) {
            response = generateAPIResponse(checkPayloadSchemaResult.errorMessage);
            return [checkPayloadSchemaResult.status, response]
        }

        req.body.user_id = verifyTokenResult.id;


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
        //verify token 
        const verifyTokenResult = extractAndVerifyToken(req.headers?.authorization);
        
        if(verifyTokenResult.errorMessage) {
            response = generateAPIResponse(verifyTokenResult.errorMessage);
            return [verifyTokenResult.status, response];
        }

        const userId = verifyTokenResult.id;

        const getBoardsResult = await getBoards(userId);

        if(getBoardsResult.errorMessage) {
            response = generateAPIResponse(getBoardsResult.errorMessage);
            return [getBoardsResult.status, response];
        }

        console.log(getBoardsResult)

        response = generateAPIResponse('Successfully fetched boards', true, data=getBoardsResult);
        return [200, response];
    } catch (error) {
        console.log(error);
    }
}

const getBoardData = async (req) => {
    try {
        //verify token
        const verifyTokenResult = extractAndVerifyToken(req.headers?.authorization);
        
        if(verifyTokenResult.errorMessage) {
            response = generateAPIResponse(verifyTokenResult.errorMessage);
            return [verifyTokenResult.status, response];
        }

        const boardId = req.params.boardId

        if(!boardId){
            response = generateAPIResponse("Board Id is empty");
            return [400, response];
        }

        const userId = verifyTokenResult.id;

        const boardDataResult = await getSingleBoard(boardId, userId);

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
        //verify access token
        const verifyTokenResult = extractAndVerifyToken(req.headers?.authorization);
        
        if(verifyTokenResult.errorMessage) {
            response = generateAPIResponse(verifyTokenResult.errorMessage);
            return [verifyTokenResult.status, response];
        }

        const boardId = req.params.boardId

        if(!boardId){
            response = generateAPIResponse("Board Id is empty");
            return [400, response];
        }

        //verify request payload

        const checkPayloadSchemaResult = checkPayloadSchema(CreateBoardSchema, req.body);

        if(checkPayloadSchemaResult.errorMessage) {
            response = generateAPIResponse(checkPayloadSchemaResult.errorMessage);
            return [checkPayloadSchemaResult.status, response]
        }

        const userId = verifyTokenResult.id;
        const boardValuesToBeUpdated = req.body;
    

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

        //verify access token
        const verifyTokenResult = extractAndVerifyToken(req.headers?.authorization);
        
        if(verifyTokenResult.errorMessage) {
            response = generateAPIResponse(verifyTokenResult.errorMessage);
            return [verifyTokenResult.status, response];
        }

        const userId = verifyTokenResult.id;

        const boardId = req.params.boardId

        if(!boardId){
            response = generateAPIResponse("Board Id is empty");
            return [400, response];
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



module.exports = {
    createUserBoard,
    getBoardsOfUser,
    getBoardData,
    updateBoardData,
    deleteBoardData
}