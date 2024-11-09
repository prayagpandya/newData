import React from 'react';
import { FaRegPaperPlane } from 'react-icons/fa'; // Apply Now icon
import { AiOutlineInfoCircle } from 'react-icons/ai'; // More Details icon
import { FaBriefcase, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'; // New icons
import { useNavigate } from 'react-router-dom'; // For programmatic navigation

const JobCard = ({ job, onApply, onViewDetails }) => {
  const navigate = useNavigate();
  const appliedPercentage = (job.applied / job.vacancies) * 100;
  const isUrgent = appliedPercentage >= 80; // Define a threshold for urgency (e.g., 80% filled)

  // Function to handle card click navigation
  const handleCardClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Card content */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {job.company}
            </h3>
            <p className="text-sm text-gray-500">{job.postTime}</p>
          </div>
        </div>
        <span className="px-3 py-1 text-sm font-medium text-black bg-[#F6EC88] rounded-full">
          {job.jobType}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 py-1 px-4">
        <h4 className="font-semibold text-lg text-gray-800 flex items-center">
          <FaBriefcase className="mr-2" /> {job.title}
        </h4>
        <p className="text-right text-sm text-gray-500 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> {job.location}
        </p>
      </div>

      <div className="px-4 text-sm text-gray-500 flex items-center">
        <FaRegClock className="mr-2" />
        {job.exp}
      </div>

      {/* Vacancies and Applied Section with Motivational Text */}
      <div className="mb-2 py-1 px-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Vacancies: {job.vacancies}</span>
          <span>Applied: {job.applied}</span>
        </div>

        {/* Progress Bar with motivational message */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`bg-green-500 h-2.5 rounded-full`}
            style={{
              width: `${appliedPercentage}%`,
            }}
          ></div>
        </div>

        {/* Motivational text */}
        <div className="mt-2 text-sm text-gray-600">
          {isUrgent ? (
            <span className="text-red-500 font-semibold">
              Hurry, spots filling fast!
            </span>
          ) : (
            <span className="text-blue-500 font-semibold">
              Plenty of opportunities available!
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between pb-4 px-4">
        <button
          onClick={e => {
            e.stopPropagation(); // Prevent the card click from triggering
            onApply(job); // Trigger the onApply callback
          }}
          className="px-5 py-2.5 font-medium bg-[#F6EC88] text-black hover:bg-yellow-500 rounded-lg text-sm flex items-center"
        >
          <FaRegPaperPlane className="mr-2" />
          Apply Now
        </button>
        <button
          onClick={e => {
            e.stopPropagation(); // Prevent the card click from triggering
            onViewDetails(job); // Trigger the onViewDetails callback
          }}
          className="px-5 py-2.5 font-medium bg-[#F6EC88] text-black hover:bg-yellow-500 rounded-lg text-sm flex items-center"
        >
          <AiOutlineInfoCircle className="mr-2" />
          More Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
