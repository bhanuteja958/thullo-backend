const jwt = require('jsonwebtoken');

const generateJWTToken = async (userData) => {
    try {
        const accessToken = jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '12h'});
        return accessToken;
    } catch(error) {    
        console.log('Error while generating access token:', error);
        return {
            errorMessage: 'something went wrong',
            status: 500
        }
    }
}

const extractAndVerifyToken = async (bearerToken) => {
    const notAuthorizedResponse = {
        errorMessage: 'Not Authorized',
        status: 401
    }
    if(!bearerToken) {
        return notAuthorizedResponse;
    }

    const bearerTokenParts = bearerToken.split(' ');
    if(!bearerTokenParts[1] || !bearerTokenParts[1].trim()){
        return notAuthorizedResponse;
    }

    const authToken = bearerTokenParts[1];

    try{
        const decodedToken =  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
        return decodedToken
    } catch(error) {
        console.log('Error while verifying access token:', error);
        return {
            errorMessage: 'Wrong Signature',
            status: 400
        }
    }
}

module.exports = {
    generateJWTToken,
    extractAndVerifyToken
}