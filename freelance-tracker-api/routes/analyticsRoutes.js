
const express = require('express');
const { getFreelancerStats } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/freelancer-stats', protect, authorize('freelancer'), getFreelancerStats);

module.exports = router;