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
  IconButton,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  UnorderedList,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import img from '../../../assets/images/1.png';
import { Link, useLocation } from 'react-router-dom';
import {
  RiCloseLine,
  RiDashboardFill,
  RiLogoutBoxLine,
  RiMenu2Fill,
} from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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
                Services
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
  const [isServicesOpen, setIsServicesOpen] = useState(false); // State to track services menu
  const location = useLocation();
  let isAuthenticated = false;
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

  const servicesMenu = {
    title: 'Services',
    items: [
      { name: 'Data Science', url: '/services/dataScience' },
      { name: 'QA', url: '/services/QA' },
      { name: 'Web Development', url: '/services/webDevelopement' },
      { name: 'App Development', url: '/services/appDevelopement' },
      { name: 'Digital Marketing', url: '/services/DigitalMarketing' },
      { name: 'UI/UX', url: '/services/UI/UX' },
      { name: 'Staffing', url: '/services/staffing' },
      { name: 'Courses', url: '/services/courses' },
      { name: 'Online Learning Platform', url: '/services/Lms' },
    ],
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
        _dark={
          hover
            ? { backgroundColor: 'rgb(5,6,9)' }
            : { backgroundColor: 'transparent' }
        }
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
            <CustomHoverMenu
              title={servicesMenu.title}
              items={servicesMenu.items}
            />
          </Box> */}
          <Box onClick={onClose}>
            <ButtonsLink url="/aboutus" title="About Us" />
          </Box>
          <Box onClick={onClose}>
            <ButtonsLink url="/contact" title="Contact Us" />
          </Box>
        </HStack>

        <HStack pos="absolute" right={10}>
          {isAuthenticated ? (
            <>
              <Link to={`/profile/${sessionStorage.getItem('userId')}`}>
                <IconButton
                  mr="12px"
                  rounded="full"
                  colorScheme="yellow"
                  variant="outline"
                >
                  <FaUser />
                </IconButton>
              </Link>
              <Link to="/logout"></Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button colorScheme="yellow" variant="outline" mr="20px">
                  Login
                </Button>
              </Link>
            </>
          )}
        </HStack>
        <ColorModeSwitcher />
      </HStack>

      <HStack
        display={{ base: 'flex', lg: 'none' }}
        w="80%"
        justifyContent="space-between"
      >
        <Button
          colorScheme="yellow"
          w="12"
          h="12"
          rounded="full"
          position="fixed"
          top="2"
          left="2"
          onClick={onOpen}
          zIndex={100}
        >
          <RiMenu2Fill />
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay backdropFilter="blur(6px)" />
          <DrawerContent w="sm">
            <DrawerHeader
              borderBottom="1px"
              mt="-4"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb="-2"
            >
              <Image
                src={img}
                alt="logo"
                w="120px"
                objectFit="contain"
                _dark={{ backgroundColor: 'white' }}
              />
              <Button
                colorScheme="yellow"
                w="12"
                h="12"
                rounded="full"
                onClick={onClose}
              >
                <RiCloseLine />
              </Button>
            </DrawerHeader>
            <DrawerBody>
              <VStack alignItems="flex-start" spacing="4">
                <Button bg="transparent" onClick={onClose}>
                  <ButtonsLink url="/" title="Home" />
                </Button>
                <Button bg="transparent" onClick={onClose}>
                  <ButtonsLink url="/courses" title="Courses" />
                </Button>
                {/* <Box w="full">
                  <CustomHoverMenuMobile
                    role={'group'}
                    onClose={onClose}
                    onOpenChange={setIsServicesOpen} // Track open state
                    title={servicesMenu.title}
                    items={servicesMenu.items}
                  />
                </Box> */}
                <Button bg="transparent" onClick={onClose}>
                  <ButtonsLink url="/aboutus" title="About Us" />
                </Button>
                <Button bg="transparent" onClick={onClose}>
                  <ButtonsLink url="/contact" title="Contact Us" />
                </Button>
                <HStack
                  justifyContent="space-evenly"
                  width="80%"
                  pos={isServicesOpen ? 'relative' : 'absolute'} // Change position based on state
                  bottom={isServicesOpen ? '0' : '2rem'}
                  _groupFocus={{ pos: 'relative', bottom: '2rem' }}
                >
                  {isAuthenticated ? (
                    <VStack>
                      <HStack>
                        <Link
                          to={`/profile/${sessionStorage.getItem('userId')}`}
                        >
                          <Button
                            variant="ghost"
                            colorScheme="yellow"
                            onClick={onClose}
                          >
                            Profile
                          </Button>
                        </Link>
                        <Button
                          onClick={logoutHandler}
                          variant="ghost"
                          colorScheme="red"
                        >
                          <RiLogoutBoxLine /> Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard">
                          <Button
                            colorScheme="purple"
                            display="flex"
                            gap={2}
                            variant="outline"
                          >
                            <RiDashboardFill /> Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button colorScheme="yellow">Login</Button>
                      </Link>
                      <p>OR</p>
                      <Link to="/signup">
                        <Button colorScheme="yellow">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <ColorModeSwitcher
          backgroundColor="yellow.400"
          rounded="full"
          w="12"
          h="12"
          position="fixed"
          zIndex={100}
          top="2"
          right="2"
        />
      </HStack>
    </>
  );
};

export default Header;
