import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { url } from '../../url';

const PaymentSuccess = () => {
  const userId = sessionStorage.getItem('userId');
  const courseId = sessionStorage.getItem('courseId');

  const handleCourseAccess = async () => {
    try {
      const response = await axios.post(`${url}/api/v1/auth/success-api`, {
        courseId,
        userId,
      });
      if (response.status === 200) {
        console.log('Course access granted', response.data);
      } else {
        console.error('Failed to access course');
      }
      console.log('FrontEnd Course Success Data', response);
    } catch (error) {
      console.error('Error accessing course:', error);
    }
  };

  useEffect(() => {
    if (courseId && userId) {
      handleCourseAccess();
      sessionStorage.removeItem('courseId');
    } else {
      console.error('Course ID or User ID is missing');
    }
  }, []);

  return (
    <Container p={'16'}>
      <Heading my={'8'} textAlign={'center'}>
        You have successfully made payment
      </Heading>
      <VStack
        boxShadow={'0 0 10px 2px #c1c1c1'}
        pb={'16'}
        alignItems={'center'}
        borderRadius={'lg'}
      >
        <Box
          w={'full'}
          bg={'yellow.400'}
          p={'4'}
          css={{ borderRadius: '8px 8px 0 0' }}
        >
          <Text children={`Payment Success`} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children={`Congratulations You Are Successfully Enrolled`} />
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill color="green" />
            </Heading>
          </VStack>
        </Box>
        <Link to={`/profile/${userId}`}>
          <Button w={'full'} variant={'ghost'} colorScheme={'yellow'}>
            Go To Profile
          </Button>
        </Link>
        <Heading size={'xs'}> Reference ID: 12345</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
