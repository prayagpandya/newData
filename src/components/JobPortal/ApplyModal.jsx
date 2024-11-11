import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../../url';
import AnimatedInputField from './AnimatedInput'; // Ensure correct path

const ApplyModal = ({ job, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null,
    jobrole: '',
  });
  const toast = useToast();
  useEffect(() => {
    if (job) {
      setFormData(prevState => ({
        ...prevState,
        jobrole: job.title,
      }));
    }
  }, [job]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    setFormData(prevState => ({
      ...prevState,
      cv: e.target.files[0],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await axios.post(`${url}/api/v1/jobs/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        console.log('Application submitted successfully:', response);
        closeModal();
        toast({
          title: 'Application submitted successfully',
          description: 'Email has been sent',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  // Input fields data
  const inputFields = [
    {
      // label: "Job Role",
      type: 'text',
      name: 'jobrole',
      value: formData.jobrole,
      onChange: handleChange,
      readOnly: true,
    },
    {
      label: 'Name',
      type: 'text',
      name: 'name',
      value: formData.name,
      onChange: handleChange,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: formData.email,
      onChange: handleChange,
    },
    {
      label: 'Phone',
      type: 'tel',
      name: 'phone',
      value: formData.phone,
      onChange: handleChange,
    },
    {
      label: 'Cover Letter',
      name: 'coverLetter',
      value: formData.coverLetter,
      onChange: handleChange,
      isTextArea: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Apply for {job?.title}</h2>

        <form onSubmit={handleSubmit}>
          {inputFields.map((field, index) => (
            <AnimatedInputField
              key={index}
              label={field.label}
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              readOnly={field.readOnly}
              isTextArea={field.isTextArea}
            />
          ))}

          {/* File upload field */}
          <div className="relative mb-6 flex items-center gap-2">
            <span className="font-medium">Upload CV</span>
            <input
              type="file"
              name="cv"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-5 py-2 font-medium bg-gray-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-medium bg-[#FCB902] text-black rounded"
            >
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
