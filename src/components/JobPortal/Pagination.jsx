import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-center my-8">
      <nav>
        <ul className="flex space-x-2">
          <li>
            <button className="px-3 py-1 rounded-full bg-[#FCB902] text-black hover:bg-[#F6EC88] transition-all">
              &lt;
            </button>
          </li>
          <li>
            <button className="px-3 py-1 rounded-full bg-[#FCB902] text-black hover:bg-[#F6EC88] transition-all">
              1
            </button>
          </li>
          <li>
            <button className="px-3 py-1 rounded-full bg-[#FCB902] text-black hover:bg-[#F6EC88] transition-all">
              2
            </button>
          </li>
          <li>
            <button className="px-3 py-1 rounded-full bg-[#FCB902] text-black hover:bg-[#F6EC88] transition-all">
              3
            </button>
          </li>
          <li>
            <button className="px-3 py-1 rounded-full bg-[#FCB902] text-black hover:bg-[#F6EC88] transition-all">
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
