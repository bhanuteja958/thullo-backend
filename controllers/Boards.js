const { generateAPIResponse, checkPayloadSchema } = require("../common/helper");
const CreateBoardSchema = require("../requestschema/CreateBoardSchema");
const { createBoard, getBoards } = require("../services/board");
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

module.exports = {
    createUserBoard,
    getBoardsOfUser
}