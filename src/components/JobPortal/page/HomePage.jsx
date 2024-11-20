import React, { useEffect, useState } from 'react';
import HeroSection from '../HeroSection';
import Filters from '../Filters';
import JobCard from '../JobCard';
import Pagination from '../Pagination';
import ApplyModal from '../ApplyModal'; // Import ApplyModal component
import axios from 'axios';
import { url } from '../../../url';

const HomePage = () => {
  const [jobs, setJobs] = useState([]); // Store all jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(4); // Number of jobs per page
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalJob, setModalJob] = useState(null);
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    roles: [],
    salaryRange: [0, 100000],
  });

  const [uniqueJobTypes, setUniqueJobTypes] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [uniqueRoles, setUniqueRoles] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 100000]); // To store min and max salary

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/jobs/`);
      console.log('API Response:', response.data.data);
      if (Array.isArray(response.data.data)) {
        setJobs(response.data.data);
        setFilteredJobs(response.data.data); // Initialize filtered jobs

        // Extract unique values for filters
        extractUniqueValues(response.data.data);
        calculateSalaryRange(response.data.data); // Calculate salary range
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const extractUniqueValues = jobData => {
    const jobTypes = new Set();
    const locations = new Set();
    const roles = new Set();

    jobData.forEach(job => {
      if (job.jobinfo.employeeType) jobTypes.add(job.jobinfo.employeeType);
      if (job.jobinfo.location) locations.add(job.jobinfo.location);
      if (job.jobinfo.jobType) roles.add(job.jobinfo.jobType); // Assuming jobType corresponds to roles
    });

    setUniqueJobTypes([...jobTypes]);
    setUniqueLocations([...locations]);
    setUniqueRoles([...roles]);
  };

  const calculateSalaryRange = jobData => {
    const salaries = jobData.map(job => parseInt(job.jobinfo.salary, 10));
    const minSalary = Math.min(...salaries);
    const maxSalary = Math.max(...salaries);

    setSalaryRange([minSalary, maxSalary]);
    setFilters(prevFilters => ({
      ...prevFilters,
      salaryRange: [minSalary, maxSalary], // Set initial salary range
    }));
  };

  const applyFilters = () => {
    let updatedJobs = [...jobs];

    // Filter by job type
    if (filters.jobType) {
      updatedJobs = updatedJobs.filter(
        job => job.jobinfo.employeeType === filters.jobType
      );
    }

    // Filter by location
    if (filters.location) {
      updatedJobs = updatedJobs.filter(
        job => job.jobinfo.location === filters.location
      );
    }

    // Filter by roles
    if (filters.roles.length > 0) {
      updatedJobs = updatedJobs.filter(job =>
        filters.roles.includes(job.jobinfo.jobType)
      );
    }

    // Filter by salary range
    updatedJobs = updatedJobs.filter(
      job =>
        job.jobinfo.salary >= filters.salaryRange[0] &&
        job.jobinfo.salary <= filters.salaryRange[1]
    );

    setFilteredJobs(updatedJobs); // Update filtered jobs
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleApplyClick = job => {
    setModalJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalJob(null);
  };

  return (
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-8 mx-4">
          {/* Filters Section */}
          <div className="w-full md:sticky md:top-20 bg-white p-6 rounded-lg shadow-lg z-0 max-h-fit ">
            <Filters
              filters={filters}
              setFilters={setFilters}
              uniqueJobTypes={uniqueJobTypes}
              uniqueLocations={uniqueLocations}
              uniqueRoles={uniqueRoles}
              salaryRange={salaryRange} // Pass salary range to Filters
            />
          </div>

          {/* Cards Section */}
          <div className="w-full lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredJobs
                .slice(
                  (currentPage - 1) * jobsPerPage,
                  currentPage * jobsPerPage
                )
                .map((job, index) => (
                  <JobCard key={index} job={job} onApply={handleApplyClick} />
                ))}
            </div>

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredJobs.length / jobsPerPage)}
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
