import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import img from '../../../assets/images/forgot.png';
import axios from 'axios';
import { url } from '../../../url';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleForgotPassword = async e => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/v1/auth/forgot-password`, {
        email,
      });
      toast({
        title: 'Email Sent',
        description: 'We have sent an email to reset your password',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={'container.xl'}>
      <HStack justifyContent={'space-evenly'} w={'full'} h={'90vh'}>
        <VStack>
          <Image src={img} display={['none', 'none', 'block']} h={'full'} />
        </VStack>
        <VStack>
          <form onSubmit={handleForgotPassword}>
            <Heading
              children="Forgot Password"
              my={'16'}
              textTransform={'uppercase'}
              textAlign={'center'}
            />
            <VStack spacing={'8'}>
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                type="email"
                focusBorderColor="yellow.500"
              />
              <Button type="submit" w={'full'} colorScheme={'yellow'}>
                Send Email
              </Button>
            </VStack>
          </form>
        </VStack>
      </HStack>
    </Container>
  );
};

export default ForgotPassword;
