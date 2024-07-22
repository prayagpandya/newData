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
import { v4 as uuidv4 } from 'uuid';
import withAdminLayout from '../HOF';
import { url } from '../../../url';

const CourseDetailsAdmin = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [editCourse, setEditCourse] = useState({});
  const [newModule, setNewModule] = useState({ title: '' });
  const [selectedModuleId, setSelectedModuleId] = useState(null); // Track selected module for video upload
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModuleOpen,
    onOpen: onModuleOpen,
    onClose: onModuleClose,
  } = useDisclosure();
  const {
    isOpen: isVideoUploadOpen,
    onOpen: onVideoUploadOpen,
    onClose: onVideoUploadClose,
  } = useDisclosure();
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
        setEditCourse({
          ...courseData,
          objectives: courseData.objectives.map(text => ({
            id: uuidv4(),
            text,
          })),
          overview: courseData.overview.map(text => ({ id: uuidv4(), text })),
        });
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

  const handleObjectivesChange = (id, value) => {
    setEditCourse(prev => ({
      ...prev,
      objectives: prev.objectives.map(obj =>
        obj.id === id ? { ...obj, text: value } : obj
      ),
    }));
  };

  const handleOverviewChange = (id, value) => {
    setEditCourse(prev => ({
      ...prev,
      overview: prev.overview.map(obj =>
        obj.id === id ? { ...obj, text: value } : obj
      ),
    }));
  };

  const addObjective = () => {
    setEditCourse(prev => ({
      ...prev,
      objectives: [...prev.objectives, { id: uuidv4(), text: '' }],
    }));
  };

  const addOverview = () => {
    setEditCourse(prev => ({
      ...prev,
      overview: [...prev.overview, { id: uuidv4(), text: '' }],
    }));
  };

  const handleSaveCourse = async () => {
    const updateData = {
      ...editCourse,
      objectives: JSON.stringify(editCourse.objectives.map(obj => obj.text)),
      overview: JSON.stringify(editCourse.overview.map(obj => obj.text)),
    };

    try {
      await axios.put(
        `${url}/api/v1/courses/update-course/${courseId}`,
        updateData,
        { headers: { 'Content-Type': 'application/json' } }
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

  const handleModuleTitleChange = e => {
    setNewModule({ ...newModule, title: e.target.value });
  };

  const handleAddModule = async () => {
    try {
      const response = await axios.post(
        `${url}/api/v1/courses/modules/${courseId}/add-module`,
        newModule,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setCourse(prev => ({
        ...prev,
        modules: [...prev.modules, response.data.module],
      }));

      toast({
        title: 'Success',
        description: 'Module added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setNewModule({ title: '' });
      onModuleClose();
    } catch (error) {
      console.error('Error adding module:', error);
      toast({
        title: 'Error',
        description: 'Failed to add module.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteModule = async moduleId => {
    try {
      await axios.delete(
        `${url}/api/v1/courses/modules/${courseId}/delete-module/${moduleId}`
      );

      setCourse(prev => ({
        ...prev,
        modules: prev.modules.filter(module => module._id !== moduleId),
      }));

      toast({
        title: 'Success',
        description: 'Module deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting module:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete module.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteVideo = async (moduleId, videoId) => {
    try {
      await axios.delete(
        `${url}/api/v1/courses/modules/${courseId}/${moduleId}/delete-video/${videoId}`
      );

      setCourse(prev => ({
        ...prev,
        modules: prev.modules.map(module => {
          if (module._id === moduleId) {
            return {
              ...module,
              videos: module.videos.filter(video => video._id !== videoId),
            };
          }
          return module;
        }),
      }));

      toast({
        title: 'Success',
        description: 'Video deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete video.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleVideoFileChange = e => {
    setVideoFile(e.target.files[0]);
  };

  const handleVideoTitleChange = e => {
    setVideoTitle(e.target.value);
  };

  const handleVideoDescriptionChange = e => {
    setVideoDescription(e.target.value);
  };

  const handleUploadVideo = async () => {
    if (!videoFile || !selectedModuleId) {
      toast({
        title: 'Error',
        description: 'No video file selected or no module selected.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', videoTitle);
    formData.append('description', videoDescription);

    try {
      const response = await axios.post(
        `${url}/api/v1/courses/modules/upload/${courseId}/${selectedModuleId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log(response);
      setCourse(prev => ({
        ...prev,
        modules: prev.modules.map(module => {
          if (module._id === selectedModuleId) {
            return {
              ...module,
              videos: [...module.videos, response.data.video],
            };
          }
          return module;
        }),
      }));

      toast({
        title: 'Success',
        description: 'Video uploaded successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setVideoFile(null);
      setVideoTitle('');
      setVideoDescription('');
      onVideoUploadClose();
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload video.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container maxW="container.xl">
      <Heading mb={4}>{course?.title}</Heading>
      <Box mb={4}>
        <Button onClick={handleEditClick}>Edit Course</Button>
        <Button ml={4} onClick={onModuleOpen}>
          Add Module
        </Button>
      </Box>
      <Accordion allowMultiple>
        {course.modules?.map(module => (
          <AccordionItem key={module._id}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {module?.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Preview</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {module?.videos.map(video => (
                    <Tr key={video?._id}>
                      <Td>{video?.title}</Td>
                      <Td>{video?.description}</Td>
                      <Td boxSize={'200px'}>
                        <video
                          controls
                          controlsList="nodownload noremoteplayback"
                          disablePictureInPicture
                          disableRemotePlayback
                          src={`${url}${video?.path}`}
                        />
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() =>
                            handleDeleteVideo(module?._id, video?._id)
                          }
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Button
                mt={4}
                colorScheme="blue"
                onClick={() => {
                  setSelectedModuleId(module?._id); // Set the selected module ID
                  onVideoUploadOpen();
                }}
              >
                Upload Video
              </Button>
              <Button
                mt={4}
                colorScheme="red"
                onClick={() => handleDeleteModule(module._id)}
              >
                Delete Module
              </Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Edit Course Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={editCourse.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={editCourse.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Objectives</FormLabel>
              {editCourse.objectives.map(obj => (
                <Input
                  key={obj.id}
                  value={obj.text}
                  onChange={e => handleObjectivesChange(obj.id, e.target.value)}
                  mb={2}
                />
              ))}
              <Button onClick={addObjective}>Add Objective</Button>
            </FormControl>
            <FormControl>
              <FormLabel>Overview</FormLabel>
              {editCourse.overview.map(obj => (
                <Input
                  key={obj.id}
                  value={obj.text}
                  onChange={e => handleOverviewChange(obj.id, e.target.value)}
                  mb={2}
                />
              ))}
              <Button onClick={addOverview}>Add Overview</Button>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveCourse}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Module Modal */}
      <Modal isOpen={isModuleOpen} onClose={onModuleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={newModule.title}
                onChange={handleModuleTitleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddModule}>
              Add
            </Button>
            <Button variant="ghost" onClick={onModuleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Upload Video Modal */}
      <Modal isOpen={isVideoUploadOpen} onClose={onVideoUploadClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Video File</FormLabel>
              <Input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input value={videoTitle} onChange={handleVideoTitleChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={videoDescription}
                onChange={handleVideoDescriptionChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUploadVideo}>
              Upload
            </Button>
            <Button variant="ghost" onClick={onVideoUploadClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default withAdminLayout(CourseDetailsAdmin);
