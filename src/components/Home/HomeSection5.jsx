import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from '@chakra-ui/react';
import {
  FcBullish,
  FcParallelTasks,
  FcMultipleDevices,
  FcPositiveDynamic,
  FcCollaboration,
  FcEditImage,
} from 'react-icons/fc';
import img001 from '../../assets/images/001.avif';
import img002 from '../../assets/images/002.avif';
import img003 from '../../assets/images/003.avif';
import img004 from '../../assets/images/004.jpg';
import img005 from '../../assets/images/005.jpg';
import img006 from '../../assets/images/006.jpg';
import { CardForCourseCatagories } from './Home';

const HomeSection5 = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Mocking 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
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
          {loading ? (
            <>
              <SkeletonText noOfLines={1} skeletonHeight="40px" mt="10" />
              <SkeletonText noOfLines={4} skeletonHeight="20px" mt="5" />
              <SkeletonText noOfLines={2} skeletonHeight="20px" mt="5" />
            </>
          ) : (
            <>
              <Heading
                textTransform={'uppercase'}
                my={'10'}
                fontWeight={400}
                fontFamily={'body'}
                fontSize={['3xl', '3xl', '3xl', '5xl']}
                color={'blackAlpha.800'}
              >
                Explore Our Courses
              </Heading>
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
            </>
          )}
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
          {loading ? (
            Array(6)
              .fill('')
              .map((_, index) => (
                <Box key={index} width="200px" height="300px">
                  <SkeletonCircle size="16" mb="4" />
                  <SkeletonText noOfLines={2} spacing="4" />
                </Box>
              ))
          ) : (
            <>
              <CardForCourseCatagories
                IconName={FcBullish}
                Title={'Business/Data Analytics'}
                bgImg={img001}
                linkOfCatagory={'/courses'}
                paragraphText={'Business Analytics'}
              />
              <CardForCourseCatagories
                IconName={FcParallelTasks}
                Title={'Product Management with Gen AI'}
                bgImg={img002}
                linkOfCatagory={'/courses'}
                paragraphText={'Product Management'}
              />
              <CardForCourseCatagories
                IconName={FcMultipleDevices}
                Title={'Full Stack Web development'}
                bgImg={img003}
                linkOfCatagory={'/courses'}
                paragraphText={'Full Stack Web Development'}
              />
              <CardForCourseCatagories
                IconName={FcPositiveDynamic}
                Title={'Data Science and GenAI'}
                linkOfCatagory={'/courses'}
                bgImg={img004}
                paragraphText={'Data Science'}
              />
              <CardForCourseCatagories
                IconName={FcCollaboration}
                Title={'Digital Marketing with AI'}
                linkOfCatagory={'/courses'}
                bgImg={img005}
                paragraphText={'Digital Marketing'}
              />
              <CardForCourseCatagories
                paragraphText={'UI/UX Design'}
                IconName={FcEditImage}
                Title={'UI / UX Design'}
                linkOfCatagory={'/courses'}
                bgImg={img006}
              />
            </>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default HomeSection5;
