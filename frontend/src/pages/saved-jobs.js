import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobPage = () => {
  const [job, setJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming you have a way to get the user ID

  useEffect(() => {
    fetchSavedJobs();
  }, [userId]); // Fetch saved jobs whenever the user ID changes

  // Assuming you have a way to get the user ID


// Update the handleSaveJob function
const handleSaveJob = async () => {
  if (job && userId) { // Check if userId is non-empty
    try {
      await axios.post('http://localhost:5000/api/jobs/save', {
        userId,
        job,
      });
      fetchSavedJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  } else {
    console.error('User ID is missing or empty.'); // Handle the case when userId is missing or empty
  }
};

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/saved/${userId}`);
      const savedJobsData = response.data;
      setSavedJobs(savedJobsData);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const handleFetchJob = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      const jobData = response.data.data;
      console.log(typeof jobsData)
      // Assuming you want to fetch the first job from the API response
      const firstJob = jobData[0];

      setJob(firstJob);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  return (
    <div>
      <h2>Job Details</h2>
      {job ? (
        <div className="job">
          <h3>{job.title}</h3>
          <p>{job.company_name}</p>
          <p>{job.location}</p>
          {/* Render other job details */}
          <button onClick={handleSaveJob}>Save Job</button>
        </div>
      ) : (
        <p>No job available.</p>
      )}

      <h2>Saved Jobs</h2>
      {savedJobs.map((savedJob) => (
        <div key={savedJob.slug} className="saved-job">
          <h3>{savedJob.title}</h3>
          <p>{savedJob.company_name}</p>
          <p>{savedJob.location}</p>
          {/* Render other saved job details */}
        </div>
      ))}

      <button onClick={handleFetchJob}>Fetch Job</button>
    </div>
  );
};

export default JobPage;
