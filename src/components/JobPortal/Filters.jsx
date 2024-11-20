import React from 'react';

const Filters = ({
  filters,
  setFilters,
  uniqueJobTypes,
  uniqueLocations,
  uniqueRoles,
  salaryRange, // Receive salary range as prop
}) => {
  const handleJobTypeChange = e => {
    setFilters({ ...filters, jobType: e.target.value });
  };

  const handleLocationChange = e => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleRoleChange = e => {
    const { value, checked } = e.target;
    const updatedRoles = checked
      ? [...filters.roles, value]
      : filters.roles.filter(role => role !== value);
    setFilters({ ...filters, roles: updatedRoles });
  };

  const handleSalaryChange = e => {
    const value = e.target.value;
    setFilters({ ...filters, salaryRange: [salaryRange[0], value] }); // Update only the max value
  };

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
        <select
          className="select select-bordered dark:bg-[#2D3748] dark:text-white"
          onChange={handleJobTypeChange}
        >
          <option value="">All</option>
          {uniqueJobTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-gray-700 dark:text-gray-300">
            Location
          </span>
        </label>
        <select
          className="select select-bordered dark:bg-[#2D3748] dark:text-white"
          onChange={handleLocationChange}
        >
          <option value="">All</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Job Role Filter */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-gray-700 dark:text-gray-300">
            Job Roles
          </span>
        </label>
        {uniqueRoles.map(role => (
          <div className="flex items-center" key={role}>
            <input
              type="checkbox"
              className="mr-2"
              id={role}
              value={role}
              onChange={handleRoleChange}
            />
            <label htmlFor={role} className="text-gray-700 dark:text-gray-300">
              {role}
            </label>
          </div>
        ))}
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
          min={salaryRange[0]} // Set min value from salaryRange
          max={salaryRange[1]} // Set max value from salaryRange
          step="5000"
          className="range range-warning range-xs"
          onChange={handleSalaryChange}
        />
        <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
          ₹{filters.salaryRange[0]} - ₹{filters.salaryRange[1]}+
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
