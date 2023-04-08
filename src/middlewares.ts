import { TOKEN_VERIFICATION_NOT_REQUIRED_URLS } from "./common/constants.js";
import { generateAPIResponse } from "./common/helper.js";
import {AddAttachemntSchema, UpdateAttachmentSchema} from './requestschema/AttachemntSchema.js'
import { AddMemberSchema, CreateBoardSchema, UpdateBoardSchema } from "./requestschema/BoardSchema.js";
import { CreateCardSchema, UpdateCardSchema } from "./requestschema/CardSchema.js";
import { AddCommentSchema, UpdateCommentSchema } from "./requestschema/CommentSchema.js";
import { AddLabelSchema, UpdateLabelSchema } from "./requestschema/LabelSchema.js";
import { CreateListSchema } from "./requestschema/ListSchema.js";
import { LoginSchema } from "./requestschema/LoginSchema.js";
import { RegisterSchema } from "./requestschema/RegisterSchema.js";
import { extractAndVerifyToken } from "./services/jwttoken.js";


export const accessTokenVerification = (req, res, next) => {
    if(!TOKEN_VERIFICATION_NOT_REQUIRED_URLS.includes(req.originalUrl)) {
        const verifyTokenResult = extractAndVerifyToken(req.headers?.authorization);
    
        if(verifyTokenResult.errorMessage) {
            const response = generateAPIResponse(verifyTokenResult.errorMessage);
            return res.status(verifyTokenResult.status).json(response);
        }

        req['userInfo'] = verifyTokenResult;

    }

    next();
}

const getPostAPIPayloadSchema = (url) => {
    switch(url){
        case '/api/board':
        case '/api/board/':
            return CreateBoardSchema;
        case '/api/list':
        case '/api/list/':
            return CreateListSchema;
        case '/api/card':
        case '/api/card/':
            return CreateCardSchema;
        case '/api/comment':
        case '/api/comment/':
            return AddCommentSchema;
        case '/api/board/addMember':
        case '/api/board/addMember/':
            return AddMemberSchema;
        case '/api/card/addMember':
        case '/api/card/addMember/':
            return AddMemberSchema;
        case '/api/user/login':
        case '/api/user/login/':
            return LoginSchema;
        case '/api/user/register':
        case '/api/user/register/':
            return RegisterSchema;
        case '/api/attachment':
        case '/api/attachment/':
            return AddAttachemntSchema;
        case '/api/label':
        case '/api/label/':
            return AddLabelSchema; 
        default:
            return null;
    }
}

const getPutAPIPayloadShema = (url) => {
    switch(true) {
        case /\/api\/board\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[\/]?/.test(url):
            return UpdateBoardSchema;
        case /\/api\/card\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}[\/]?/.test(url):
            return UpdateCardSchema;
        case /\/api\/comment\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}\/?/.test(url):
            return UpdateCommentSchema;
        case /\/api\/attachment\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}\/?/.test(url):
            return UpdateAttachmentSchema;
        case /\/api\/label\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}\/?/.test(url):
            return UpdateLabelSchema;
        default:
            return null;
    }
}

export const checkPayloadSchema = (req, res, next) => {
    if(['POST','PUT'].includes(req.method)) {
        const originalUrl = req.originalUrl;
        let payloadSchema:any = {};
        switch (req.method) {
            case 'POST':
                payloadSchema = getPostAPIPayloadSchema(originalUrl);
                break;
            case 'PUT':
                payloadSchema = getPutAPIPayloadShema(originalUrl);
                break;
            default:
                break;
        }

        if (payloadSchema) {
            const {error} = payloadSchema.validate(req.body);
            if(error) {
                const response = generateAPIResponse(error.details[0].message);
                return res.status(400).json(response);
            }
        }
    }

    next()
}