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
import img from '../../../assets/images/reset.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../url';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const toast = useToast();
  const handleResetPassword = async e => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/v1/auth/reset-password/${token}`, {
        password,
      });
      toast({
        title: 'Password Reset Successful',
        description: 'You have successfully reset your password',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setPassword('');
      window.location.replace('/login');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <Container maxW={'container.xl'}>
      <HStack justifyContent={'space-evenly'} w={'full'} h={'90vh'}>
        <VStack>
          <Image src={img} display={['none', 'none', 'block']} h={'full'} />
        </VStack>
        <VStack>
          <form onSubmit={handleResetPassword}>
            <Heading
              children="Reset Password"
              my={'16'}
              textTransform={'uppercase'}
              textAlign={'center'}
            />
            <VStack spacing={'8'}>
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter New Password"
                type="password"
                focusBorderColor="yellow.500"
              />
              <Button type="submit" w={'full'} colorScheme={'yellow'}>
                Reset Password
              </Button>
            </VStack>
          </form>
        </VStack>
      </HStack>
    </Container>
  );
};

export default ResetPassword;
