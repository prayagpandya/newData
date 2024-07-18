import {
  Box,
  Button,
  Container,
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
import { Link } from 'react-router-dom';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import introvideo from '../../assets/videos/intro.mp4';
import bgVid from '../../assets/videos/bg.mp4';
import { DiAws } from 'react-icons/di';
import {
  FcAssistant,
  FcBullish,
  FcCheckmark,
  FcCollaboration,
  FcEditImage,
  FcFaq,
  FcMultipleDevices,
  FcParallelTasks,
  FcPieChart,
  FcPositiveDynamic,
  FcReading,
} from 'react-icons/fc';
import { BiDesktop } from 'react-icons/bi';
import {
  IoIosPeople,
  IoMdDesktop,
  IoMdList,
  IoMdStar,
  IoMdStarOutline,
} from 'react-icons/io';
import About from '../../assets/images/About.jpg';
import { Course } from '../Courses/Courses';
import img from '../../assets/images/data.png';
import Blogs from './Blogs';
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
// import img8 from '../../assets/images/testimonialUsers/8.webp';
const imgs = [''];
const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/courses/get-all-courses`
        );
        setCourses(response.data.courses);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        "Transitioning from marketing, Data Skills Hub's comprehensive program equipped me for Data Science success. Their personalized approach and industry insights were invaluable in navigating this career shift",
      name: 'Dinesh',
      image: img1,
    },
    {
      id: 2,
      quote:
        'Coming from a QA background, transitioning to Data Science seemed daunting until I found Data Skills Hub. Their structured program and industry-focused curriculum empowered me to pursue my passion.',
      name: 'Priyanka',
      image: img2,
    },
    {
      id: 3,
      quote:
        " Data Skills Hub propelled my transition from sales to Data Science, providing expert guidance and practical training that secured my dream role. I'm grateful for their transformative support and dedication.",
      name: 'Neha',
      image: img3,
    },
    {
      id: 4,
      quote:
        'As a backend developer, Data Skills Hub provided me with the tools and knowledge to transition into Data Science. Their practical approach and supportive environment made the journey smooth and rewarding.',
      name: 'Nidhi',
      image: img4,
    },
    {
      id: 4,
      quote:
        'Data Skills Hub helped me transition from networking to Data Science seamlessly. Their program provided me with the skills and confidence to pursue new opportunities in this rapidly evolving field of study.',
      name: 'Nisha',
      image: img5,
    },
    {
      id: 6,
      quote:
        "Data Skills Hub facilitated my transition from backend development to Data Science with their comprehensive training and supportive environment. I'm grateful for their guidance in navigating this career transition.",
      name: 'Praneeta',
      image: img6,
    },
    {
      id: 7,
      quote:
        'Data Skills Hub enabled my transition to Data Science as a fresher, equipping me with essential skills and industry knowledge. Their program laid the foundation for my successful career journey.',
      name: 'Sakshatha',
      image: img7,
    },
  ];
  const groupedTestimonials = [];
  let itemsPerRow = 3; // Default for desktop

  // Determine number of items per row based on screen width
  if (window.innerWidth < 1024) {
    itemsPerRow = 2; // Tablet
  }
  if (window.innerWidth < 768 || window.innerWidth == 425) {
    itemsPerRow = 1; // Mobile
  }

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
                // fontFamily={'IBM Plex Sans'}
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

        <Box
          className="container2"
          // style={{
          //   paddingTop: ['100px', '100px', '90px', '190px', '180px'],
          //   paddingBottom: ['90px', '90px', '90px', '190px', '180px'],
          //   display: 'flex',
          //   flexDirection: 'column',
          //   alignItems: 'center',
          // }}
          width={'100%'}
          marginY={['35px', '35px', '35px', '180px', '-100px']}
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
        >
          <Heading
            mb={['0', '0', '0', '10', '16', '20']}
            textAlign={'center'}
            fontWeight={'400'}
            fontSize={['3xl', '5xl']}
            children={'OUR GOAL IS TO EMPOWER DREAMS ANDACHIEVE EXCELLENCE'}
          />
          <Stack
            direction={['column', 'column', 'column', 'column', 'row']}
            justifyContent={['center', 'center', 'center', 'flex-start']}
            alignItems={['center', 'center', 'center', 'self-start']}
            maxW={['620px', '1580px']}
            w={['full', 'full', 'full', 'full']}
            paddingX={['8', '10', '10', '20']}
            gap={'20'}
          >
            {' '}
            <VStack w={'100%'} h={'100%'} spacing={[5, 0]} align={'flex-start'}>
              <video
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
            </VStack>
            <VStack
              // justifyContent={'flex-start'}
              w={'100%'}
              // spacing={2}
              align={['flex-start']}
            >
              <Text
                opacity={0.5}
                fontSize={['lg', 'lg', 'xl']}
                // letterSpacing={'wide'}
                wordSpacing={'normal'}
                fontFamily={'Recursive'}
              >
                Welcome to Data Skills Hub, a leading provider of IT upskilling
                and staffing solutions. At Titans, we specialize in empowering
                individuals with the skills and knowledge needed to thrive in
                the ever-evolving IT landscape. Our comprehensive upskilling
                programs are designed to equip professionals with the latest
                industry insights, ensuring they remain at the forefront of
                technological advancements.
              </Text>
              <Text
                mt={6}
                opacity={0.5}
                fontSize={['lg', 'lg', 'xl']}
                // letterSpacing={'wide'}
                wordSpacing={'normal'}
                fontFamily={'Recursive'}
              >
                In addition to our upskilling initiatives, Data Skills Hub
                offers cutting-edge staffing solutions, connecting skilled
                individuals with opportunities at top-tier companies. We take
                pride in fostering career growth and facilitating strategic
                talent placement. Join us on a transformative journey, where IT
                excellence meets unparalleled staffing solutions.
              </Text>
            </VStack>
          </Stack>
        </Box>
        <Box
          maxW={['620px', '100vw']}
          minH={'90vh'}
          mx={'auto'}
          bg={'yellow.50'}
          py={['10', '10', '10', '10', '10']}
        >
          <Grid
            templateColumns={['1fr', '1fr', '1fr', '1fr']}
            px={['8', '8', '8', '20']}
            gap={['10', '10', '10', '20']}
          >
            <Box px={2}>
              <Heading
                // mt={'10'}
                textTransform={'uppercase'}
                fontWeight={400}
                fontFamily={'body'}
                fontSize={['3xl', '5xl']}
                color={'blackAlpha.800'}
                children={'Explore Our Services'}
              />
              <Text color={'black'} fontSize={'xl'} opacity={'0.5'} my={'5'}>
                Our company offers a comprehensive suite of services to meet all
                your IT needs. We provide top-notch staffing solutions,
                cutting-edge online courses, and expert web and mobile
                development. Additionally, we specialize in data science and
                quality assurance (QA) services to ensure your projects excel.
                Whether you're looking to enhance your team's capabilities or
                advance your own skills, we've got you covered.
              </Text>
            </Box>
            <Box
              display={'grid'}
              gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
              gridGap={['10', '10', '10', '20']}
              justifyContent={'center'}
              alignItems={'center'}
              justifyItems={'center'}
              alignContent={'center'}
            >
              <CardForCourseCatagories
                IconName={FcReading}
                Title={'Online Courses'}
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcAssistant}
                Title={'Staffing'}
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcMultipleDevices}
                Title={'Web/App Development'}
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcPositiveDynamic}
                Title={'Data Science'}
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcEditImage}
                Title={'UI/UX Design'}
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcFaq}
                Title={'QA'}
                linkOfCatagory={'/courses'}
              />
            </Box>
          </Grid>
        </Box>
        <Box padding={'8'} bg={'blackAlpha.800'}>
          <Heading
            textAlign={'center'}
            fontFamily={'body'}
            color={'yellow.500'}
          >
            Our Placement Partners
          </Heading>
          <HStack
            className="brandsBanner"
            justifyContent={'space-evenly'}
            mt={'4'}
          >
            <CgGoogle />
            <CgYoutube />
            <SiCoursera />
            <SiUdemy />
            <DiAws />
          </HStack>
        </Box>
        <Box
          maxW={['620px', '100vw']}
          minH={'90vh'}
          mx={'auto'}
          bg={'yellow.50'}
          py={['10', '10', '10', '10', '24']}
        >
          <Grid
            templateColumns={['1fr', '1fr', '1fr', '1fr']}
            px={['8', '8', '8', '20']}
            gap={['10', '10', '10', '10']}
          >
            <Box px={2}>
              <Heading
                textTransform={'uppercase'}
                my={'10'}
                fontWeight={400}
                fontFamily={'body'}
                fontSize={['3xl', '3xl', '3xl', '5xl']}
                color={'blackAlpha.800'}
                children={'Explore Our Courses'}
              />
              <Text color={'black'} fontSize={'xl'} opacity={'0.5'} my={'5'}>
                Welcome to Data Skills Hub! Our comprehensive course, designed
                to equip you with cutting-edge skills for
                real-world applications.
              </Text>
              <Text color={'black'} fontSize={'xl'} opacity={'0.5'} my={'5'}>
                Unlock career opportunities with our professional end-to-end
                service, dedicated to helping you secure your dream job through
                tailored support and expert guidance.
              </Text>
            </Box>
            <Box
              display={'grid'}
              gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
              gridGap={['10', '10', '10', '20']}
              justifyContent={'center'}
              alignItems={'center'}
              justifyItems={'center'}
              alignContent={'center'}
            >
              <CardForCourseCatagories
                IconName={FcBullish}
                Title={'Business/Data Analytics'}
                //
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcParallelTasks}
                Title={'Product Management with Gen AI'}
                //
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcMultipleDevices}
                Title={'Full Stack Web development'}
                //
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcPositiveDynamic}
                Title={'Data Science and GenAI'}
                //
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcCollaboration}
                Title={'Digital Marketing with AI'}
                //
                linkOfCatagory={'/courses'}
              />
              <CardForCourseCatagories
                IconName={FcEditImage}
                Title={'UI / UX Design'}
                //
                linkOfCatagory={'/courses'}
              />
            </Box>
          </Grid>
        </Box>
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
        <Box maxW={'container.xl'} w={'100%'} mt={'20'} mx={'auto'} pb={'20'}>
          <HStack
            justifyContent={['center', 'space-between']}
            alignItems={'center'}
            gap={'3'}
            mb={'20'}
          >
            <Heading
              children={'Our Popular Courses'}
              textAlign={['center', 'center', 'center', 'left']}
              fontWeight={'500'}
              fontSize={['3xl', '3xl', '3xl', '5xl']}
            />

            <Link to={'/courses'}>
              <Button colorScheme={'yellow'} variant={'solid'}>
                View All
              </Button>
            </Link>
          </HStack>
          <Stack
            direction={['column', 'column', 'row', 'row']}
            flexWrap={'wrap'}
            justifyContent={[
              'flex-start',
              'flex-start',
              'space-evenly',
              'space-evenly',
            ]}
            alignItems={['center', 'center', 'flex-start', 'flex-start']}
          >
            <Grid
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)',
              ]}
              gap="6"
            >
              {courses.map(course => (
                <Course
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  imagesrc={`${url}/public${course.photo}`}
                  creator={course.creator}
                  discription={course.briefDescription}
                  lecture={course.lessonsCount}
                  views={course.duration}
                />
              ))}
            </Grid>
          </Stack>
        </Box>
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

const CardForCourseCatagories = ({
  IconName,
  Title,
  Count,
  linkOfCatagory,
}) => (
  <Link to={linkOfCatagory} style={{ width: '100%' }}>
    <Box
      display={'flex'}
      bg={'white'}
      w={'100%'}
      minH={'200px'}
      p={'2'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'space-around'}
      boxShadow={'0px 0px 10px 2px rgba(181,181,181,1)'}
      rounded={'lg'}
      _hover={{
        bg: 'yellow.500',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <Icon
        bg={'yellow.100'}
        color={'yellow.400'}
        rounded={'full'}
        w={'80px'}
        p={'2'}
        h={'80px'}
      >
        <IconName size={'25px'} />
      </Icon>

      <Box textAlign={'center'}>
        <Heading
          className="hed"
          children={Title}
          fontWeight={'500'}
          fontSize={'3xl'}
          color={'black'}
          style={{ fontFamily: 'Fira Sans' }}
        />
        {Count > 0 && <Text color={'black'} children={`${Count} Courses`} />}
        {/* <Text color={'black'} children={`${Count} Courses`} /> */}
      </Box>
    </Box>
  </Link>
);
