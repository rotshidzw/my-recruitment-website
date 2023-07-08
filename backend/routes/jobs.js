const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const jobsFilePath = path.join(__dirname, '../data/jobs.json');

// GET /api/jobs
router.get('/', (req, res) => {
  try {
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    res.json(jobsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// POST /api/jobs
router.post('/', (req, res) => {
  try {
    const newJob = req.body;
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    const updatedJobsData = [...jobsData, newJob];
    fs.writeFileSync(jobsFilePath, JSON.stringify(updatedJobsData));
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// GET /api/jobs/:id
router.get('/:id', (req, res) => {
  try {
    const jobId = req.params.id;
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    const job = jobsData.find((job) => job.id === jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found.' });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// DELETE /api/jobs/:id
router.delete('/:id', (req, res) => {
  try {
    const jobId = req.params.id;
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    const updatedJobsData = jobsData.filter((job) => job.id !== jobId);
    fs.writeFileSync(jobsFilePath, JSON.stringify(updatedJobsData));
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

module.exports = router;
