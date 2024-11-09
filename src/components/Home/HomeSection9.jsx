import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
  Heading,
  Button,
  Grid,
  Stack,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../url';
import { Course } from '../Courses/Courses';

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/courses/get-all-courses`
        );
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Box maxW={'container.xl'} w={'100%'} mt={'20'} mx={'auto'} pb={'20'}>
      <HStack
        justifyContent={['center', 'space-between']}
        alignItems={'center'}
        gap={'3'}
        mb={'20'}
      >
        <Heading
          children={'Our Popular Courses'}
          textAlign={['center', 'center', 'center', 'left']}
          fontWeight={'500'}
          fontSize={['3xl', '3xl', '3xl', '5xl']}
        />
        <Link to={'/courses'}>
          <Button colorScheme={'yellow'} variant={'solid'}>
            View All
          </Button>
        </Link>
      </HStack>
      <Stack
        direction={['column', 'column', 'row', 'row']}
        flexWrap={'wrap'}
        justifyContent={[
          'flex-start',
          'flex-start',
          'space-evenly',
          'space-evenly',
        ]}
        alignItems={['center', 'center', 'flex-start', 'flex-start']}
      >
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap="6"
        >
          {loading
            ? Array(6) // Display 6 skeletons while loading
                .fill('')
                .map((_, index) => (
                  <Box
                    key={index}
                    padding="6"
                    boxShadow="lg"
                    bg="white"
                    borderRadius="md"
                  >
                    <Skeleton height="150px" mb="4" />
                    <SkeletonText mt="4" noOfLines={3} spacing="4" />
                    <Skeleton height="20px" mt="4" width="40%" />
                  </Box>
                ))
            : courses.map(course => (
                <Course
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  imagesrc={`${url}/public${course.photo}`}
                  creator={course.creator}
                  discription={course.briefDescription}
                  lecture={course.lessonsCount}
                  views={course.duration}
                />
              ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default PopularCourses;
