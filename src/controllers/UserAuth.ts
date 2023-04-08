import { generateAPIResponse, generateRandomString} from "../common/helper.js";
import { checkIfUserWithEmailExists, createUser, getUser, getUserToken, checkUserToken} from "../services/user.js";
import { hashPassword, comparePasswords } from "../services/hashing.js";
import { generateJWTToken } from "../services/jwttoken.js";
import { sendVerifyEmail } from "../services/mailing.js";

export const registerUser = async (userData) => {
    let response = {}

    try {
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
        const hashedPasswordResult:any = await hashPassword(password);

        if(hashedPasswordResult.errorMessage) {
            response = generateAPIResponse(hashedPasswordResult.errorMessage);
            return [hashedPasswordResult.status, response]
        }

        userData.hashedPassword = hashedPasswordResult;

        userData.token = generateRandomString();

        //creating user
        const userCreationResult:any = await createUser(userData);
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

export const loginUser = async (loginData) => {
    let response = {};
    
    try {

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

export const sendVerificationEmail = async (req) => {
    let response = {};
    try {
        const tokenResult:any = await getUserToken(req.userInfo.email);

        if(tokenResult.errorMessage) {
            response = generateAPIResponse(tokenResult.errorMessage);
            return [tokenResult.status,response];
        }

        //send verification email
        const sendVerifyEmailResult = await sendVerifyEmail(tokenResult.token, req.userInfo.email);

        if(sendVerifyEmailResult.errorMessage) {
            response = generateAPIResponse(sendVerifyEmailResult.errorMessage);
            return [sendVerifyEmailResult.status,response];
        }

        return [200, generateAPIResponse('Verfication email successfully sent', true) ]

    } catch(error) {
        console.log(error)
    }
}

export const verifyUserToken = async (token) => {
    let response = {}
    try{
        
        const checkUserTokenResult:any = await checkUserToken(token);

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