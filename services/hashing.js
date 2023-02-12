const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword;
    } catch(error) {
        console.log('Error while hashing password: ', error);
        return '';
    }
}   

module.exports = {
    hashPassword
}