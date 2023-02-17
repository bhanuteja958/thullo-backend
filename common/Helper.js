const crypto = require('crypto');

const checkMandatoryParams = (mandatoryParams, paramsFromRequest) => {
    const missingMandatoryParams = []

    mandatoryParams.forEach((mandatoryParam) => {
        let mandatoryParamValue = paramsFromRequest[mandatoryParam];
        mandatoryParamValue = typeof(mandatoryParamValue) === 'string' ? mandatoryParamValue.trim() : mandatoryParamValue
        if(mandatoryParamValue !== 0 && !mandatoryParamValue) {
            missingMandatoryParams.push(mandatoryParam);
        }
    })

    if(missingMandatoryParams.length > 0) {
        return {
            errorMessage:  `Missing mandatory parameters (${missingMandatoryParams.concat(',')})`,
            status: 400
        }
    }

    return {
        errorMessage: ''
    }
}

const checkPayloadSchema = (schema, payload) => {
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

module.exports.checkMandatoryParamsAndPayloadSchema = (mandatoryParams, schema, payload) => {
    const mandatoryParamsCheckResult = checkMandatoryParams(mandatoryParams, payload);

    if(mandatoryParamsCheckResult.errorMessage) {
        return mandatoryParamsCheckResult;
    }

    const payloadSchemaCheckResult = checkPayloadSchema(schema, payload);

    if(payloadSchemaCheckResult.errorMessage) {
        return payloadSchemaCheckResult;
    }

    return {
        errorMessage: '',
        status: 200
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