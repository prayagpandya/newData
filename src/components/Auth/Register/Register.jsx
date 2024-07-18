/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/images/register.png';
import axios from 'axios';
import { url } from '../../../url';

export const fileUploadStyle = {
  '&::file-selector-button': {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#B77923',
    backgroundColor: 'white',
  },
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [photo, setPhoto] = useState('');
  const toast = useToast();

  const changeFileHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result);
      setPhoto(file);
    };
  };

  const signupApiCall = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('number', number);
    formData.append('photo', photo);

    try {
      const response = await axios.post(`${url}/api/v1/auth/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Registration Successful',
        description: 'You have registered successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'An error occurred while registering',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error:', error.message);
    }
  };

  return (
    <Container maxW={'container.xl'} py={'16'} mb={'30'} mt={'16'}>
      <HStack justifyContent={'space-evenly'}>
        <VStack>
          <Image src={img} display={['none', 'none', 'block']} />
        </VStack>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading fontSize={['2xl', '2xl', '3xl']}>
            Welcome to Data Skills Hub
            <Text textAlign={'center'} color={'#B7791F'}>
              Signup
            </Text>
          </Heading>
          <form style={{ width: '100%' }} onSubmit={signupApiCall}>
            <Box boxShadow={'0 0 10px 2px #dbd695'} p={'4'} borderRadius={'lg'}>
              <Box justifyContent={'center'} display={'flex'}>
                <Avatar src={imgPreview} size={'2xl'} />
              </Box>
              <Box my={'1'}>
                <FormLabel htmlFor="name" children="Name" />
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
              <Box my={'1'}>
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
              </Box>
              <Box my={'1'}>
                <FormLabel htmlFor="number" children="Mobile No." />
                <Input
                  required
                  id="number"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  placeholder="Enter Your Mobile No."
                  type="number"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Box my={'1'}>
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
              <Box my={'1'}>
                <FormLabel
                  id="photo"
                  htmlFor="chooseAvatar"
                  children="Choose Avatar"
                />
                <Input
                  css={fileUploadStyle}
                  accept="image/*"
                  onChange={changeFileHandler}
                  required
                  name="photo"
                  id="chooseAvatar"
                  placeholder="Choose Your Avatar"
                  type="file"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Button my={'1'} w={'full'} colorScheme={'yellow'} type="submit">
                Register
              </Button>
              <Box my={'1'}>
                Already a user?{' '}
                <Link to={'/login'}>
                  <Button colorScheme={'yellow'} variant={'link'}>
                    Login
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

export default Register;
