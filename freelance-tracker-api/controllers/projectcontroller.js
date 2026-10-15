const Project = require('../models/Project');
const AppError = require('../utils/AppError');

exports.createProject = async (req, res, next) => {
    try {
        req.body.client = req.user.id; // Assign logged-in client
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

exports.getAllProjects = async (req, res, next) => {
    try {
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        
        const projects = await Project.find(JSON.parse(queryStr)).populate('client', 'name email');
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};