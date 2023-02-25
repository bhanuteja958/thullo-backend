const url = require('url'); 
const { SCHEMA_ENDPOINT_MAPPING, TOKEN_VERIFICATION_NOT_REQUIRED_URLS } = require("./common/constants");
const { generateAPIResponse, checkPayloadSchema, getBaseUrl } = require("./common/helper");
const { extractAndVerifyToken } = require("./services/jwttoken");

module.exports.accessTokenVerification = (req, res, next) => {
    if(!TOKEN_VERIFICATION_NOT_REQUIRED_URLS.includes(req.originalUrl)) {
        const verifyTokenResult = extractAndVerifyToken(req.headers?.authorization);
    
        if(verifyTokenResult.errorMessage) {
            const response = generateAPIResponse(verifyTokenResult.errorMessage);
            res.status(verifyTokenResult.status).json(response);
        }

        req['userInfo'] = verifyTokenResult;
    }

    next();
}