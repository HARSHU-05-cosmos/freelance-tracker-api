const Project = require('../models/Project');

exports.getFreelancerStats = async (req, res, next) => {
    try {
        const stats = await Project.aggregate([
            { $match: { freelancer: req.user._id, status: 'completed' } },
            { $group: {
                _id: '$freelancer',
                totalEarnings: { $sum: '$budget' },
                completedProjects: { $sum: 1 },
                averageProjectValue: { $avg: '$budget' }
            }}
        ]);

        res.status(200).json({ success: true, data: stats[0] || {} });
    } catch (error) {
        next(error);
    }
};