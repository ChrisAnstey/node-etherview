// Middleware for error handling

module.exports = function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

module.exports = function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

module.exports = function errorHandler (err, req, res, next) {
    res.status(500)
    res.render('pages/error', { error: err })
}
