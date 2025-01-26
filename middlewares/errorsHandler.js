function errorsHandler(err, req, res, next) {
    // console.log(err.stack);

    res.status(500)
    res.json({
        error: err.message
    })
};

module.exports = errorsHandler;