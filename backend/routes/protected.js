const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Job = require('../models/Job');

// Protected route: Save a job
router.post('/save-job', authenticateToken, async (req, res) => {
  try {
    // Extract the user ID from the request object
    const userId = req.userId;

    // Retrieve the job data from the request body
    const { slug, company_name, title, description, remote, url, tags, job_types, location, created_at } = req.body;

    // Create a new job document
    const job = await Job.create({
      slug,
      company_name,
      title,
      description,
      remote,
      url,
      tags,
      job_types,
      location,
      created_at,
      savedBy: userId, // Associate the job with the authenticated user
    });

    res.status(201).json({ message: 'Job saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// Protected route: Fetch saved jobs
router.get('/saved-jobs', authenticateToken, async (req, res) => {
  try {
    // Extract the user ID from the request object
    const userId = req.userId;

    // Find the saved jobs associated with the user
    const savedJobs = await Job.find({ savedBy: userId });

    res.json(savedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

module.exports = router;
