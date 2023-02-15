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

module.exports = {
    generateJWTToken
}