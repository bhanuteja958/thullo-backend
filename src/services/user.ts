import { generateServiceResponse } from "../common/helper.js";
import { User } from "../models/User.model.js";


export const checkIfUserWithEmailExists = async (email:string) => {
    try{
        const user = await User.findOne({
            attributes: ['id'],
            where: {
                email: email
            }
        }); 

        return generateServiceResponse(
            200,
            false,
            user ? 'A user with the given email already exists' : 'Invalid Email/Password',
            {
                isEmailAlreadyExists: user ? true : false,
            },
        );
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}


export const createUser = async (email: string, first_name:string, last_name: string, hashedPassword: string, token: string) => {
    try {
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            token 
        });

        return generateServiceResponse(
            200,
            false,
            "Successfully created user",
            user.dataValues
        );

    } catch (error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        );
    }
}


export const getUser = async (email:string) => {
    try {
        const user = await User.findOne({
            attributes: ['id','first_name', 'last_name', 'is_verified'],
            where: {
                email
            }
        })
        return generateServiceResponse(
            200,
            false,
            user ? "Successfully fetched user" : 'No such user exists',
            user ? user.dataValues : null
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}


export const getUserToken = async (email:string) => {
    try {
        const userToken = await User.findOne({
            attributes:['token'],
            where: {
                email
            }
        });

        return generateServiceResponse(
            200,
            false,
            userToken ? "successfully feched user token" : 'No user token exists for the given email',
            userToken ? userToken.dataValues.token : null
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}


export const checkUserToken =async (token:string) => {
    try {
        const userTokenResult = await User.update({
            is_verified:1
        },{
            where: {
                token
            }
        });

        return generateServiceResponse(
            200,
            false,
            userTokenResult[0] === 0 ? 'Not a valid token' : 'Successfully verified User'
        );
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
}
