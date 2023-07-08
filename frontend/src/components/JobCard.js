import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSection = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        console.log(response.data); // Verify the structure and contents of response.data
        setJobs(response.data.slice(0, 8)); // Limit to 8 jobs
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto flex">
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-4">Most Recent</h2>
          <ul className="space-y-6">
            {jobs && jobs.length > 0 ? (
              jobs.map((job) => (
                <li key={job.id} className="bg-white shadow-md p-4 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <div>
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                      <button className="text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6h9m0 0v9m0-9l-9 9-9-9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p>{job.posted}</p>
                    <p>@ {job.location}</p>
                    <p>{job.companySize}</p>
                    <p>${job.salary}</p>
                  </div>
                  <p>{job.description}</p>
                </li>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
        <div className="w-2/3 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe</h2>
          <img src="path/to/your/image.png" alt="Subscription Image" className="w-32 mb-4" />
          <input type="email" placeholder="Enter your email" className="border border-gray-300 rounded-md px-4 py-2 mb-4" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
