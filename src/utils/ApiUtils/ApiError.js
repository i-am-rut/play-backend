class ApiError extends Error {
    constructor(status, message, data = null) {
        super(message)
        this.status = status
        this.message = message
        this.data = data

        Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError 