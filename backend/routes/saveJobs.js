const express = require('express');
const router = express.Router();
const { saveJob, getSavedJobs } = require('../controllers/saveJobs');

// POST /api/save-jobs/save
router.post('/save', saveJob);

// GET /api/save-jobs/saved
router.get('/saved', getSavedJobs);

module.exports = router;
