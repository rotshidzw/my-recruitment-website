import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto px-4">
        <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 ">
          <span className="text-sm text-gray-800 sm:text-center dark:text-gray-800">
            © 2022 <a href="#" className="hover:underline" target="_blank">entrybyte™</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
            <li>
              <a href="#" className="mr-4 text-sm text-gray-800 hover:underline md:mr-6 dark:text-gray-800">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 text-sm text-gray-800 hover:underline md:mr-6 dark:text-gray-800">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 text-sm text-gray-800 hover:underline md:mr-6 dark:text-gray-800">Licensing</a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-800 hover:underline dark:text-gray-800">Contact</a>
            </li>
          </ul>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
