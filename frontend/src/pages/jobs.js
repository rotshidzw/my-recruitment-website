import { useEffect, useState } from 'react';
import axios from 'axios';
import  Performance  from '../components/perfomance';
import Layout from '@/components/Layouts';
import Cookies from 'js-cookie';


const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const hasCookies = Cookies.get('token');
  useEffect(() => {
    // Fetch all jobs from the backend API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          setJobs(response.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const handleApply = () => {
    // Logic to handle apply button click
    if (selectedJob) {
      // Redirect to application form page with job ID
      window.location.href = `/ApplicationForm?jobId=${selectedJob.slug}`;
    }

  };

  const handleSave = () => {
    // Make a POST request to save the job
    axios
      .post('http://localhost:5000/api/saveJob', {
        title: selectedJob.title,
        companyName: selectedJob.company_name,
        description: selectedJob.description,
      })
      .then((response) => {
        alert('Job saved successfully!');
      })
      .catch((error) => {
        alert('Failed to save job');
      });
  };
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };
  return (
    <Layout >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="col-span-1">
        {selectedJob && (
          <div className={`bg-white rounded-lg shadow-md p-4 ${showPopup ? 'block' : 'hidden'}`}>
            <h3 className="text-xl font-semibold">{selectedJob.title}</h3>
            <p className="text-gray-600 mb-2">{selectedJob.company_name}</p>
            <p className="text-gray-500 text-sm mb-4">{selectedJob.slug}</p>
            <p className="text-gray-500 text-sm">{selectedJob.location}</p>
            <div className='mb-4 mt-0 text-base font-light leading-relaxed' dangerouslySetInnerHTML={{ __html: truncateDescription(selectedJob.description, 50)}} />

            <ul class="flex justify-center">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-5 w-5 text-warning">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mr-1 h-5 w-5 text-warning">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mr-1 h-5 w-5 text-warning">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mr-1 h-5 w-5 text-warning">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="mr-1 h-5 w-5 text-warning">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  </li>
</ul>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white rounded-md py-2 px-4" onClick={handleApply}>
                Apply
              </button>
             {hasCookies && (
             <button className="bg-green-500 text-white rounded-md py-2 px-4" onClick={handleSave}>
                Save
              </button>
                )}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <div className="grid grid-cols-1 gap-4">
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.slug}
                className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${
                  selectedJob === job ? 'border border-blue-500' : ''
                }`}
                onClick={() => handleCardClick(job)}
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company_name}</p>
                <p className="text-gray-500 text-sm mb-4">{job.slug}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <Performance />
      </div>
    </div>
    </Layout>
  );
};

export default JobsPage;
