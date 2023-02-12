const { REGISTER_MANDATORY_PARAMS } = require('../common/constants');
const { checkForMandatoryParams, generateAPIResponse } = require('../common/Helper');
const { checkIfUserWithEmailExists, createUser } = require('../services/auth');
const { hashPassword } = require('../services/hashing');

const registerUser = async (userDetails) => {
    //mandatory parmas check
    const  mandatoryParamsCheckResult = checkForMandatoryParams(REGISTER_MANDATORY_PARAMS, userDetails);

    let response = {}

    if (!mandatoryParamsCheckResult.isMandatoryParamsExist) {
        response = generateAPIResponse(mandatoryParamsCheckResult.message);
        return [400, response];
    } 

    const { email, password} = userDetails;

    //email already exists check 
    const emailExistsCheckResult = await checkIfUserWithEmailExists(email);

    if (emailExistsCheckResult.isEmailAlreadyExists) {
        response = generateAPIResponse(emailExistsCheckResult.message);
        return [400, response];
    } 

    //hashing password with salt 
    const hashedPassword = await hashPassword(password);

    if(!hashedPassword) {
        response = generateAPIResponse('Error while hashing password')
        return [400, response]
    }

    userDetails.hashedPassword = hashedPassword;

    const isUserCreated = await createUser(userDetails);
    if(isUserCreated) {
        response = generateAPIResponse('Succesfully created user', true);
        return [201, response];
    } else {
        response = generateAPIResponse('Something went wrong');
        return [400, response]
    }

}

module.exports = {
    registerUser
}