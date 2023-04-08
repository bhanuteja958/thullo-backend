import { generateAPIResponse, generateRandomString} from "../common/helper.js";
import { checkIfUserWithEmailExists, createUser, getUser, getUserToken, checkUserToken} from "../services/user.js";
import { hashPassword, comparePasswords } from "../services/hashing.js";
import { generateJWTToken } from "../services/jwttoken.js";
import { sendVerifyEmail } from "../services/mailing.js";
import { APIResponse, ServiceResponse } from "../common/types.js";
import { Request } from "express";

export const registerUser = async (req: Request) => {
    let response: APIResponse

    try {
        const { email, password} = req.body;

        //email already exists check 
        const emailExistsCheckResult = await checkIfUserWithEmailExists(email);

        if (emailExistsCheckResult.data.isEmailAlreadyExists) {
            response = generateAPIResponse(emailExistsCheckResult.message);
            return {
                status: 400,
                response
            }
        } 

        if(emailExistsCheckResult.isError) {
            response = generateAPIResponse(emailExistsCheckResult.message);
            return {
                status: emailExistsCheckResult.status,
                response
            }
        }

        //hashing password with salt 
        const hashedPasswordResult:ServiceResponse = await hashPassword(password);

        if(hashedPasswordResult.isError) {
            response = generateAPIResponse(hashedPasswordResult.message);
            return {
                status: hashedPasswordResult.status,
                response
            }
        }

        let hashedPassword:string = hashedPasswordResult.data.hashedPassword;

        let token:string = generateRandomString();

        const  { first_name, last_name } = req.body

        //creating user
        const userCreationResult:ServiceResponse = await createUser(email, first_name,last_name, hashedPassword, token );
        if(userCreationResult.isError) {
            response = generateAPIResponse(userCreationResult.message);
            return {
                status: userCreationResult.status,
                response
            }
        } else {
            response = generateAPIResponse('Successfully created user');
            return {
                status: 201,
                response
            }
        }
    } catch(error) {
       return {
            status: 500,
            response: generateAPIResponse(
                error.message,
                true,
            )
       }
    }
    
}

export const loginUser = async (req:Request) => {
    let response:APIResponse;
    
    try {

        const {email, password} = req.body

        //email already exists check 
        const emailExistsCheckResult:ServiceResponse = await checkIfUserWithEmailExists(email);

        if (!emailExistsCheckResult.data.isEmailAlreadyExists) {
            response = generateAPIResponse(emailExistsCheckResult.message);
            return {
                status: 400,
                response
            }
        }

        //comparing passwords
        const comparePasswordsResult = await comparePasswords(email, password);

        if(!comparePasswordsResult.data.arePasswordsSame){
            response = generateAPIResponse(comparePasswordsResult.message);
            return {
                status: 400,
                response
            }
        }

        if(comparePasswordsResult.isError) {
            response = generateAPIResponse(comparePasswordsResult.message);
            return {
                status: comparePasswordsResult.status,
                response
            }
        }

        //get user details
        const userdetailsResult:ServiceResponse = await getUser(email);

        if(userdetailsResult.isError) {
            response = generateAPIResponse(userdetailsResult.message);
            return {
                status: userdetailsResult.status,
                response
            }
        }

        //generate jwt token
        const accessTokenGenerationResult:ServiceResponse = await generateJWTToken({
            ...userdetailsResult.data,
            email
        });

        if(accessTokenGenerationResult.isError) {
            response = generateAPIResponse(accessTokenGenerationResult.message);
            return {
                status: accessTokenGenerationResult.status,
                response
            }
        }

        return {
            status: 200, 
            response: generateAPIResponse(
                'successfully logged in user',
                true,
                {
                    accessToken: accessTokenGenerationResult.data
                }
            )
        }

    } catch(error) {
        return {
            status: 500,
            response: generateAPIResponse(
                error.message,
                true,
            )
       }
    }
}

export const sendVerificationEmail = async (req:Request) => {
    let response:APIResponse;
    try {
        const { email } = req.body.userInfo
        const tokenResult:ServiceResponse = await getUserToken(email);

        if(tokenResult.isError) {
            response = generateAPIResponse(tokenResult.message);
            return {
                status: tokenResult.status,
                response
            }
        }

        //send verification email
        const sendVerifyEmailResult:ServiceResponse = await sendVerifyEmail(tokenResult.data, email);

        if(sendVerifyEmailResult.isError) {
            response = generateAPIResponse(sendVerifyEmailResult.message);
            return {
                status: sendVerifyEmailResult.status,
                response
            }
        }

        return {
            status: 200, 
            response: generateAPIResponse('Verfication email successfully sent', true)
        }
    } catch(error) {
        return {
            status: 500,
            response: generateAPIResponse(
                error.message,
                true,
            )
       }
    }
}

export const verifyUserToken = async (req:Request) => {
    let response:APIResponse;
    try{
        const {token} = req.params;

        const checkUserTokenResult:ServiceResponse = await checkUserToken(token);

        if(checkUserTokenResult.isError) {
            response = generateAPIResponse(checkUserTokenResult.message);
            return {
                status: checkUserTokenResult.status,
                response
            }
        }

        response = generateAPIResponse('Successfully verified email', true);
        return {
            status: 200,
            response
        }
    } catch(error) {
        return {
            status: 500,
            response: generateAPIResponse(
                error.message,
                true,
            )
       }
    }
}