import { Button, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Buttons = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { onClose } = useDisclosure();
  useEffect(() => {
    if (window.location.pathname === '/') {
      setActiveTab('home');
    }
    if (window.location.pathname === '/courses') {
      setActiveTab('courses');
    }
    if (window.location.pathname === '/blog') {
      setActiveTab('blog');
    }
    if (window.location.pathname === '/contact') {
      setActiveTab('contact');
    }
    if (window.location.pathname === '/about') {
      setActiveTab('about');
    }
  }, [setActiveTab]);
  return (
    <>
      <Button
        onClick={() => {
          setActiveTab('home');
          onClose();
        }}
        backgroundColor={
          activeTab === 'home' ? 'rgba(250, 240, 137, 0.545)' : 'transparent'
        }
        variant={'ghost'}
        colorScheme={'yellow'}
        _hover={{
          backgroundColor: 'rgba(250, 240, 137, 0.545)',
          color: 'yellow.800',
          _dark: {
            backgroundColor: 'rgba(250, 240, 137, 0.545)',
            color: 'rgba(250, 240, 137)',
          },
        }}
      >
        <Link to={'/'}>Home</Link>
      </Button>
      <Button
        onClick={() => {
          setActiveTab('courses');
          onClose();
        }}
        backgroundColor={
          activeTab === 'courses' ? 'rgba(250, 240, 137, 0.545)' : 'transparent'
        }
        variant={'ghost'}
        colorScheme={'yellow'}
        _hover={{
          backgroundColor: 'rgba(250, 240, 137, 0.545)',
          color: 'yellow.800',
          _dark: {
            backgroundColor: 'rgba(250, 240, 137, 0.545)',
            color: 'rgba(250, 240, 137)',
          },
        }}
      >
        <Link to={'/courses'}>Courses</Link>
      </Button>
      <Button
        onClick={() => {
          setActiveTab('services');
        }}
        backgroundColor={
          activeTab === 'services'
            ? 'rgba(250, 240, 137, 0.545)'
            : 'transparent'
        }
        variant={'ghost'}
        colorScheme={'yellow'}
        _hover={{
          backgroundColor: 'rgba(250, 240, 137, 0.545)',
          color: 'yellow.800',
          _dark: {
            backgroundColor: 'rgba(250, 240, 137, 0.545)',
            color: 'rgba(250, 240, 137)',
          },
        }}
      >
        <Link to={'/services'}>Services</Link>
      </Button>
      <Button
        onClick={() => {
          setActiveTab('about');
        }}
        backgroundColor={
          activeTab === 'about' ? 'rgba(250, 240, 137, 0.545)' : 'transparent'
        }
        variant={'ghost'}
        colorScheme={'yellow'}
        _hover={{
          backgroundColor: 'rgba(250, 240, 137, 0.545)',
          color: 'yellow.800',
          _dark: {
            backgroundColor: 'rgba(250, 240, 137, 0.545)',
            color: 'rgba(250, 240, 137)',
          },
        }}
      >
        <Link to={'/aboutus'}>About Us</Link>
      </Button>
      <Button
        onClick={() => {
          setActiveTab('contact');
        }}
        backgroundColor={
          activeTab === 'contact' ? 'rgba(250, 240, 137, 0.545)' : 'transparent'
        }
        variant={'ghost'}
        colorScheme={'yellow'}
        _hover={{
          backgroundColor: 'rgba(250, 240, 137, 0.545)',
          color: 'yellow.800',
          _dark: {
            backgroundColor: 'rgba(250, 240, 137, 0.545)',
            color: 'rgba(250, 240, 137)',
          },
        }}
      >
        <Link to={'/contactus'}>Contact Us</Link>
      </Button>
    </>
  );
};

export default Buttons;
