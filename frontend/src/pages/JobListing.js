// JobListing.js

import { useState } from 'react';
import axios from 'axios';

const JobListing = ({ job, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const saveJob = async () => {
    try {
      // Send a request to the backend API to save the job
      await axios.post('http://localhost:5000/api/jobs/save', { job });
      setIsSaved(true);
      onSave(job);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      {isSaved ? (
        <button disabled>Saved</button>
      ) : (
        <button onClick={saveJob}>Save</button>
      )}
    </div>
  );
};

export default JobListing;
