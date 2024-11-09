/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  ListItem,
  Menu,
  UnorderedList,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import img from '../../../assets/images/1.png';
import { Link, useLocation } from 'react-router-dom';
import { RiCloseLine, RiMenu2Fill } from 'react-icons/ri';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { url } from '../../../url';
import axios from 'axios';

const CustomHoverMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickManage = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={clickManage}
    >
      <Menu isOpen={isOpen}>
        <Button
          backgroundColor={'transparent'}
          pos={'relative'}
          outline={'none'}
          border={'none'}
          ring={'none'}
          as={Button}
          rightIcon={isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          variant="ghost"
          color={isOpen ? 'yellow.700' : 'yellow.500'}
          _hover={{
            backgroundColor: 'rgba(250, 240, 137, 0.545)',
            border: 'none',
          }}
        >
          {title}
        </Button>
        <Box
          display={isOpen ? 'block' : 'none'}
          style={{ animation: 'step-end ' }}
          transition={'all 0.5s'}
        >
          <UnorderedList
            pos={'absolute'}
            left={['30%', '30%', '30%', '44%', '45%']}
            rounded={'md'}
            bg={'white'}
            display={'flex'}
            flexDirection={'column'}
          >
            {items.map((item, index) => (
              <ListItem
                px={'4'}
                rounded={'md'}
                py={'2'}
                _hover={{ background: '#f4f4f4', color: '#D99E2E' }}
                key={index}
                as={Link}
                to={item.url}
              >
                {item.name}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Menu>
    </Box>
  );
};

const CustomHoverMenuMobile = ({ title, items, onClose, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const clickManage = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange(newState); // Notify parent of the change
  };

  return (
    <Box
      role="group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={clickManage}
    >
      <Accordion
        allowMultiple
        width={'80%'}
        ml={4}
        variant={'ghost'}
        colorScheme="yellow"
      >
        <AccordionItem
          border={'none'}
          color={isOpen ? 'yellow.700' : 'yellow.500'}
        >
          <h2>
            <AccordionButton
              _focus={{
                backgroundColor: 'rgba(250, 240, 137, 0.545)',
                color: '#975A16',
              }}
            >
              <Box as="span" flex="1" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <UnorderedList
              marginInlineStart={0}
              pr={0}
              rounded={'md'}
              bg={'white'}
              display={'flex'}
              flexDirection={'column'}
            >
              {items.map((item, index) => (
                <ListItem
                  width={'max-content'}
                  onClick={onClose}
                  rounded={'md'}
                  _hover={{ background: '#f4f4f4', color: '#D99E2E' }}
                  key={index}
                  as={Link}
                  to={item.url}
                >
                  {item.name}
                </ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

const ButtonsLink = ({ url = '/', title = 'Home' }) => {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <Button
      backgroundColor={isActive ? 'rgba(250, 240, 137, 0.545)' : 'transparent'}
      variant="ghost"
      colorScheme="yellow"
      color={isActive ? 'yellow.700' : 'yellow.500'}
      _dark={{
        color: isActive ? 'yellow.400' : 'yellow.200',
      }}
      _hover={{
        backgroundColor: 'rgba(250, 240, 137, 0.545)',
        color: 'yellow.800',
        _dark: {
          backgroundColor: 'rgba(250, 240, 137, 0.545)',
          color: 'yellow.400',
        },
      }}
    >
      <Link to={url}>{title}</Link>
    </Button>
  );
};

const Header = () => {
  const [hover, setHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState([]);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = { role: 'admin' };
  if (sessionStorage.getItem('authToken')) {
    isAuthenticated = true;
  }

  useEffect(() => {
    const handleScroll = () => {
      setHover(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = () => {
    sessionStorage.removeItem('authToken');
    window.location.replace('/');
  };

  // Determine if user is authenticated
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);
  useEffect(() => {
    const initialServices = [
      { name: 'Online Courses', id: 0 },
      { name: 'Staffing', id: 1 },
      { name: 'Web Development', id: 2 },
      { name: 'Data Science', id: 3 },
      { name: 'UI/UX Design', id: 4 },
      { name: 'QA', id: 5 },
    ];
    setServices(initialServices);
  }, []);

  const servicesMenu = {
    title: 'Services',
    items: services.map(service => ({
      name: service.name,
      url: `/services/${service.id}`,
    })),
  };

  return (
    <>
      <HStack
        display={['none', 'none', 'none', 'flex', 'flex']}
        className="header"
        w="full"
        justifyContent="space-between"
        p={4}
        pos="fixed"
        top={0}
        zIndex={10}
        h="80px"
        bgColor={hover ? 'rgb(51,51,51)' : 'transparent'}
        borderBottom={hover ? '2px solid rgba(250, 240, 137, 0.545)' : 'none'}
        _dark={{
          backgroundColor: hover ? 'rgb(5,6,9)' : 'transparent',
        }}
      >
        <Image
          src={img}
          bgColor="white"
          alt="logo"
          w="100px"
          objectFit="contain"
          _dark={{ backgroundColor: 'white' }}
        />
        <HStack>
          <Box onClick={onClose}>
            <ButtonsLink url="/" title="Home" />
          </Box>
          <Box onClick={onClose}>
            <ButtonsLink url="/courses" title="Courses" />
          </Box>
          {/* <Box onClick={onClose}>
            <ButtonsLink url="/jobs" title="Find Jobs" />
          </Box> */}

          <Box onClick={onClose}>
            <CustomHoverMenu
              title={servicesMenu.title}
              items={servicesMenu.items}
            />
          </Box>
          <Box onClick={onClose}>
            <ButtonsLink url="/aboutus" title="About Us" />
          </Box>
          <Box onClick={onClose}>
            <ButtonsLink url="/contact" title="Contact Us" />
          </Box>
        </HStack>

        <ColorModeSwitcher />
      </HStack>

      <HStack
        display={{ base: 'flex', lg: 'none' }}
        w={['94%', '94%', '94%']}
        justifyContent="space-between"
      >
        <Image
          src={img}
          alt="logo"
          w="100px"
          objectFit="contain"
          _dark={{ backgroundColor: 'white' }}
        />
        <Button onClick={onOpen}>
          <RiMenu2Fill />
        </Button>
      </HStack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <HStack justifyContent={'space-between'}>
              <Image
                src={img}
                alt="logo"
                w="100px"
                objectFit="contain"
                _dark={{ backgroundColor: 'white' }}
              />
              <Button onClick={onClose}>
                <RiCloseLine />
              </Button>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <Box>
                <ButtonsLink url="/" title="Home" />
              </Box>
              <Box>
                <ButtonsLink url="/courses" title="Courses" />
              </Box>
              {/* <Box>
                <ButtonsLink url="/jobs" title="Find Jobs" />
              </Box> */}

              <Box>
                <CustomHoverMenuMobile
                  title={servicesMenu.title}
                  items={servicesMenu.items}
                  onClose={onClose}
                  onOpenChange={newState => setIsServicesOpen(newState)}
                />
              </Box>

              <Box>
                <ButtonsLink url="/aboutus" title="About Us" />
              </Box>
              <Box>
                <ButtonsLink url="/contact" title="Contact Us" />
              </Box>
              {isAuthenticated && (
                <Button onClick={logoutHandler} variant="outline">
                  Logout
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
