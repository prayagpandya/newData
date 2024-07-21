import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Alert,
  AlertIcon,
  Grid,
  HStack
} from '@chakra-ui/react';
import { url } from '../../url';

const CoursesDetailes = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lectureNumber, setLectureNumber] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/courses/get-course/${id}`);
        console.log('Course Data:', response.data);
        setCourse(response.data.course);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (!course || !course.modules || course.modules.length === 0) {
    console.log("Modules Error:", course);
    return <div>No course data available.</div>;
  }

  const currentModule = course.modules[moduleIndex];
  const currentVideo = currentModule.videos[lectureNumber];

  return (
    <Grid minH="90vh" templateRows="auto 1fr" mt={20}>
      <Box>
        <Heading
          children={`#${lectureNumber + 1} ${currentVideo?.title || 'Loading...'}`}
          m={4}
          size="lg"
          textAlign="center"
        />
        {currentVideo ? (
          <video
            width="100%"
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={`${url}${currentVideo.path}`}
          />
        ) : (
          <Text>Loading video...</Text>
        )}

        <Heading textAlign={'center'} children={currentModule.title} m={4} />
    
      </Box>

      <Accordion allowMultiple width="100%" mt={10}>
        {course.modules.map((module, mIndex) => (
          <AccordionItem key={module._id}>
            <AccordionButton onClick={() => setModuleIndex(mIndex)}>
              <Box flex="1" textAlign="left">
                {module.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Accordion allowMultiple>
                {module.videos.map((video, vIndex) => (
                  <AccordionItem key={video._id}>
                    <AccordionButton onClick={() => setLectureNumber(vIndex)}>
                      <Box flex="1" textAlign="left">
                        #{vIndex + 1} {video.title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <HStack>
                        <Text fontWeight="bold">Title:</Text>
                        <Text>{video.title}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Description:</Text>
                        <Text>{video.description}</Text>
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Grid>
  );
};

export default CoursesDetailes;
