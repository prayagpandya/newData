import React from 'react';

const SimpleInputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  readOnly = false,
  isTextArea = false,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-yellow-500"
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-yellow-500"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={!readOnly}
        />
      )}
    </div>
  );
};

export default SimpleInputField;
