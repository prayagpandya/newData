import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/images/contact.png';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/contact/submit',
        {
          name,
          email,
          phoneNumber,
          countryCode,
          message,
        }
      );

      if (response.status === 201) {
        toast({
          title: 'Message sent successfully',
          description: 'Your message has been sent successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setSuccess(true);
        setName('');
        setEmail('');
        setPhoneNumber('');
        setCountryCode('+1');
        setMessage('');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An error occurred while submitting the form.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setError(
        'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container my={'16'} maxW={'container.xl'}>
      <HStack justifyContent={'space-evenly'} w={'full'} alignItems={'center'}>
        <VStack w={'full'} display={['none', 'none', 'block']}>
          <Image src={img} display={['none', 'none', 'block']} />
        </VStack>
        <VStack h={'full'} w={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading textAlign={'center'}>Contact Us</Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box boxShadow={'0 0 10px 2px #dbd695'} p={'4'} borderRadius={'lg'}>
              <Box my={'4'}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  required
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  type="text"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Box my={'4'}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  required
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  type="email"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Box my={'4'}>
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
              </Box>
              <Box my={'4'}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  required
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Enter Your Message.."
                  focusBorderColor="yellow.500"
                />
              </Box>
              {error && (
                <Box my={'4'} color="red.500">
                  {error}
                </Box>
              )}
              {success && (
                <Box my={'4'} color="green.500">
                  Message sent successfully!
                </Box>
              )}
              <Button
                my={'4'}
                w={'full'}
                colorScheme={'yellow'}
                type="submit"
                isLoading={loading}
              >
                Send Message
              </Button>
              <Box my={'4'}>
                Request for a course?{' '}
                <Link to={'/request'}>
                  <Button colorScheme={'yellow'} variant={'link'}>
                    Click
                  </Button>{' '}
                  here
                </Link>
              </Box>
            </Box>
          </form>
        </VStack>
      </HStack>
    </Container>
  );
};

export default Contact;
