const { getDBConnection } = require("./database");

const sequelize = getDBConnection();
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
            message: user ? 'A user with the given email already exists' : ''
        }
    } catch(error) {
        console.log('Unable to query DB: ',error);
        return {
            isEmailAlreadyExists: true,
            message: 'Something went wrong',
        }
    }
    
}

const createUser = async (userDetails) => {
    try {
        const {email, first_name, last_name, hashedPassword} = userDetails;
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword 
        })
        return user ? true : false
    } catch (error) {
        console.log('Error while creating user: ', error);
        return false
    }
}

module.exports = {
    checkIfUserWithEmailExists,
    createUser
}
