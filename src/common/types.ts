export interface ServiceResponse {
    status: number
    isError: boolean
    message: string
    data: any
}

export interface APIResponse {
    success: boolean,
    message: string,
    data: any
}

export interface ControllerResponse {
    status: number,
    response: APIResponse
}