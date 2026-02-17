class ApiError extends Error {
    constructor(status, message, success = false) {
        super(message)
        this.status = status
        this.message = message
        this.data = null
        this.success = success
        this.stack = ''

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

}

return { ApiError }