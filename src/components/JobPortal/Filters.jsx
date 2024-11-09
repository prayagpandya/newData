import React from 'react';

const Filters = () => {
  return (
    <div className="bg-white sticky top-0 dark:bg-[#1A202C] p-4 shadow-md rounded-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Filters
      </h3>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-gray-700 dark:text-gray-300">
            Job Type
          </span>
        </label>
        <select className="select select-bordered dark:bg-[#2D3748] dark:text-white">
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Contract</option>
          <option>Internship</option>
          <option>Temporary</option>
        </select>
      </div>

      {/* Location Filter */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-gray-700 dark:text-gray-300">
            Location
          </span>
        </label>
        <select className="select select-bordered dark:bg-[#2D3748] dark:text-white">
          <option>New York, US</option>
          <option>San Francisco, US</option>
          <option>Toronto, Canada</option>
          <option>Vancouver, Canada</option>
          <option>Delhi, India</option>
          <option>Bangalore, India</option>
          <option>Mumbai, India</option>
        </select>
      </div>

      {/* Job Role Filter */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-gray-700 dark:text-gray-300">
            Job Roles
          </span>
        </label>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" id="developer" />
          <label
            htmlFor="developer"
            className="text-gray-700 dark:text-gray-300"
          >
            Developer
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" id="designer" />
          <label
            htmlFor="designer"
            className="text-gray-700 dark:text-gray-300"
          >
            Designer
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" id="project-manager" />
          <label
            htmlFor="project-manager"
            className="text-gray-700 dark:text-gray-300"
          >
            Project Manager
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" id="qa-engineer" />
          <label
            htmlFor="qa-engineer"
            className="text-gray-700 dark:text-gray-300"
          >
            QA Engineer
          </label>
        </div>
      </div>

      {/* Salary Range */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-gray-700 dark:text-gray-300">
            Salary Range
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="100000"
          step="5000"
          className="range range-warning range-xs"
        />
        <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
          $0 - $100,000+
        </div>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-[#F6EC88] hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg">
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
