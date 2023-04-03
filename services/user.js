const { User } = require('../models/User.model');

const checkIfUserWithEmailExists = async (email) => {
    try{
        const user = await User.findOne({
            attributes: ['id'],
            where: {
                email: email
            }
        });

        return {
            isEmailAlreadyExists: user ? true : false,
            message: user ? 'A user with the given email already exists' : 'Invalid Email/Password'
        }
    } catch(error) {
        console.log('Unable to query DB: ',error);
        return {
           status: 500,
           errorMessage: 'Something went wrong',
        }
    }
    
}

const createUser = async (userDetails) => {
    try {
        const {email, first_name, last_name, hashedPassword, token} = userDetails;
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            token 
        })
        return user
    } catch (error) {
        console.log('Error while creating user: ', error);
        return {
            errorMessage: 'Something went wrong',
            status: 500
        }
    }
}

const getUser = async (email) => {
    try {
        const user = await User.findOne({
            attributes: ['id','first_name', 'last_name'],
            where: {
                email
            }
        })
        return user.dataValues
    } catch(error) {
        console.log('Error while fetching user details : ',error);
        return {
            errorMessage: 'something went wrong',
            status: 500
        }
    }
}

const getUserToken = async (email) => {
    try {
        const userTokenResult = await User.findOne({
            attributes:['token'],
            where: {
                email
            }
        });

        return userTokenResult
    } catch(error) {
        console.log('Error while fetching user token : ',error);
        return {
            errorMessage: 'something went wrong',
            status: 500
        }
    }
}

const checkUserToken =async (token) => {
    try {
        const userTokenResult = await User.update({
            is_verified:1
        },{
            where: {
                token
            }
        });

        if(userTokenResult[0] === 0) {
            return {
                errorMessage: 'Not a valid token',
                status: 400,
            }
        }

        return userTokenResult
    } catch(error) {
        console.log('Error while checking user token : ',error);
        return {
            errorMessage: 'something went wrong',
            status: 500
        }
    }
}

module.exports = {
    checkIfUserWithEmailExists,
    createUser,
    getUser,
    getUserToken,
    checkUserToken
}
