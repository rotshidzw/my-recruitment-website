import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {jobs && jobs.data ? (
        jobs.data.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobList;
