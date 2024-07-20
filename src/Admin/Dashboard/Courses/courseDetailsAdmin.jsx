import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Heading,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import withAdminLayout from '../HOF';
import { url } from '../../../url';

const CourseDetailsAdmin = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [editCourse, setEditCourse] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}/api/v1/courses/get-course/${courseId}`
        );
        const courseData = response.data.course;
        setCourse(courseData);
        setEditCourse(courseData); // Initialize editCourse state with fetched data
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch course details.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, toast]);

  const handleEditClick = () => {
    onOpen();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCourse = async () => {
    const updateData = {
      ...editCourse,
      objectives: JSON.parse(editCourse.objectives),
      overview: JSON.parse(editCourse.overview),
    };

    try {
      await axios.put(
        `${url}/api/v1/courses/update-course/${courseId}`,
        updateData
      );
      setCourse(editCourse);
      onClose();
      toast({
        title: 'Success',
        description: 'Course details updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: 'Error',
        description: 'Failed to update course details.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Container minH="90vh" minW="80vw" maxW="80vw" w="100%" p="16">
        <Spinner size="xl" color="teal" />
      </Container>
    );
  }

  return (
    <Container minH="90vh" minW="80vw" maxW="80vw" w="100%" p="16">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading>{course.title}</Heading>
        <Button colorScheme="teal" onClick={handleEditClick}>
          Edit Course
        </Button>
      </Box>

      <Accordion allowToggle mt={4}>
        {course.modules &&
          course.modules.map(module => (
            <AccordionItem key={module._id}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {module.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Video Title</Th>
                      <Th>Preview</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {module.videos &&
                      module.videos.map(video => (
                        <Tr key={video._id}>
                          <Td>{video.title}</Td>
                          <Td>
                            <video
                              width="220"
                              height="240"
                              controls
                              src={`${url}${video.path}`}
                            />
                          </Td>
                          <Td>
                            <Button size="sm">Edit</Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
                <Button size="sm" colorScheme="teal" mt={4}>
                  Add Video
                </Button>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Course Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={editCourse.title || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="briefDescription" isRequired mt={4}>
              <FormLabel>Brief Description</FormLabel>
              <Textarea
                name="briefDescription"
                value={editCourse.briefDescription || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="creator" isRequired mt={4}>
              <FormLabel>Creator</FormLabel>
              <Input
                name="creator"
                value={editCourse.creator || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="lessonsCount" isRequired mt={4}>
              <FormLabel>Lessons Count</FormLabel>
              <Input
                name="lessonsCount"
                type="number"
                value={editCourse.lessonsCount || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="duration" isRequired mt={4}>
              <FormLabel>Duration</FormLabel>
              <Input
                name="duration"
                value={editCourse.duration || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="startDate" isRequired mt={4}>
              <FormLabel>Start Date</FormLabel>
              <Input
                name="startDate"
                type="date"
                value={editCourse.startDate || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="price" isRequired mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={editCourse.price || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="objectives" isRequired mt={4}>
              <FormLabel>Objectives</FormLabel>
              <Textarea
                name="objectives"
                value={
                  editCourse.objectives
                    ? JSON.stringify(editCourse.objectives)
                    : ''
                }
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="overview" isRequired mt={4}>
              <FormLabel>Overview</FormLabel>
              <Textarea
                name="overview"
                value={
                  editCourse.overview ? JSON.stringify(editCourse.overview) : ''
                }
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="photo" mt={4}>
              <FormLabel>Photo URL</FormLabel>
              <Input
                name="photo"
                value={editCourse.photo || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSaveCourse}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default withAdminLayout(CourseDetailsAdmin, 'Course Details');
