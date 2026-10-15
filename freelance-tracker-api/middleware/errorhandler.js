const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Mongoose bad ObjectId
    if (err.name === 'CastError') err.message = `Resource not found with id of ${err.value}`;
    
    // Mongoose duplicate key
    if (err.code === 11000) err.message = 'Duplicate field value entered';

    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message
    });
};

module.exports = errorHandler;