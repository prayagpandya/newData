import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  Image,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Select,
  useToast,
} from '@chakra-ui/react';
import { BsCollectionPlay } from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineUserAdd } from 'react-icons/ai';
import { url } from '../../url';

import { useLocation } from 'react-router-dom';
import LearnCard from '../Cards/LearnCard';
import HowWorksCard from '../Cards/HowWorksCard';

const AboutCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('gray.800', 'white');
  const toast = useToast();
  const history = useLocation(); // Use useHistory for navigation

  useEffect(() => {
    // Fetch the course data
    axios
      .get(`${url}/api/v1/courses/get-course/${id}`)
      .then(response => {
        setCourse(response.data.course);
        console.log(response.data.course);
      })
      .catch(error => {
        console.error('There was an error fetching the course data!', error);
      });
  }, [id]);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleDemoSubmit = () => {
    const formData = {
      name: name,
      email: email,
      phoneNumber: `${countryCode}${phoneNumber}`, // Combine country code with phone number
      courseName: course.title, // Add course name to the form data
    };

    // Handle form submission logic here
    axios
      .post(`${url}/api/v1/book-demo/submit`, formData)
      .then(response => {
        toast({
          title: 'Demo booking successful',
          description:
            'We have received your request for a demo. We will contact you shortly.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log('Demo booking successful:', response.data);
        onClose(); // Close the modal after form submission
      })
      .catch(error => {
        console.error('Error booking demo:', error);
      });
  };

  const handleEnrollNow = () => {
    sessionStorage.setItem('courseId', course._id); // Store course name in sessionStorage
    window.location.replace('/payment'); // Redirect to payment page
  };

  if (!course) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container
      mx={'auto'}
      minH={'90vh'}
      maxW={'container.xl'}
      py={['8', '10', '24']}
    >
      <Stack
        direction={['column-reverse', 'row']}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        spacing={8}
      >
        <VStack
          align={['center', 'flex-start']}
          bg={bg}
          p={8}
          py={'40px'}
          spacing={8}
          w={'full'}
          borderRadius={'md'}
          boxShadow={'0 25px 50px -12px rgb(0 0 0 / 0.25)'}
        >
          <Heading fontWeight={'500'} size={'xl'} color={color}>
            {course.title}
          </Heading>
          <HStack spacing={[10, 4]}>
            <Stack
              direction={['column', 'row']}
              spacing={2}
              alignItems={'center'}
            >
              <Icon
                as={BsCollectionPlay}
                fontSize={'20px'}
                _dark={{ color: 'rgb(250,240,137)' }}
                color="rgb(214,158,46)"
              />
              <Text>{course.lessonsCount} Lessons</Text>
            </Stack>
            <Stack
              direction={['column', 'row']}
              spacing={2}
              alignItems={'center'}
            >
              <Icon
                as={AiOutlineUserAdd}
                fontSize={'24px'}
                _dark={{ color: 'rgb(250,240,137)' }}
                color="rgb(214,158,46)"
              />{' '}
              <Text>{course.seats} Seats</Text>
            </Stack>
            <Stack
              direction={['column', 'row']}
              spacing={2}
              alignItems={'center'}
            >
              <Icon
                as={AiOutlineFieldTime}
                fontSize={'24px'}
                _dark={{ color: 'rgb(250,240,137)' }}
                color="rgb(214,158,46)"
              />{' '}
              <Text>{course.duration} </Text>
            </Stack>
          </HStack>
          <Text fontSize={'lg'} color={color}>
            {course.briefDescription}
          </Text>

          <Stack direction={['column', 'row']} spacing={4} w={'full'} mt={8}>
            <Button colorScheme={'yellow'} w={['full']} onClick={onOpen}>
              Book Free Demo
            </Button>
            {/* <Button
              variant={'outline'}
              colorScheme={'yellow'}
              w={['full']}
              onClick={handleEnrollNow}
            >
              Enroll Now
            </Button> */}
          </Stack>
        </VStack>
        <Box
          boxSize={'60'}
          boxShadow={'lg'}
          borderRadius={'md'}
          overflow={'hidden'}
          w={['full', '80%']}
          h={['300px', 'full']}
        >
          <Image
            src={`${url}/public${course.photo}`}
            boxSize={'full'}
            objectFit={'contain'}
          />
        </Box>
      </Stack>
      <LearnCard />
      <Stack maxW={'container.xl'} mt={10} spacing={8}>
        <Heading fontWeight={'500'} my={8} children="Course Overview" />
        <Stack spacing={4}>
          {course.overview.map((paragraph, index) => (
            <Text
              key={index}
              fontSize={'xl'}
              fontFamily={'Fira Sans'}
              letterSpacing={'0.5px'}
              opacity={0.6}
            >
              {paragraph}
            </Text>
          ))}
        </Stack>
        <Heading fontWeight={'500'} my={8} children="Course Objectives" />
        <UnorderedList
          fontSize={'xl'}
          fontFamily={'Fira Sans'}
          letterSpacing={'0.5px'}
          opacity={0.6}
        >
          {course.objectives.map((objective, index) => (
            <ListItem key={index} mb={2}>
              {objective}
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>
      <HowWorksCard />

      {/* Modal for booking free demo */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book a Free Demo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input
                // placeholder="Enter your name"
                value={course.title}
                // onChange={e => setName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <HStack>
                <Select
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                  width="25%"
                >
                  <option value="+1">+1 </option>
                  <option value="+44">+44 </option>
                  <option value="+91">+91 </option>
                  {/* Add more options as needed */}
                </Select>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </HStack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDemoSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AboutCourse;
