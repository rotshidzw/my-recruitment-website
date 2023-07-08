import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import JobList from '../components/JobList';

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Fetch user's saved jobs from backend API
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get('/api/saved-jobs');
        setSavedJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Saved Jobs</h1>
        {/* Render saved job list */}
        <JobList jobs={savedJobs} />
      </div>
    </Layout>
  );
};

export default SavedJobsPage;
