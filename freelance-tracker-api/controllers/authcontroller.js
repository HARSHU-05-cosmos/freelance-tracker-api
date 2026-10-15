const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role, skills, hourlyRate } = req.body;
        const user = await User.create({ name, email, password, role, skills, hourlyRate });
        
        res.status(201).json({ success: true, token: generateToken(user._id) });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new AppError('Please provide email and password', 400));

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return next(new AppError('Invalid credentials', 401));
        }

        res.status(200).json({ success: true, token: generateToken(user._id) });
    } catch (error) {
        next(error);
    }
};
