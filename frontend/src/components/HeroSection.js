import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEyeSlash, FaSort } from 'react-icons/fa';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      const jobsData = response.data.data;
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setCountry('');
    setTimezone('');
    setFilter('');
    setSort('');
  };

  const handleHide = () => {
    setIsHidden(!isHidden);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const companyMatch = job.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    const remoteMatch = job.remote === (filter === 'remote');
    return titleMatch || companyMatch || remoteMatch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sort === 'date') {
      return a.created_at - b.created_at;
    } else if (sort === 'tags') {
      const aHasITTag = a.tags.includes('IT');
      const bHasITTag = b.tags.includes('IT');
      const aHasRemoteTag = a.tags.includes('Remote');
      const bHasRemoteTag = b.tags.includes('Remote');

      if (aHasITTag && bHasITTag) {
        if (aHasRemoteTag && bHasRemoteTag) {
          return 0;
        } else if (aHasRemoteTag) {
          return -1;
        } else if (bHasRemoteTag) {
          return 1;
        } else {
          return 0;
        }
      } else if (aHasITTag) {
        return -1;
      } else if (bHasITTag) {
        return 1;
      } else {
        return 0;
      }
    } else if (sort === 'location') {
      return a.location.localeCompare(b.location);
    } else {
      return 0;
    }
  });

  const handleApplyNow = (slug) => {
    window.location.href = `/ApplicationForm?jobId=${slug}`;
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto py-10 px-4">
            <div class="bg-blue-500 py-16 rounded">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-white mb-6">Welcome to the Hero Section</h1>
          <p class="text-lg text-white max-w-xl">
            Hey there! How are you doing? I hope you're having a fantastic day. It's always great to connect with new people and have meaningful conversations. If you have any questions or need assistance, feel free to reach out. Remember to stay positive and keep smiling!
          </p>
        </div>
      </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-12">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400"
            placeholder="Job title or keyword"
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400"
            placeholder="Country or timezone"
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">All</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="remote">Remote</option>
          </select>
          <select
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="salary">Salary</option>
            <option value="location">Location</option>
          </select>
          <div className="flex justify-center md:col-span-2 lg:col-span-4 xl:col-span-5">
            <button
              onClick={handleClear}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-12 rounded ml-2"
            >
              Clear
            </button>
            <button
              onClick={handleHide}
              className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-12 rounded ml-2"
            >
              {isHidden ? <FaEyeSlash className="mr-2" /> : <FaEyeSlash className="mr-2" />}
              {isHidden ? 'Show' : 'Hide'}
            </button>
          </div>
        </div>



      </div>
      <div class="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
        <div class="pt--10 pr-0 pb-10 pl-0">
          {!isHidden && (
            <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0 ">
               <div class="">
          <p class="text-xl font-bold text-gray-900">Open Positions</p>
          <p class="text-sm mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis</p>
        </div>
              {sortedJobs.length > 0 ? (
                sortedJobs.slice(0, 10).map((job) => (
                  <div key={job.slug} class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                    <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5 rounded shadow-sm">
                      <div class="flex items-center flex-1 min-w-0">
                        <img src='https://v1.tailwindcss.com/_next/static/media/tailwind-ui-sidebar.2ccd3a8ec5f31f428204b5c3c4d9a485.png' class="flex-shrink-0 object-cover rounded-full btn- w-10 h-10" />
                        <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                          <p class="text-lg font-bold text-gray-800 truncate">{job.title}</p>
                          <p class="text-gray-600 text-md">{job.company_name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApplyNow(job.slug)}
                        className="bg-gray-800 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all duration-200 hover:bg-gray-700 rounded-lg"
                      >
                        Apply
                      </button>

                    </div>
                  </div>
                ))
              ) : (
                <p>No jobs found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
