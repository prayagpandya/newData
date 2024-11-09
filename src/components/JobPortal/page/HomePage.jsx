import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../HeroSection';
import Filters from '../Filters';
import JobCard from '../JobCard';
import Pagination from '../Pagination';
import ApplyModal from '../ApplyModal'; // Import ApplyModal component

const HomePage = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Company A',
      companyLogo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGYL8YaQH6iYjap_O4LBkjdxTb-AWfeaqZsw&s',
      exp: '0-2 years',
      jobType: 'Full-Time',
      location: 'San Francisco, CA',
      postTime: '2 days ago',
      vacancies: 10,
      applied: 4,
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Company B',
      companyLogo: 'https://path-to-logo.com/logo2.png',
      exp: '0-2 years',
      jobType: 'Part-Time',
      location: 'New York, NY',
      postTime: '1 week ago',
      vacancies: 5,
      applied: 2,
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Company C',
      companyLogo: 'https://path-to-logo.com/logo3.png',
      exp: '0-2 years',
      jobType: 'Contract',
      location: 'Los Angeles, CA',
      postTime: '3 days ago',
      vacancies: 7,
      applied: 3,
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: 'Company D',
      companyLogo: 'https://path-to-logo.com/logo4.png',
      exp: '0-2 years',
      jobType: 'Full-Time',
      location: 'Austin, TX',
      postTime: '5 days ago',
      vacancies: 8,
      applied: 6,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalJob, setModalJob] = useState(null);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleApplyClick = job => {
    setModalJob(job);
    setModalOpen(true); // This should set the modal state to open
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalJob(null);
  };

  return (
    <div>
      <HeroSection />
      <div className=" max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-8 mx-4">
          {/* Filters Section */}
          <div className="w-full md:sticky md:top-20 bg-white p-6 rounded-lg shadow-lg z-0 max-h-fit ">
            <Filters />
          </div>

          {/* Cards Section */}
          <div className="w-full lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} onApply={handleApplyClick} />
              ))}
            </div>

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={5} // Mocked total pages
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Modal for applying, conditionally rendered outside JobCard */}
      {isModalOpen && modalJob && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <ApplyModal job={modalJob} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
