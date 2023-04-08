import bcrypt from 'bcrypt';
import { generateServiceResponse } from '../common/helper.js';
import { User } from '../models/User.model.js';


export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        return generateServiceResponse(
            200,
            false,
            "Successfully hashed password",
            {
                hashedPassword
            }
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
} 


export const comparePasswords = async (userEnteredEmail, userEnteredPassword) => {
    try{
        const queryResult:any = await User.findOne({
            attributes:['password'],
            where: {
                email: userEnteredEmail
            }
        });

        if(!queryResult.password) {
            return generateServiceResponse(
                200,
                false,
                'Invalid email/password',
                {
                    arePasswordsSame: false
                }
            )
        }

        const arePasswordsSame = await bcrypt.compare(userEnteredPassword, queryResult.password);

        return generateServiceResponse(
            200,
            false,
            arePasswordsSame ?  'Passwords match succesfully': 'Invalid email/password',
            {
                arePasswordsSame
            }
        )
    } catch(error) {
        return generateServiceResponse(
            500,
            true,
            error.message
        )
    }
} 