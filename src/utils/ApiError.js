class ApiError extends Error{
    constructor(
        statusCode,
        message= "somethig went wrong on APIError.js file",
        errors = [],
        statck = "",
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null    
        this.message = message
        this.errors = errors
        if (stack){
            this.stack=stack
        } else{
            error.captureStackTrace(this,this.constructor)
        }
    }
}

export { ApiError }