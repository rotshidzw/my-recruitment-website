// controllers/saveJobs.js
const Job = require('../models/Job');

// POST /api/save-jobs/save
exports.saveJob = async (req, res) => {
    try {
      const { job } = req.body;
      const savedJob = await Job.create({ ...job, saved: true }); // Set the "saved" field to true
      res.status(201).json(savedJob);
    } catch (error) {
      console.error('Error saving job:', error);
      res.status(500).json({ error: 'An error occurred while saving the job.' });
    }
  };

// GET /api/save-jobs/saved
exports.getSavedJobs = async (req, res) => {
    try {
      const savedJobs = await Job.find({ saved: true });
      console.log('Saved jobs:', savedJobs); // Log the saved jobs
      res.json(savedJobs);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      res.status(500).json({ error: 'An error occurred while fetching saved jobs.' });
    }
  };

// DELETE /api/save-jobs/delete/:id
exports.deleteSavedJob = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedJob = await Job.findByIdAndDelete(id);
      if (!deletedJob) {
        return res.status(404).json({ error: 'Job not found.' });
      }
      res.json(deletedJob);
    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({ error: 'An error occurred while deleting the job.' });
    }
  };
