const { REGISTER_MANDATORY_PARAMS, LOGIN_MANDATORY_PARAMNS } = require('../common/constants');
const {  generateAPIResponse, checkMandatoryParamsAndPayloadSchema } = require('../common/helper');
const { LoginSchema } = require('../requestschema/LoginSchema');
const RegisterSchema = require('../requestschema/RegisterSchema');
const { checkIfUserWithEmailExists, createUser, getUser } = require('../services/user');
const { hashPassword, comparePasswords } = require('../services/hashing');
const { generateJWTToken } = require('../services/jwttoken');

const registerUser = async (userData) => {
    try {
        let response = {}
        // checking mandatory params and payload schema
        const mandatoryParamsandPayloadSchemaCheckResult = checkMandatoryParamsAndPayloadSchema(REGISTER_MANDATORY_PARAMS, RegisterSchema, userData);

        if(mandatoryParamsandPayloadSchemaCheckResult.errorMessage) {
            response = generateAPIResponse(mandatoryParamsandPayloadSchemaCheckResult.errorMessage )
            return [mandatoryParamsandPayloadSchemaCheckResult.status, response]
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

        //creating user
        const userCreationResult = await createUser(userData);
        if(userCreationResult.errorMessage) {
            response = generateAPIResponse(userCreationResult.errorMessage);
            return [userCreationResult.status, userCreationResult.errorMessage];
        } else {
            response = generateAPIResponse('Successfully created user');
            return [201, response]
        }
    } catch(error) {
        console.log(error);
    }
    
}

const loginUser = async (loginData) => {
    try{
        let response = {}
        // checking mandatory params and payload schema
        const mandatoryParamsandPayloadSchemaCheckResult = checkMandatoryParamsAndPayloadSchema(LOGIN_MANDATORY_PARAMNS, LoginSchema, loginData);

        if(mandatoryParamsandPayloadSchemaCheckResult.errorMessage) {
            response = generateAPIResponse(mandatoryParamsandPayloadSchemaCheckResult.errorMessage )
            return [mandatoryParamsandPayloadSchemaCheckResult.status, response]
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

module.exports = {
    registerUser,
    loginUser
}