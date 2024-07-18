import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import withAdminLayout from '../HOF';
import axios from 'axios';
import { url } from '../../../url';

const CreateCourseForm = () => {
  const [title, setTitle] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [creator, setCreator] = useState('');
  const [lessonsCount, setLessonsCount] = useState(0);
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [price, setPrice] = useState(0);
  const [objectives, setObjectives] = useState([{ id: uuidv4(), text: '' }]);
  const [overview, setOverview] = useState([{ id: uuidv4(), text: '' }]);
  const [photo, setPhoto] = useState(null);
  const toast = useToast();
  const handleCreateCourse = async courseData => {
    try {
      const response = await axios.post(
        `${url}/api/v1/courses/create-course`,
        courseData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Course created successfully:', response.data);

      // Handle success (e.g., show a success message, redirect, etc.)
      setTitle('');
      setBriefDescription('');
      setCreator('');
      setLessonsCount(0);
      setDuration('');
      setStartDate('');
      setPrice(0);
      setObjectives([{ id: uuidv4(), text: '' }]);
      setOverview([{ id: uuidv4(), text: '' }]);
      setPhoto(null);
      toast({
        title: 'Course created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleObjectivesChange = (id, value) => {
    setObjectives(
      objectives.map(obj => (obj.id === id ? { ...obj, text: value } : obj))
    );
  };

  const handleOverviewChange = (id, value) => {
    setOverview(
      overview.map(obj => (obj.id === id ? { ...obj, text: value } : obj))
    );
  };

  const addObjective = () => {
    setObjectives([...objectives, { id: uuidv4(), text: '' }]);
  };

  const addOverview = () => {
    setOverview([...overview, { id: uuidv4(), text: '' }]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('briefDescription', briefDescription);
    formData.append('creator', creator);
    formData.append('lessonsCount', lessonsCount);
    formData.append('duration', duration);
    formData.append('startDate', startDate);
    formData.append('price', price);
    formData.append(
      'objectives',
      JSON.stringify(objectives.map(obj => obj.text))
    );
    formData.append('overview', JSON.stringify(overview.map(obj => obj.text)));
    if (photo) {
      formData.append('photo', photo);
    }

    await handleCreateCourse(formData);
  };

  return (
    <Box p={5} maxWidth="800px" w={'100%'} mx="auto" mt={12}>
      <Heading
        children={'Create New Course'}
        fontWeight={500}
        textAlign={'center'}
        mb={'20'}
      />
      <form onSubmit={handleSubmit}>
        <FormControl id="photo" mb={4}>
          <FormLabel>Photo of Course</FormLabel>
          <Input type="file" onChange={e => setPhoto(e.target.files[0])} />
        </FormControl>

        <FormControl id="title" mb={4}>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </FormControl>

        <FormControl id="brief-description" mb={4}>
          <FormLabel>Brief Description</FormLabel>
          <Textarea
            value={briefDescription}
            onChange={e => setBriefDescription(e.target.value)}
          />
        </FormControl>

        <FormControl id="creator" mb={4}>
          <FormLabel>Creator</FormLabel>
          <Input value={creator} onChange={e => setCreator(e.target.value)} />
        </FormControl>

        <FormControl id="lessons-count" mb={4}>
          <FormLabel>Lessons Count</FormLabel>
          <NumberInput
            value={lessonsCount}
            onChange={value => setLessonsCount(parseInt(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl id="duration" mb={4}>
          <FormLabel>Duration</FormLabel>
          <Input value={duration} onChange={e => setDuration(e.target.value)} />
        </FormControl>

        <FormControl id="start-date" mb={4}>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="price" mb={4}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            value={price}
            onChange={value => setPrice(parseFloat(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl id="objectives" mb={4}>
          <FormLabel>Objectives</FormLabel>
          {objectives.map(obj => (
            <Box key={obj.id} mb={2}>
              <Input
                value={obj.text}
                onChange={e => handleObjectivesChange(obj.id, e.target.value)}
                placeholder="Objective"
              />
            </Box>
          ))}
          <Button onClick={addObjective} mt={2}>
            Add Objective
          </Button>
        </FormControl>

        <FormControl id="overview" mb={4}>
          <FormLabel>Overview</FormLabel>
          {overview.map(obj => (
            <Box key={obj.id} mb={2}>
              <Input
                value={obj.text}
                onChange={e => handleOverviewChange(obj.id, e.target.value)}
                placeholder="Overview Point"
              />
            </Box>
          ))}
          <Button onClick={addOverview} mt={2}>
            Add Overview Point
          </Button>
        </FormControl>

        <Button
          type="submit"
          colorScheme="yellow"
          mt={4}
          w={['300px', '400px']}
          alignSelf={'center'}
          ml={['1%', '20%']}
        >
          Create Course
        </Button>
      </form>
    </Box>
  );
};

export default withAdminLayout(CreateCourseForm, 'Create Courses');
