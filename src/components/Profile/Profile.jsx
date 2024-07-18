import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fileUploadStyle } from '../Auth/Register/Register';
import { url } from '../../url';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [photo, setPhoto] = useState('');
  const [imgPreview, setImgPreview] = useState('');

  // Example: Get userId from session storage
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const response = await axios.get(`${url}/api/v1/auth/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setNumber(response.data.user.number);
        setPhoto(response.data.user.photo);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    window.location.replace('/');
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
  };

  const handleUpdateProfile = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('number', number);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post(
        `${url}/api/v1/auth/update-profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Profile updated successfully');
      // Update local user data or trigger a re-fetch
    } catch (error) {
      console.log(error);
      alert('Error updating profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container minH={'90vh'} maxW={'container.lg'} py={'8'}>
      <Heading m={'8'} children="Profile" textTransform={'uppercase'} />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding={'8'}
      >
        <VStack>
          <Avatar src={imgPreview || `${url}/${user.photo}`} boxSize={'48'} />
          <Button onClick={onOpen} colorScheme={'yellow'} variant={'ghost'}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children={'Name'} fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children={'Email'} fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children={'Phone Number'} fontWeight={'bold'} />
            <Text children={user.number} />
          </HStack>
          <Stack alignItems={'center'} direction={['column', 'row']}>
            <Button onClick={onOpen}>Update Profile</Button>
            <Link to={'/changePassword'}>
              <Button>Change Password</Button>
            </Link>
            <Button colorScheme="red" variant={'ghost'} onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </VStack>
      </Stack>

      {/* Additional UI for courses or other details */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateProfile}>
              <VStack spacing={'4'}>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Phone Number"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                />
                <Input
                  type="file"
                  css={{ ...fileUploadStyle }}
                  onChange={handleFileChange}
                />
                <Button type="submit" w={'full'} colorScheme={'yellow'}>
                  Update Profile
                </Button>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Profile;
