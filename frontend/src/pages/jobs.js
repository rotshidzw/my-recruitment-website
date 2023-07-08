import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layouts';
import JobList from '../components/JobList';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from backend API or JSON file
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Jobs</h1>
        {/* Render job list */}
        <JobList jobs={jobs} />
      </div>
    </Layout>
  );
};

export default JobsPage;
