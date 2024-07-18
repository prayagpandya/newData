import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/images/login.png';
import axios from 'axios';
import { url } from '../../../url';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async e => {
    e.preventDefault();

    // Debugging: log the email and password
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await axios.post(
        `${url}/api/v1/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data.existingUser._id);

      toast({
        title: 'Login Successful',
        description: 'You have logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // sessionStorage.setItem('userId', response.data.user._id);

      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('userId', response.data.existingUser._id);

      window.location.replace('/');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={'container.xl'} h={'95vh'} mt={'20'}>
      <HStack justifyContent={'space-evenly'}>
        <VStack>
          <Image src={img} display={['none', 'none', 'block']} />
        </VStack>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading fontSize={['2xl', '2xl', '3xl']}>
            Welcome to Data Skills Hub
            <Text textAlign={'center'} color={'#B7791F'}>
              Login
            </Text>
          </Heading>
          <form style={{ width: '100%' }} onSubmit={handleLogin}>
            <Box boxShadow={'0 0 10px 2px #dbd695'} p={'4'} borderRadius={'lg'}>
              <Box my={'4'}>
                <FormLabel htmlFor="email" children="Email Address" />
                <Input
                  required
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  type="email"
                  focusBorderColor="yellow.500"
                />
                <FormLabel htmlFor="password" children="Password" />
                <Input
                  required
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  type="password"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Box>
                <Link to={'/forgot-password'}>
                  <Button fontSize={'sm'} variant={'Link'}>
                    Forgot Password ?
                  </Button>
                </Link>
              </Box>
              <Button my={'4'} w={'full'} colorScheme={'yellow'} type="submit">
                Login
              </Button>
              <Box my={'4'}>
                New User ?{' '}
                <Link to={'/signup'}>
                  <Button colorScheme={'yellow'} variant={'link'}>
                    Sign Up
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

export default Login;
