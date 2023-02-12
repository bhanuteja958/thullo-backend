const checkForMandatoryParams = (mandatoryParams, paramsFromRequest) => {
    const missingMandatoryParams = []

    mandatoryParams.forEach((mandatoryParam) => {
        let mandatoryParamValue = paramsFromRequest[mandatoryParam]
        mandatoryParamValue = typeof(mandatoryParamValue) === 'string' ? mandatoryParamValue.trim() : mandatoryParamValue
        if(mandatoryParamValue !== 0 && !mandatoryParamValue) {
            missingMandatoryParams.push(mandatoryParam);
        }
    })

    return {
        message: missingMandatoryParams.length > 0 ?
        `Missing mandatory parameters (${missingMandatoryParams.concat(',')})` : '',
        isMandatoryParamsExist: (missingMandatoryParams.length === 0)
    }
}

const generateAPIResponse = (message,success=false, data=[]) => {
    return {
        success,
        message,
        data
    }
}

 
module.exports = {
    checkForMandatoryParams,
    generateAPIResponse
}