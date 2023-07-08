const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const JobForm = require('../models/ApplicationForm');


// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/applications', upload.single('cv'), async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const cvFile = req.file;

    // Save the form data to the database
    const jobForm = new JobForm({
      fullName,
      email,
      cvPath: cvFile.path,
    });
    await jobForm.save();

    // Return a success response
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

module.exports = router;
