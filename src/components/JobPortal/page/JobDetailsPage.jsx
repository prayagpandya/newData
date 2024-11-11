import { useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import {
  LuBookMinus,
  LuDollarSign,
  LuMonitor,
  LuUserCheck,
} from 'react-icons/lu';
import { PiSuitcase, PiTimerLight } from 'react-icons/pi';
import { SlLocationPin } from 'react-icons/sl';
import { useParams } from 'react-router-dom';
import { url } from '../../../url';
import ApplyModal from '../ApplyModal'; // Adjust path as needed
import HeroSection from '../HeroSection';

const iconMap = {
  employeeType: <LuUserCheck className="text-2xl" />,
  location: <SlLocationPin className="text-2xl" />,
  jobType: <LuMonitor className="text-2xl" />,
  experience: <PiSuitcase className="text-2xl" />,
  qualifications: <LuBookMinus className="text-2xl" />,
  salary: <LuDollarSign className="text-2xl" />,
  datePosted: <PiTimerLight className="text-2xl" />,
};

const JobDetailsPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorMode } = useColorMode();
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: [],
    company: '',
    jobinfo: {
      employeeType: '',
      location: '',
      jobType: '',
      experience: '',
      salary: '',
      datePosted: '',
      vacancies: '',
      applied: '',
      logo: '',
    },
    createdBy: '',
    responsibilities: [],
    qualifications: [],
  });
  useEffect(() => {
    fetchJobDetails();
  }, [id]);
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/jobs/${id}`);
      const data = await response.data.data;
      setJobDetails(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const filteredJobInfo = {
    ...jobDetails.jobinfo,
    logo: undefined,
    vacancies: undefined,
    applied: undefined,
  };
  return (
    <div className="mx-auto">
      <HeroSection />

      <div className="flex max-w-7xl mx-auto p-4 flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 md:sticky top-20 h-full">
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Job Information
            </h2>
            <div className="space-y-4">
              {Object.entries(filteredJobInfo).map(([key, value]) => {
                if (
                  key === 'vacancies' ||
                  key === 'applied' ||
                  key === 'logo'
                ) {
                  return null;
                }
                return (
                  <div
                    key={key}
                    className={`flex text-black text-lg items-center gap-4`}
                  >
                    <div className="w-8">{iconMap[key] || null}</div>
                    <div className="flex flex-col">
                      <span className="font-semibold capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span
                        className={`${
                          colorMode === 'dark'
                            ? 'text-yellow-500'
                            : 'text-yellow-600'
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 no-scrollbar overflow-y-auto max-h-min">
          <div className="bg-white p-8 shadow-md rounded-md space-y-8">
            <h2
              className={`${
                colorMode === 'dark' ? 'text-gray-800' : 'text-black'
              } text-2xl font-semibold mb-4`}
            >
              Job Description
            </h2>
            {jobDetails.description.map((paragraph, index) => (
              <p
                key={index}
                className={`${
                  colorMode === 'dark' ? 'text-gray-800' : 'text-black-500'
                } text-lg leading-3`}
              >
                {paragraph}
              </p>
            ))}
            <h3
              className={`${
                colorMode === 'dark' ? 'text-gray-800' : 'text-black-800'
              } text-2xl font-semibold mb-4`}
            >
              Responsibilities and Duties:
            </h3>
            <ul className="pl-6 space-y-3 text-lg">
              {jobDetails.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-2">
                  <HiArrowRight className="text-xl text-yellow-500" />
                  <span
                    className={`${
                      colorMode === 'dark' ? 'text-gray-800' : 'text-black-500'
                    }`}
                  >
                    {responsibility}
                  </span>
                </li>
              ))}
            </ul>

            <h3
              className={`${
                colorMode === 'dark' ? 'text-gray-800' : 'text-black-800'
              } text-2xl font-semibold mb-4`}
            >
              Required Experience, Skills, and Qualifications:
            </h3>
            <ul className="pl-6 space-y-3 text-lg">
              {jobDetails.qualifications.map((qualification, index) => (
                <li key={index} className="flex items-start gap-2">
                  <HiArrowRight className="text-xl text-yellow-500" />
                  <span
                    className={`${
                      colorMode === 'dark' ? 'text-gray-800' : 'text-black-500'
                    }`}
                  >
                    {qualification}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleOpenModal}
              className="mt-6 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-2 rounded-md text-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ApplyModal job={jobDetails} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default JobDetailsPage;
