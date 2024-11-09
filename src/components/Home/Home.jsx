/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';

import bgVid from '../../assets/videos/bg.mp4';

import { IoIosPeople, IoMdDesktop } from 'react-icons/io';
import About from '../../assets/images/About.jpg';
import introvideo from '../../assets/videos/intro.mp4';

import blogData from '../../assets/docs/Blogs.json';
import BlogsCard from './Blogs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../../assets/images/testimonialUsers/1.webp';
import img2 from '../../assets/images/testimonialUsers/2.webp';
import img3 from '../../assets/images/testimonialUsers/3.webp';
import img4 from '../../assets/images/testimonialUsers/4.webp';
import img5 from '../../assets/images/testimonialUsers/5.webp';
import img6 from '../../assets/images/testimonialUsers/6.webp';
import img7 from '../../assets/images/testimonialUsers/7.webp';
import axios from 'axios';
import { url } from '../../url';

import HowWorksCard from '../Cards/HowWorksCard';
import Section2 from './HomeSection2';
import HomeSection3 from './HomeSection3';
import HomeSection4 from './HomeSection4';
import HomeSection5 from './HomeSection5';
import PopularCourses from './HomeSection9';
const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerRow, setItemsPerRow] = useState(3);

  // Fetch courses data on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/courses/get-all-courses`
        );
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerRow(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerRow(2);
      } else {
        setItemsPerRow(3);
      }
    };

    // Initial check and event listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        "Transitioning from marketing, Data Skills Hub's program equipped me for Data Science success.",
      name: 'Dinesh',
      image: img1,
    },
    {
      id: 2,
      quote:
        'Coming from a QA background, transitioning to Data Science was made easier with Data Skills Hub.',
      name: 'Priyanka',
      image: img2,
    },
    {
      id: 3,
      quote:
        'Data Skills Hub propelled my transition from sales to Data Science, providing expert guidance.',
      name: 'Neha',
      image: img3,
    },
    {
      id: 4,
      quote:
        'As a backend developer, Data Skills Hub helped me transition to Data Science.',
      name: 'Nidhi',
      image: img4,
    },
    {
      id: 5,
      quote:
        'Seamless transition from networking to Data Science with Data Skills Hub.',
      name: 'Nisha',
      image: img5,
    },
    {
      id: 6,
      quote:
        'Backend development to Data Science was made possible by Data Skills Hub.',
      name: 'Praneeta',
      image: img6,
    },
    {
      id: 7,
      quote:
        'Data Skills Hub enabled my transition to Data Science as a fresher, providing the skills for my career journey.',
      name: 'Sakshatha',
      image: img7,
    },
  ];

  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += itemsPerRow) {
    groupedTestimonials.push(testimonials.slice(i, i + itemsPerRow));
  }

  return (
    <>
      <div className="backgroundVideoContainer">
        <video
          autoPlay
          muted
          loop
          src={bgVid}
          className="backgroundVideo hidden-controls screen1"
        ></video>

        <div className="backgroundVideoOverlay"></div>
      </div>
      <section className="home" style={{ overflowX: 'hidden' }}>
        {/* section 1 */}
        <div className="container">
          <Stack
            direction={['column', 'column', 'row']}
            w={'full'}
            height={['100%', '80%']}
            justifyContent={['center', 'center', 'flex-end']}
            alignItems={['center', 'self-end']}
            spacing={['16', '16', '5', '56']}
          >
            <VStack
              pt={[10, 10, 10, 0]}
              w={'full'}
              justifyContent={['flex-end']}
              align={['flex-start']}
              gap={6}
            >
              <Heading
                size={['2xl', '2xl', '2xl', '4xl']}
                color={'white'}
                fontWeight={600}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                gap={10}
              >
                <Text>Your Dream job Awaits:</Text>
                <Text mt={4}>Let's Make It Happen</Text>
              </Heading>
              <Text
                maxW={'600px'}
                fontFamily={'Recursive'}
                fontSize={'lg'}
                color={'white'}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Discover new skills outside the classroom, with guidance from
                India's most accomplished industry mentors.
              </Text>
              <Link to={'/courses'}>
                <Button
                  size={'lg'}
                  mr={['35vw', '0']}
                  colorScheme="yellow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  Explore Now
                </Button>
              </Link>
            </VStack>
          </Stack>
        </div>
        {/* //section 2 */}
        <Section2 />
        {/* //section 3 */}
        <HomeSection3 />

        {/* section 4 */}
        <HomeSection4 />
        {/* section 5 */}
        <HomeSection5 />
        <Stack
          bg={'blackAlpha.800'}
          spacing={['10', '10', '10', '20']}
          justifyContent={'space-evenly'}
          direction={['column', 'column', 'column', 'row']}
          p={['10', '10', '10', '20']}
        >
          <VStack
            justifyContent={'flex-start'}
            w={'100%'}
            fontFamily={'body'}
            color={'white'}
            spacing={'10'}
          >
            <Heading
              children={'Why Choose Us?'}
              textAlign={'left'}
              w={'100%'}
              fontFamily={'body'}
              color={'white'}
              fontWeight={'400'}
              fontSize={['3xl', '3xl', '3xl', '5xl']}
            />
            <HStack align={'center'} spacing={'10'}>
              <IoIosPeople size={'60px'} fontWeight={'medium'} />
              <VStack align={'flex-start'}>
                <Heading
                  fontWeight={'400'}
                  fontSize={['xl', 'xl', 'xl', '3xl']}
                  children={'Highly Experienced'}
                />
                <Text
                  fontSize={['md', 'md', 'md', 'xl']}
                  children={
                    'At the heart of our online learning community stands a dedicated and inspiring teachers'
                  }
                />
              </VStack>
            </HStack>
            <HStack align={'center'} spacing={'10'}>
              <IoMdDesktop size={'60px'} fontWeight={'medium'} />
              <VStack align={'flex-start'}>
                <Heading
                  fontWeight={'400'}
                  fontSize={['xl', 'xl', 'xl', '3xl']}
                  children={'Question, Quiz & Course'}
                />
                <Text
                  fontSize={['md', 'md', 'md', 'xl']}
                  children={
                    'Elevate your skills, broaden your horizons, and embrace the transformative power'
                  }
                />
              </VStack>
            </HStack>
            <HStack align={'center'} spacing={'10'}>
              <IoIosPeople size={'60px'} fontWeight={'medium'} />
              <VStack align={'flex-start'}>
                <Heading
                  fontWeight={'400'}
                  fontSize={['xl', 'xl', 'xl', '3xl']}
                  children={'Dedicated Support'}
                />
                <Text
                  fontSize={['md', 'md', 'md', 'xl']}
                  children={
                    'Our support elevate your skills, broaden your horizons, and embrace the transformative power.'
                  }
                />
              </VStack>
            </HStack>

            <Link to={'/aboutus'} style={{ width: '100%' }}>
              <Button colorScheme="yellow" variant={'solid'}>
                About Us
              </Button>
            </Link>
          </VStack>
          <VStack align={'center'} w={'100%'}>
            <Image src={About} rounded={'lg'} maxH={'600px'} />
          </VStack>
        </Stack>
        <Stack
          w={'full'}
          direction={['column', 'column', 'row', 'row']}
          bg={'yellow.500'}
          spacing={5}
          py={'8'}
        >
          <Stack
            justifyContent={'space-between'}
            flexDirection={['column', 'column', 'row', 'row']}
            alignItems={'center'}
            w={'full'}
            px={['2', '44']}
            py={6}
            spacing={'10'}
          >
            <Text fontWeight={'500'} fontSize={['3xl', '44px']} color={'white'}>
              Affordable Online Courses & <br /> Learning Opportunities For You
            </Text>
            <Link to={'/courses'}>
              <Button color={'black'} bg={'white'} variant={'solid'} px={'12'}>
                Start Learn Today
              </Button>
            </Link>
          </Stack>
        </Stack>
        <HowWorksCard />
        <PopularCourses />
        <Heading
          textAlign={'center'}
          fontWeight={'500'}
          fontSize={['3xl', '3xl', '3xl', '5xl']}
          children={'What Peoples Say About Us ?'}
          py={'10'}
        />
        <Box w={'100%'} h={['100%', '80vh']} pb={'20'}>
          <video
            style={{ height: '100%', width: '100%', borderRadius: '10px' }}
            autoPlay
            loop
            muted
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={introvideo}
            className="hidden-controls"
          ></video>
        </Box>
        {/* <Heading
          textAlign={'center'}
          fontWeight={'500'}
          fontSize={['3xl', '3xl', '3xl', '5xl']}
          children={'Testimonials'}
          py={'10'}
        /> */}
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={6100}
        >
          {groupedTestimonials.map((group, index) => (
            <Grid
              mx={'auto'}
              maxW={'container.xl'}
              key={index}
              templateRows={['1fr', '1fr', '1fr', '1fr', '1fr']}
              templateColumns={['1fr', '1fr', '1fr 1fr ', '1fr 1fr 1fr']}
              gap={4}
            >
              {group.map(testimonial => (
                <GridItem key={testimonial.id}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    // alignItems="center"
                    // textAlign="center"
                    p={5}
                  >
                    <HStack>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        rounded="full"
                        maxW="80px"
                        borderRadius="full"
                        boxShadow="2xl"
                        // boxSize="10px"
                        objectFit="cover"
                        mb={4}
                      />
                      <VStack justifyContent={'left'} alignItems={'flex-start'}>
                        <Text
                          fontSize="lg"
                          float={'left'}
                          textAlign={'left'}
                          color="gray.600"
                        >
                          {testimonial.name}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text
                      fontSize="xl"
                      textAlign={'left'}
                      // fontWeight="bold"
                      mb={2}
                    >
                      {testimonial.quote}
                    </Text>
                    <Text fontSize="sm" textAlign={'left'} color="gray.500">
                      {testimonial.position}
                    </Text>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          ))}
        </Carousel>
        <BlogsCardData />
      </section>
    </>
  );
};

export default Home;

export const BlogsCardData = () => {
  // Extract the blogs array from the imported blogData object
  const blogs = blogData.blogs;

  // Check if blogs is an array
  if (!Array.isArray(blogs)) {
    console.error('blogs is not an array');
    return null;
  }

  // Get the first three blogs
  const firstThreeBlogs = blogs.slice(0, 3);

  return (
    <Stack
      mt={20}
      direction="column"
      mx="auto"
      maxW="container.xl"
      justifyContent="center"
      alignItems="center"
      spacing={5}
      px={4} // Add padding for smaller screens
    >
      <HStack
        justifyContent="space-between"
        w="100%"
        maxW="container.xl"
        flexWrap="wrap"
        // px={} // Add padding for smaller screens
        spacing={4} // Add spacing between items
      >
        <Text fontWeight="500" fontSize={['3xl', '5xl']}>
          Popular Blogs
        </Text>
        {blogs.length > 3 && (
          <Link to="/blogs">
            <Button colorScheme="yellow" variant="outline">
              View More
            </Button>
          </Link>
        )}
      </HStack>
      <HStack
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap" // Ensure items wrap on smaller screens
        spacing={4} // Add spacing between cards
      >
        {firstThreeBlogs.map(blog => (
          <BlogsCard
            key={blog.id}
            img={blog.imgForCard}
            title={blog.title}
            date={blog.date}
            description={blog.blogCardDescription}
            id={blog.id}
          />
        ))}
      </HStack>
    </Stack>
  );
};

const MotionBox = motion(Box);

export const CardForCourseCatagories = ({
  bgImg,
  IconName,
  Title,
  paragraphText,
  linkOfCatagory,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to:', linkOfCatagory); // Debugging line
    navigate(linkOfCatagory);
  };

  return (
    <Box
      position="relative"
      bgImage={`url(${bgImg})`}
      bgSize="cover"
      bgPosition="center"
      width="100%"
      height="300px"
      borderRadius="lg"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor="pointer"
    >
      {/* Sub Card */}
      <Box
        position="absolute"
        bottom="0px"
        left="50%"
        transform="translateX(-50%)"
        bg="rgba(255, 255, 255, 0.2)"
        boxShadow="0px 0px 10px 2px rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(10px)"
        textTransform="uppercase"
        letterSpacing="2px"
        fontWeight="400"
        color="white"
        borderTopRadius="lg"
        padding="4"
        textAlign="center"
        width={['17rem', '17rem', '10rem', '12rem', '15rem', '20rem']}
        height="100px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        zIndex={2}
      >
        <Icon as={IconName} boxSize={8} color="yellow.400" />
        <Heading
          fontSize="lg"
          mt="2"
          textShadow="0px 0px 10px rgba(0, 0, 0, 1)"
        >
          {Title}
        </Heading>
      </Box>

      {/* Hover Div */}
      <MotionBox
        position="absolute"
        bottom={isHovered ? '0' : '-50rem'}
        left="0"
        width="100%"
        height={['8rem']}
        bg="rgba(255, 255, 255, 0.3)"
        backdropFilter="blur(10px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="4"
        zIndex={8}
        initial={{ y: '100%' }}
        animate={isHovered ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.5 }}
      >
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Text
            color="white"
            fontWeight="bold"
            textShadow="0px 0px 10px rgba(0, 0, 0, 1)"
            fontSize="2rem"
            textAlign="center"
          >
            {paragraphText}
          </Text>
          <Button
            variant="ghost"
            color={'white'}
            fontSize={'1.1rem'}
            textShadow={'0px 0px 10px rgba(0, 0, 0, 1)'}
            mt="4"
            size="sm"
            onClick={handleClick}
          >
            Learn More
          </Button>
        </Flex>
      </MotionBox>
    </Box>
  );
};
