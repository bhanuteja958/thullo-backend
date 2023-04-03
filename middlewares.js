const { TOKEN_VERIFICATION_NOT_REQUIRED_URLS } = require("./common/constants");
const { generateAPIResponse } = require("./common/helper");
const { addMemberToCard } = require('./controllers/Cards');
const { AddAttachemntSchema, UpdateAttachmentSchema } = require('./requestschema/AttachemntSchema');
const { CreateBoardSchema, UpdateBoardSchema } = require('./requestschema/BoardSchema');
const { CreateCardSchema, UpdateCardSchema, AddMemberSchema } = require('./requestschema/CardSchema');
const { AddCommentSchema, UpdateCommentSchema } = require('./requestschema/CommentSchema');
const { AddLabelSchema, UpdateLabelSchema } = require('./requestschema/LabelSchema');
const { CreateListSchema } = require('./requestschema/ListSchema');
const { LoginSchema } = require('./requestschema/LoginSchema');
const RegisterSchema = require('./requestschema/RegisterSchema');
const { extractAndVerifyToken } = require("./services/jwttoken");

module.exports.accessTokenVerification = (req, res, next) => {
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

module.exports.checkPayloadSchema = (req, res, next) => {
    if(['POST','PUT'].includes(req.method)) {
        const originalUrl = req.originalUrl;
        let payloadSchema = {};
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