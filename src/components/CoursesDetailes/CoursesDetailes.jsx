import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { url } from '../../url';

const CoursesDetailes = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lectureNumber, setLectureNumber] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/courses/get-course/${id}`
        );
        console.log('Course Data:', response.data); // Debugging line
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  if (!course || !course.modules || course.modules.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <Heading
          children={`#${lectureNumber + 1} ${
            course.modules[0].videos[lectureNumber].title
          }`}
          m={'4'}
          size={['lg']}
          textAlign={['center']}
          display={['block', 'none']}
        />
        <video
          width={'100%'}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={course.modules[0].videos[lectureNumber].path}
        ></video>

        <Heading
          children={`#${lectureNumber + 1} ${
            course.modules[0].videos[lectureNumber].title
          }`}
          m={'4'}
          display={['none', 'block']}
        />
        <Heading children="Description" m={'4'} />
        <Text
          m={'4'}
          children={course.modules[0].videos[lectureNumber].title}
        />
      </Box>
      <VStack mt={'10'}>
        {course.modules[0].videos.map((item, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={item._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {item.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursesDetailes;
