import React, { useState } from 'react';
import axios from 'axios';
import Filter from './JobFilter';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs?search=${searchQuery}&country=${country}&timezone=${timezone}`);
      console.log(response.data); // Verify the structure and contents of response.data
      setJobs(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setCountry('');
    setTimezone('');
  };

  return (
    <section className="bg-white ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
            recruitment website
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.
          </p>
          <div className="flex flex-col space-y-4 mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Job title or keyword"
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Country or timezone"
            />
            <div className="flex flex-col lg:flex-row lg:space-x-4 lg:items-center">
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Search
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Clear
              </button>
            </div>
          </div>
          {error && <p>Error: {error}</p>}
          <ul className="job-list">
            {jobs && jobs.data ? (
              jobs.data.slice(0, 10).map((job) => (
                <li key={job.slug} className="bg-white shadow-md p-4 rounded-md mb-4">
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600">{job.company_name}</p>
                  {/* Render other job details */}
                </li>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
        <div className="hidden lg:block lg:col-span-5">
          <Filter />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
