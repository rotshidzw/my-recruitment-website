import { useEffect, useState } from 'react';
import axios from 'axios';
import Performance from '../components/perfomance';
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
      .post('http://localhost:5000/api/save-jobs/save', {
        job: {
          slug: selectedJob.slug,
          company_name: selectedJob.company_name,
          title: selectedJob.title,
          description: selectedJob.description,
          remote: selectedJob.remote,
          url: selectedJob.url,
          tags: selectedJob.tags,
          job_types: selectedJob.job_types,
          location: selectedJob.location,
          created_at: selectedJob.created_at,
        },
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
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="col-span-1">
          {selectedJob && (
            <div className={`bg-white rounded-lg shadow-md p-4 ${showPopup ? 'block' : 'hidden'}`}>
              <h3 className="text-xl font-semibold">{selectedJob.title}</h3>
              <p className="text-gray-600 mb-2">{selectedJob.company_name}</p>
              <p className="text-gray-500 text-sm mb-4">{selectedJob.slug}</p>
              <p className="text-gray-500 text-sm">{selectedJob.location}</p>
              <div
                className="mb-4 mt-0 text-base font-light leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(selectedJob.description, 50),
                }}
              />

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white rounded-md py-2 px-4"
                  onClick={handleApply}
                >
                  Apply
                </button>
                {hasCookies && (
                  <button
                    className="bg-green-500 text-white rounded-md py-2 px-4"
                    onClick={handleSave}
                  >
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
