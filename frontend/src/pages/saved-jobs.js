import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layouts';
import { getToken } from '../utils/auth';
import withAuth from '../utils/withAuth';
const JobPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const token = getToken();

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/save-jobs/saved', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const savedJobsData = response.data;
      setSavedJobs(savedJobsData);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };
  return (

    <Layout>
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">

      {savedJobs.length > 0 ? (
          <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead>
            <tr>
              <th className="flex gap-3 px-6 py-4 font-bold text-gray-900">
                Company Name
              </th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedJobs.map((savedJob) => (
              <tr key={savedJob._id} className="hover:bg-gray-50">
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{savedJob.company_name}</div>
                    <div className="text-gray-400">{savedJob.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">{savedJob.location}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {savedJob.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
            <a x-data="{ tooltip: 'Delete' }" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </a>
            <a x-data="{ tooltip: 'Edite' }" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </a>
          </div>
        </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved jobs.</p>
      )}
    </div>
    </Layout>
  );
};

export default withAuth(JobPage);
