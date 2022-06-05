class BaseError extends Error {
    constructor ({ source, message, statusCode, statusText, description }) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode
        this.statusText = statusText
        this.message = message;
        this.source = source
        Error.captureStackTrace(this)
    }
}
   
module.exports = BaseError