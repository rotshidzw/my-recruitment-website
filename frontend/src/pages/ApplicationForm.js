import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import Layout from '../components/Layouts';

const ApplicationForm = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cv, setCV] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      // Retrieve user data from the API using the token
      fetch('http://localhost:5000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Set the user data in the form fields
          setFullName(data.fullName);
          setEmail(data.email);
        })
        .catch((error) => {
          console.error(error);
          alert('An error occurred while retrieving user data.');
        });
    }
  }, []);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCVChange = (e) => {
    const file = e.target.files[0];
    setCV(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!fullName || !email || !cv) {
      alert('Please fill in all fields and select a CV.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('cv', cv);

    // Send form data to backend
    fetch('http://localhost:5000/api/applications', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from backend
        console.log(data);
        alert('Application submitted successfully!');
        router.push('/'); // Redirect to home page
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        alert('An error occurred while submitting the application.');
      });

    // Clear form fields
    setFullName('');
    setEmail('');
    setCV(null);
  };

  return (
    <Layout>
      <div className="flex justify-center bg-gray-100 items-center top-8">
        <div className="bg-gray-200 shadow-md rounded sm:px-20 pt-6 pb-8 mb-4">
          <section className="h-screen">
            <div className="h-full">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-center bg-cover md:bg-cover md:bg-center h-full" style={{ backgroundImage: "url('https://images.pexels.com/photos/3205567/pexels-photo-3205567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}></div>
                <div className="flex items-center justify-center p-6">
                  <div className="w-full max-w-sm">
                    <img src="https://entrebyte.co.za/wp-content/uploads/2022/12/white-logo-vector.png" alt="Logo" className="mb-8 mx-auto w-48" />
                    <form className="bg-white shadow-md rounded-xl py-12 px-8 pt-6 pb-8 mb-4">
                      <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
                        <input
                          type="text"
                          id="fullName"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={handleFullNameChange}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input
                          type="email"
                          id="email"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Enter your email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="cv" className="block text-gray-700 text-sm font-bold mb-2">CV:</label>
                        <input
                          type="file"
                          id="cv"
                          accept=".pdf"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={handleCVChange}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>Submit Application</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;
