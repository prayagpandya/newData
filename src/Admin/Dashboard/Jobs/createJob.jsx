import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from '../../../url';
import withAdminLayout from '../HOF';

const ManageJobs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useNavigate();
  const toast = useToast();
  // State to store jobs and the form data
  const [jobs, setJobs] = useState([]);
  const [jobForm, setJobForm] = useState({
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
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/jobs/`);
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  // Fetch jobs from the API when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle form field changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setJobForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleJobInfoChange = e => {
    const { name, value } = e.target;
    setJobForm(prevForm => ({
      ...prevForm,
      jobinfo: {
        ...prevForm.jobinfo,
        [name]: value,
      },
    }));
  };

  // Add/remove tags for description, responsibilities, and qualifications
  const addTag = field => {
    setJobForm(prevForm => ({
      ...prevForm,
      [field]: [...prevForm[field], ''],
    }));
  };

  const handleTagChange = (e, index, field) => {
    const { value } = e.target;
    const updatedTags = [...jobForm[field]];
    updatedTags[index] = value;
    setJobForm(prevForm => ({
      ...prevForm,
      [field]: updatedTags,
    }));
  };

  const removeTag = (index, field) => {
    const updatedTags = [...jobForm[field]];
    updatedTags.splice(index, 1);
    setJobForm(prevForm => ({
      ...prevForm,
      [field]: updatedTags,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', jobForm.title);
      formData.append('description', JSON.stringify(jobForm.description));
      formData.append('company', jobForm.company);
      formData.append('employeeType', jobForm.jobinfo.employeeType);
      formData.append('location', jobForm.jobinfo.location);
      formData.append('jobType', jobForm.jobinfo.jobType);
      formData.append('experience', jobForm.jobinfo.experience);
      formData.append('salary', jobForm.jobinfo.salary);
      formData.append('datePosted', jobForm.jobinfo.datePosted);
      formData.append('vacancies', jobForm.jobinfo.vacancies);
      formData.append('applied', jobForm.jobinfo.applied);
      formData.append('createdBy', jobForm.createdBy);
      formData.append(
        'responsibilities',
        JSON.stringify(jobForm.responsibilities)
      );
      formData.append('qualifications', JSON.stringify(jobForm.qualifications));

      // Ensure logo is appended only if it exists (and is a valid file)
      if (jobForm.jobinfo.logo && jobForm.jobinfo.logo instanceof File) {
        formData.append('logo', jobForm.jobinfo.logo); // Append the file object
      } else {
        console.error(jobForm, 'Logo file is missing.');
        return; // Prevent submission if logo is missing
      }

      const response = await axios.post(
        `${url}/api/v1/jobs/createJob`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Make sure the content-type is correct for form data with files
          },
        }
      );

      setJobs([response.data.data, ...jobs]);
      onClose();
      setJobForm({
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
          logo: '', // Reset logo after submission
          vacancies: '',
          applied: '',
        },
        createdBy: '',
        responsibilities: [],
        qualifications: [],
      });
      await fetchJobs();
      toast({
        title: 'Success',
        description: 'Job created successfully.',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <Box>
      {/* Button to open the modal */}
      <Button onClick={onOpen} colorScheme="blue" mb={4}>
        Create New Job
      </Button>

      {/* Modal for job creation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Job Posting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Job Title */}
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={jobForm.title}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Job Description */}
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Box>
                {jobForm.description.map((desc, index) => (
                  <Box key={index} mb={2}>
                    <Input
                      value={desc}
                      onChange={e => handleTagChange(e, index, 'description')}
                      placeholder={`Description ${index + 1}`}
                    />
                    <Button
                      size="sm"
                      onClick={() => removeTag(index, 'description')}
                      colorScheme="red"
                      ml={2}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button
                  size="sm"
                  onClick={() => addTag('description')}
                  colorScheme="green"
                >
                  Add Description
                </Button>
              </Box>
            </FormControl>

            {/* Responsibilities */}
            <FormControl mt={4}>
              <FormLabel>Responsibilities</FormLabel>
              <Box>
                {jobForm.responsibilities.map((resp, index) => (
                  <Box key={index} mb={2}>
                    <Input
                      value={resp}
                      onChange={e =>
                        handleTagChange(e, index, 'responsibilities')
                      }
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    <Button
                      size="sm"
                      onClick={() => removeTag(index, 'responsibilities')}
                      colorScheme="red"
                      ml={2}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button
                  size="sm"
                  onClick={() => addTag('responsibilities')}
                  colorScheme="green"
                >
                  Add Responsibility
                </Button>
              </Box>
            </FormControl>

            {/* Qualifications */}
            <FormControl mt={4}>
              <FormLabel>Qualifications</FormLabel>
              <Box>
                {jobForm.qualifications.map((qual, index) => (
                  <Box key={index} mb={2}>
                    <Input
                      value={qual}
                      onChange={e =>
                        handleTagChange(e, index, 'qualifications')
                      }
                      placeholder={`Qualification ${index + 1}`}
                    />
                    <Button
                      size="sm"
                      onClick={() => removeTag(index, 'qualifications')}
                      colorScheme="red"
                      ml={2}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button
                  size="sm"
                  onClick={() => addTag('qualifications')}
                  colorScheme="green"
                >
                  Add Qualification
                </Button>
              </Box>
            </FormControl>

            {/* Company */}
            <FormControl mt={4}>
              <FormLabel>Company</FormLabel>
              <Input
                name="company"
                value={jobForm.company}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Job Info: Employee Type */}
            <FormControl mt={4}>
              <FormLabel>Employee Type</FormLabel>
              <Input
                name="employeeType"
                value={jobForm.jobinfo.employeeType}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Location */}
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={jobForm.jobinfo.location}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Job Type */}
            <FormControl mt={4}>
              <FormLabel>Job Type</FormLabel>
              <Input
                name="jobType"
                value={jobForm.jobinfo.jobType}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Experience */}
            <FormControl mt={4}>
              <FormLabel>Experience</FormLabel>
              <Input
                name="experience"
                value={jobForm.jobinfo.experience}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Salary */}
            <FormControl mt={4}>
              <FormLabel>Salary</FormLabel>
              <Input
                name="salary"
                value={jobForm.jobinfo.salary}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Date Posted */}
            <FormControl mt={4}>
              <FormLabel>Date Posted</FormLabel>
              <Input
                name="datePosted"
                type="date"
                value={jobForm.jobinfo.datePosted}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Vacancies */}
            <FormControl mt={4}>
              <FormLabel>Vacancies</FormLabel>
              <Input
                name="vacancies"
                value={jobForm.jobinfo.vacancies}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Applied */}
            <FormControl mt={4}>
              <FormLabel>Applied</FormLabel>
              <Input
                name="applied"
                value={jobForm.jobinfo.applied}
                onChange={handleJobInfoChange}
              />
            </FormControl>

            {/* Job Info: Logo */}
            <FormControl mt={4}>
              <FormLabel>Logo</FormLabel>
              <Input
                name="logo"
                type="file"
                accept="image/*"
                onChange={e => {
                  setJobForm({
                    ...jobForm,
                    jobinfo: { ...jobForm.jobinfo, logo: e.target.files[0] }, // Storing the actual file object
                  });
                }}
              />
            </FormControl>

            {/* Created By */}
            <FormControl mt={4}>
              <FormLabel>Created By</FormLabel>
              <Input
                name="createdBy"
                value={jobForm.createdBy}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Job
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Display Jobs in a Table */}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Job Postings</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Company</Th>
              <Th>Posted</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs.map(job => (
              <Tr key={job._id}>
                <Td>{job.title}</Td>
                <Td>{job.company}</Td>
                <Td>{job.datePosted}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    onClick={() => history(`/jobs/${job._id}`)}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default withAdminLayout(ManageJobs, 'Manage Jobs');
