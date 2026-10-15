const express = require('express');
const { createProject, getAllProjects } = require('../controllers/projectcontroller');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/')
    .get(getAllProjects)
    .post(protect, authorize('client'), createProject); // Only clients can post projects

module.exports = router;
