const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log(`Connected to MongoDB: ${process.env.MONGODB_URI}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// API routes
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
const formRoutes = require('./routes/form');

app.use('/api/jobs', jobsRouter);
app.use('/api/auth', authRouter);
app.use('/api', formRoutes);
// Serve static files (e.g., the frontend build files)
app.use(express.static(path.join(__dirname, 'public')));

// JobForm API route
// Job model
const jobSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  description: String,
});

const Job = mongoose.model('Job', jobSchema);

// Middleware
app.use(bodyParser.json());

// Save job endpoint
app.post('/api/saveJob', (req, res) => {
  const { title, companyName, description } = req.body;

  // Create a new job document
  const job = new Job({
    title,
    companyName,
    description,
  });

  job.save((error) => {
    if (error) {
      res.status(500).json({ error: 'Failed to save job' });
    } else {
      res.status(200).json({ message: 'Job saved successfully' });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
