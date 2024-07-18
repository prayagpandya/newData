/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import img from '../../assets/images/data.png';
import { Link } from 'react-router-dom';
import { BsCollectionPlay, BsCollectionPlayFill } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { url } from '../../url';
import axios from 'axios';

export const Course = ({
  views,
  title,
  imagesrc,
  id,
  addToPlaylist,
  creator,
  discription,
  lecture,
}) => {
  return (
    <VStack
      mx="auto"
      alignItems="center"
      className="course"
      justifyContent="center"
      border="1px solid gray"
      p="4"
      role="group"
    >
      <Box css={{ '&:hover': { cursor: 'pointer' } }} w="full">
        <Link to={`/course/${id}`}>
          <Box w="96" mb="6">
            <Image
              src={imagesrc}
              borderRadius="md"
              objectFit="cover"
              transition="transform 0.2s"
              _groupHover={{ transform: 'scale(1.05)' }}
            />
          </Box>
          <Stack spacing="4" w="full" justifyContent="center" px="4">
            <Heading
              textAlign="left"
              fontSize="2xl"
              fontFamily="sans-serif"
              transition="color 0.2s"
              _groupHover={{ color: 'yellow.500' }}
            >
              {title}
            </Heading>
            <Text noOfLines={2} maxW="250px">
              {discription}
            </Text>
            <HStack>
              <Text fontWeight="bold" textTransform="uppercase">
                Creator
              </Text>
              <Text
                fontFamily="body"
                _groupHover={{ textDecoration: 'underline' }}
                textTransform="uppercase"
              >
                {creator}
              </Text>
            </HStack>
            <HStack justifyContent={'flex-start'} spacing={'40px'}>
              <Heading
                textAlign="center"
                size="xs"
                textTransform="uppercase"
                display={'flex'}
                gap={'10px'}
                alignItems="center"
              >
                <Icon
                  as={BsCollectionPlay}
                  fontSize={'20px'}
                  _dark={{ color: 'rgb(250,240,137)' }}
                  color="rgb(214,158,46)"
                />{' '}
                {`Lessons: ${lecture}`}
              </Heading>
              <Heading
                textAlign="center"
                size="xs"
                textTransform="uppercase"
                display={'flex'}
                gap={'10px'}
                alignItems="center"
              >
                <Icon
                  as={AiOutlineFieldTime}
                  fontSize={'20px'}
                  _dark={{ color: 'rgb(250,240,137)' }}
                  color="rgb(214,158,46)"
                />{' '}
                {`Duration: ${views}`}
              </Heading>
            </HStack>
            <Stack
              w={'full'}
              direction={['column', 'column', 'row']}
              alignItems="center"
            >
              <Link to={`/course/${id}`} style={{ width: '100%' }}>
                <Button colorScheme="yellow" minW={'100%'}>
                  More Details
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Link>
      </Box>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/courses/get-all-courses`
        );
        setCourses(response.data.courses);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);
  const categories = [
    'Data Analystics',
    'Buissiness Analystics',
    'Generative AI',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
  ];
  const playlistHandler = () => {};
  return (
    <Box maxW={'container.xl'} w={'100%'} mt={'20'} mx={'auto'} pb={'20'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type="text"
        focusBorderColor="yellow.500"
      />
      <HStack
        overflowX={'scroll'}
        paddingY={'8'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {categories.map((i, index) => (
          <Button key={index} onClick={() => setCategory(i)} minW={'60'}>
            <Text children={i} />
          </Button>
        ))}
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
          {courses.map(course => (
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

export default Courses;
