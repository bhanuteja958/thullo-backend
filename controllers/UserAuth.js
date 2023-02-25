const {  generateAPIResponse, generateRandomString, checkPayloadSchema } = require('../common/helper');
const { LoginSchema } = require('../requestschema/LoginSchema');
const RegisterSchema = require('../requestschema/RegisterSchema');
const { checkIfUserWithEmailExists, createUser, getUser, getUserToken, checkUserToken } = require('../services/user');
const { hashPassword, comparePasswords } = require('../services/hashing');
const { generateJWTToken, extractAndVerifyToken } = require('../services/jwttoken');
const { sendVerifyEmail } = require('../services/mailing');

const registerUser = async (userData) => {
    let response = {}

    try {
        const checkPayloadSchemaResult = checkPayloadSchema(RegisterSchema, userData);

        if(checkPayloadSchemaResult.errorMessage) {
            response = generateAPIResponse(checkPayloadSchemaResult.errorMessage);
            return [checkPayloadSchemaResult.status, checkPayloadSchemaResult.errorMessage];
        }

        const { email, password} = userData;

        //email already exists check 
        const emailExistsCheckResult = await checkIfUserWithEmailExists(email);

        if (emailExistsCheckResult.isEmailAlreadyExists) {
            response = generateAPIResponse(emailExistsCheckResult.message);
            return [400, response];
        } 

        if(emailExistsCheckResult.errorMessage) {
            response = generateAPIResponse(emailExistsCheckResult.errorMessage);
            return [emailExistsCheckResult.status, response]
        }

        //hashing password with salt 
        const hashedPasswordResult = await hashPassword(password);

        if(hashedPasswordResult.errorMessage) {
            response = generateAPIResponse(errorMessage);
            return [hashedPasswordResult.status, response]
        }

        userData.hashedPassword = hashedPasswordResult;

        userData.token = generateRandomString();

        //creating user
        const userCreationResult = await createUser(userData);
        if(userCreationResult.errorMessage) {
            response = generateAPIResponse(userCreationResult.errorMessage);
            return [userCreationResult.status, response];
        } else {
            response = generateAPIResponse('Successfully created user');
            return [201, response]
        }
    } catch(error) {
        console.log(error);
    }
    
}

const loginUser = async (loginData) => {
    let response = {};
    
    try {
        const checkPayloadSchemaResult = checkPayloadSchema(LoginSchema, loginData);

        if(checkPayloadSchemaResult.errorMessage) {
            response = generateAPIResponse(checkPayloadSchemaResult.errorMessage);
            return [checkPayloadSchemaResult.status, checkPayloadSchemaResult.errorMessage];
        }

        const {email, password} = loginData

        //email already exists check 
        const emailExistsCheckResult = await checkIfUserWithEmailExists(email);

        if (!emailExistsCheckResult.isEmailAlreadyExists) {
            response = generateAPIResponse(emailExistsCheckResult.message);
            return [400, response];
        }

        //comparing passwords
        const comparePasswordsResult = await comparePasswords(email, password);

        if(!comparePasswordsResult.arePasswordsSame){
            response = generateAPIResponse(comparePasswordsResult.message);
            return [400, response];
        }

        if(comparePasswordsResult.errorMessage) {
            response = generateAPIResponse(comparePasswordsResult.errorMessage);
            return [comparePasswordsResult.status, response]
        }

        //get user details
        const userdetailsResult = await getUser(email);

        if(userdetailsResult.errorMessage) {
            response = generateAPIResponse(userdetailsResult.errorMessage);
            return [userdetailsResult.status, response];
        }

        userdetailsResult.email = email

        //generate jwt token
        const accessTokenGenerationResult = await generateJWTToken(userdetailsResult);

        if(accessTokenGenerationResult.errorMessage) {
            response = generateAPIResponse(accessTokenGenerationResult.errorMessage);
            return [accessTokenGenerationResult.status, response];
        }

        return [
            200, 
            generateAPIResponse(
                'successfully logged in user',
                true,
                {
                    accessToken: accessTokenGenerationResult
                }
            )
        ]

    } catch(error) {
        console.log(error)
    }
}

const sendVerificationEmail = async () => {
    let response = {};
    try {
        const tokenResult = await getUserToken(req.userInfo.email);

        if(tokenResult.errorMessage) {
            response = generateAPIResponse(tokenResult.errorMessage);
            return [tokenResult.status,response];
        }

        //send verification email
        const sendVerifyEmailResult = await sendVerifyEmail(tokenResult, req.userInfo.email);

        if(sendVerifyEmailResult.errorMessage) {
            response = generateAPIResponse(sendVerifyEmailResult.errorMessage);
            return [sendVerifyEmailResult.status,response];
        }

        return [200, generateAPIResponse('Verfication email successfully sent', true) ]

    } catch(error) {
        console.log(error)
    }
}

const verifyUserToken = async (token) => {
    let response = {}
    try{
        
        const checkUserTokenResult = await checkUserToken(token);

        if(checkUserTokenResult.errorMessage) {
            response = generateAPIResponse(checkUserTokenResult.errorMessage);
            return [checkUserTokenResult.status,response]; 
        }

        response = generateAPIResponse('Successfully verified email', true);
        return [200, response];
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    sendVerificationEmail,
    verifyUserToken
}