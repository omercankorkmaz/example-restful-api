const logErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.statusText = err.statusText || 'Internal Server Error';
    console.error(err)
    next(err)
}
  
const sendErrorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode).send({ ...err })
}

module.exports = {
    logErrorMiddleware,
    sendErrorMiddleware,
}