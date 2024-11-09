import React from "react";

const AnimatedInputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  readOnly = false,
  isTextArea = false,
}) => {
  return (
    <div className="relative mb-6 flex items-center gap-2">
      {/* <span className="font-medium">{label}</span> */}
      {isTextArea ? (
        <textarea
          name={name}
          className="w-full px-4 py-2 border rounded focus:outline-none peer focus:border focus:border-[#fff587]"
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          className="w-full px-4 py-2 border rounded focus:outline-none peer focus:border focus:border-[#fff587]"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={!readOnly}
        />
      )}
      <label
        className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 transform peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:left-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500 peer-focus:bg-[#fff8aa] peer-focus:text-[1em] peer-focus:px-2 peer-focus:py-1 focus:border focus:border-yellow-500 peer-focus:rounded-full`}
      >
        {label}
      </label>
    </div>
  );
};

export default AnimatedInputField;
