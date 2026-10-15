const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const AppError = require('../utils/AppError.js');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return next(new AppError('Not authorized, no token provided', 401));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        next(new AppError('Not authorized, token failed', 401));
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    };
};