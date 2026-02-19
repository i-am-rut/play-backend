class ApiResponse {
    constructor(status, message, data, success = true) {
        this.status = status
        this.data = data
        this.success = success
        this.message = message ? message : 'Success'
    }
}

export { ApiResponse }