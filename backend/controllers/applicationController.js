const ApplicationForm = require('../models/ApplicationForm');

exports.submitApplication = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const cvPath = req.file.path;

    // Create a new application instance with the form data
    const application = new ApplicationForm({
      fullName,
      email,
      cvPath,
    });

    // Save the application to the database
    await application.save();

    // Return a success response
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};
