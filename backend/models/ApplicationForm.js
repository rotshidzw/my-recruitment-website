const mongoose = require('mongoose');

const applicationFormSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cvPath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);

module.exports = ApplicationForm;
