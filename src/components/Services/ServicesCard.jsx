import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Select,
  useToast,
  Image,
} from '@chakra-ui/react';
import { url } from '../../url';
import BookDemo from '../../assets/images/bookdemo.png';

const AboutService = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const toast = useToast();

  useEffect(() => {
    // Fetch the service data
    axios
      .get(`${url}/api/v1/services/${id}`)
      .then(response => {
        setService(response.data);
        console.log('service', response.data.photo);
      })
      .catch(error => {
        console.error('There was an error fetching the service data!', error);
      });
  }, [id]);

  const handleDemoSubmit = () => {
    const formData = {
      name: name,
      email: email,
      phoneNumber: `${countryCode}${phoneNumber}`, // Combine country code with phone number
      serviceName: service.name, // Add service name to the form data
    };

    axios
      .post(`${url}/api/v1/book-service/submit`, formData)
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
      })
      .catch(error => {
        console.error('Error booking demo:', error);
      });
  };

  if (!service) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container
      mx={'auto'}
      minH={'90vh'}
      maxW={'container.xl'}
      py={['8', '10', '24']}
    >
      {/* Hero Section */}
      <Box
        position="relative"
        height={['300px', '400px', '500px']}
        backgroundImage={`url(${service.photo.slice(1)})`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="md"
        mb={8}
      >
        <VStack
          position="absolute"
          bottom={'50%'}
          left={'25rem'}
          color="white"
          textShadow="0px 0px 10px rgba(0, 0, 0, 0.7)"
          spacing={1}
        >
          <Heading fontWeight={'500'} size={'xl'}>
            {service.name}
          </Heading>
        </VStack>
      </Box>

      <Stack maxW={'container.xl'} mt={10} spacing={8}>
        <Heading fontWeight={'500'} my={8} children="Service Overview" />
        <Stack spacing={4}>
          {service.overview.map((paragraph, index) => (
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
        <Heading fontWeight={'500'} my={8} children="Service Objectives" />
        <UnorderedList
          fontSize={'xl'}
          fontFamily={'Fira Sans'}
          letterSpacing={'0.5px'}
          opacity={0.6}
        >
          {service.objectives.map((objective, index) => (
            <ListItem key={index} mb={2}>
              {objective}
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>

      {/* Booking Form Section */}
      <HStack spacing={10} mt={10}>
        <Box flex={1}>
          <Image
            src={BookDemo}
            alt={'Book Demo'}
            borderRadius="md"
            objectFit={'cover'}
            height="100%"
          />
        </Box>
        <Box
          flex={1}
          p={8}
          borderRadius="md"
          boxShadow={'0 25px 50px -12px rgba(0, 0, 0, 0.25)'}
        >
          <Heading size="lg" mb={4} color="yellow.400">
            Book a Free Demo
          </Heading>

          <FormControl>
            <FormLabel>Service Name</FormLabel>
            <Input value={service.name} isReadOnly bg="white" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              bg="white"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              bg="white"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <HStack>
              <Select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                width="25%"
                bg="white"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </Select>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                bg="white"
              />
            </HStack>
          </FormControl>

          <Button
            colorScheme="yellow"
            mt={6}
            width="full"
            onClick={handleDemoSubmit}
            borderRadius="md"
            _hover={{ bg: 'yellow.400' }}
          >
            Submit
          </Button>
        </Box>

        {/* Image Section */}
      </HStack>
    </Container>
  );
};

export default AboutService;
