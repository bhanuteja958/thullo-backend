const bcrypt = require('bcrypt');
const { User } = require('../models/User.model');
const { getDBConnection } = require('./database');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword;
    } catch(error) {
        console.log('Error while hashing password: ', error);
        return {
            errorMessage: 'Something went wrong',
            status: 500
        }
    }
} 

const comparePasswords = async (userEnteredEmail, userEnteredPassword) => {
    try{
        const queryResult = await User.findOne({
            attributes:['password'],
            where: {
                email: userEnteredEmail
            }
        });

        if(!queryResult.password) {
            return {
                arePasswordsSame: false,
                message: 'Invalid email/password'
            }
        }

        const arePasswordsSame = await bcrypt.compare(userEnteredPassword, queryResult.password);

        return {
            arePasswordsSame,
            message: arePasswordsSame ? '' : 'Invalid email/password'
        }
    } catch(error) {
        console.log('Unable to query DB: ',error);
        return {
            errorMessage: 'Something went wrong',
            status:500
        };
    }
} 

module.exports = {
    hashPassword,
    comparePasswords
}