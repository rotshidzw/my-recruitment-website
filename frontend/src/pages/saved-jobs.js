import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layouts';
import JobCard from '../components/JobCard';

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Fetch user's saved jobs from backend API
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/saved');
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
        <JobCard jobs={savedJobs} />
      </div>
    </Layout>
  );
};

export default SavedJobsPage;
