class ApiError extends Error {
    constructor(status, message, data = {}, code = null) {
        super(message)
        this.status = status
        this.message = message
        this.data = data
        this.code = code

        Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError 