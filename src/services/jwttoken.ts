import jwt from 'jsonwebtoken'
import { generateServiceResponse } from '../common/helper.js';
import { ServiceResponse } from '../common/types.js';


export const generateJWTToken = async (userData) => {
    try {
        const accessToken = jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '12h'});
        return generateServiceResponse(
            200,
            false,
            "Successfully generated token",
            accessToken
        )
    } catch(error) {    
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}

export const extractAndVerifyToken = (bearerToken:string) => {
    const notAuthorizedResponse:ServiceResponse = generateServiceResponse (
        401,
        true,
        'Not Authorized', 
    )
    

    if(!bearerToken) {
        return notAuthorizedResponse;
    }
    const bearerTokenParts:Array<string> = bearerToken.split(' ');
    if(!bearerTokenParts[1] || !bearerTokenParts[1].trim()){
        return notAuthorizedResponse;
    }

    const authToken:string = bearerTokenParts[1];

    try{
        const decodedToken = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
        return generateServiceResponse (
            200,
            false,
            "Successfully verified token",
            decodedToken
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}