const crypto = require('crypto');

module.exports.checkPayloadSchema = (schema, payload) => {
    const {error} = schema.validate(payload);

    if(error) {
        return {
            errorMessage: error.details[0].message,
            status: 400,
        }
    }

    return {
        errorMessage: ''
    }
}

module.exports.generateAPIResponse = (message,success=false, data=[]) => {
    return {
        success,
        message,
        data
    }
}

module.exports.generateRandomString = () => {
    const randomstring = crypto.randomBytes(20).toString('hex');
    return randomstring;
}