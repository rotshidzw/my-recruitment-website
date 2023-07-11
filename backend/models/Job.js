const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    remote: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    job_types: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'savedjobs', // Specify the custom collection name here
  }
);

module.exports = mongoose.model('Job', jobSchema);
