import React, { useEffect, useState } from 'react';

const JobFilter = () => {
  const [locations, setLocations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulated API calls to retrieve data from the backend
    fetchLocations()
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));

    fetchJobTypes()
      .then((data) => setJobTypes(data))
      .catch((error) => console.error('Error fetching job types:', error));

    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const fetchLocations = () => {
    // Simulated API call to fetch locations from the backend
    return new Promise((resolve, reject) => {
      // Replace this with your actual API call
      setTimeout(() => {
        const locations = ['Location A', 'Location B', 'Location C'];
        resolve(locations);
      }, 1000);
    });
  };

  const fetchJobTypes = () => {
    // Simulated API call to fetch job types from the backend
    return new Promise((resolve, reject) => {
      // Replace this with your actual API call
      setTimeout(() => {
        const jobTypes = ['Job Type A', 'Job Type B', 'Job Type C'];
        resolve(jobTypes);
      }, 1000);
    });
  };

  const fetchCategories = () => {
    // Simulated API call to fetch categories from the backend
    return new Promise((resolve, reject) => {
      // Replace this with your actual API call
      setTimeout(() => {
        const categories = ['Category A', 'Category B', 'Category C'];
        resolve(categories);
      }, 1000);
    });
  };

  return (
    <div className="flex justify-between items-center bg-gray-200 px-4 py-2 mb-4 rounded">
      <div className="flex items-center space-x-4">
        <label htmlFor="filterLocation" className="font-medium">
          Location:
        </label>
        <select
          name="filterLocation"
          id="filterLocation"
          className="border border-gray-300 px-2 py-1 rounded"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="filterType" className="font-medium">
          Job Type:
        </label>
        <select
          name="filterType"
          id="filterType"
          className="border border-gray-300 px-2 py-1 rounded"
        >
          {jobTypes.map((jobType) => (
            <option key={jobType} value={jobType}>
              {jobType}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="filterCategory" className="font-medium">
          Category:
        </label>
        <select
          name="filterCategory"
          id="filterCategory"
          className="border border-gray-300 px-2 py-1 rounded"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilter;
