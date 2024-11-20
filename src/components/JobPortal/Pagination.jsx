import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <nav>
        <ul className="flex space-x-2">
          <li>
            <button
              onClick={handlePrev}
              className="px-3 py-1 rounded-full bg-[#FCB902] text-black hover:bg-[#F6EC88] transition-all"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => onPageChange(index + 1)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? 'bg-[#F6EC88] text-black'
                    : 'bg-[#FCB902] text-black hover:bg-[#F6EC88]'
                } transition-all`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNext}
              className="px-3 py-1 rounded-full bg-[#FCB902] text-black hover:bg-[#F6EC88] transition-all"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
