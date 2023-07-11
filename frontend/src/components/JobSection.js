import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const JobSection = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const hasCookies = Cookies.get('token'); // Check if the token cookie exists

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs && jobs.data) {
      const shuffledJobs = shuffleArray(jobs.data).slice(0, 4);
      setDisplayedJobs(shuffledJobs);
    }
  }, [jobs]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleApply = (job) => {
    if (selectedJob === job) {
      setSelectedJob(null);
      setShowDescription(false);
    } else {
      setSelectedJob(job);
      setShowDescription(true);
    }
  };

  const handleApplyNow = () => {
    if (selectedJob) {
      // Redirect to application form page with job ID
      window.location.href = `/ApplicationForm?jobId=${selectedJob.slug}`;
    }
  };

  const handleSaveJob = async (job) => {
    if (!hasCookies) {
      return; // Return early if cookies are not present
    }

    try {
      const response = await axios.post('http://localhost:5000/api/save-jobs/save', {
        job: {
          slug: job.slug,
          company_name: job.company_name,
          title: job.title,
          description: job.description,
          remote: job.remote,
          url: job.url,
          tags: job.tags,
          job_types: job.job_types,
          location: job.location,
          created_at: job.created_at
        }
      });

      const savedJob = response.data;
      console.log('Job saved:', savedJob);
      // Refresh the saved jobs list if needed
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };


  const removeHtmlTags = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  };


  return (
    <section className="bg-white ">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="w-1/1 ">
          <h2 className="text-2xl font-bold mb-4">Most Recent</h2>
          <ul className="space-y-6">
          {displayedJobs && displayedJobs.length > 0 ? (
              displayedJobs.map((job) => (
                <li key={job.slug} className="bg-white shadow-md p-4 rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-blue-600 semibold rounded-full italic">{job.company_name}</p>
                      <div className="flex sm:flex-row items-center flex-col space-x-4">
                        <p className="rounded-full  bg-purple-200 md:py-0.5 mt-2 px-2 text-purple-400">{job.created_at}</p>
                        <p className="rounded-full bg-purple-200 md:py-0.5 mt-2 px-2 text-purple-400">{job.location}</p>
                        <p className="rounded-full bg-purple-200 md:py-0.5 mt-2 px-2 text-purple-400">{job.remote}</p>
                        <p className="rounded-full bg-purple-200 md:py-0.5 mt-2 px-2 text-purple-400">{job.tags}</p>
                    </div>
                    </div>
                    <div>
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleApply(job)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                      {hasCookies && (
                        <button  className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleSaveJob(selectedJob)}>
                          Save

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6h9m0 0v9m0-9l-9 9-9-9"
                            />
                        </svg>

                        </button>
                           )}

                    </div>
                  </div>

                  {showDescription && selectedJob === job && (
                    <div>
                      <p>{removeHtmlTags(job.description)}</p>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleApplyNow}
                      >
                        Apply Now
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>

                <div className="w-full md:w-1/2 md:px-1 lg:px-20 ">
                     <img src="https://cdn.tuk.dev/assets/components/26May-update/newsletter-1.png" alt="Envelope with a newsletter" role="img" className="h-fit xl:w-fit lg:w-1/2 w-fit " /><h1 className="text-2xl md:text-4xl xl:text-5xl font-bold leading-10 text-gray-800 mb-4 text-center xl:text-left md:mt-0 mt-4">Subscribe</h1>
                    <p className="text-base leading-normal text-gray-600 text-center xl:text-left">Hi everyone 🙌</p>
                    <div className="flex items-stretch mt-12">
                        <input className="bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500" type="email" placeholder="Your Email" />
                        <button className="w-32 rounded-l-none hover:bg-indigo-600 bg-indigo-700 rounded text-base font-medium leading-none text-white p-5 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">subscribe</button>
                    </div>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
