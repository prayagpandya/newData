import {
  Box,
  Grid,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  FcAssistant,
  FcEditImage,
  FcFaq,
  FcMultipleDevices,
  FcPositiveDynamic,
  FcReading,
} from 'react-icons/fc';
import img01 from '../../assets/images/01.jpg';
import img02 from '../../assets/images/02.jpg';
import img03 from '../../assets/images/03.jpg';
import img04 from '../../assets/images/04.jpg';
import img05 from '../../assets/images/05.jpg';
import img06 from '../../assets/images/06.jpg';
import { CardForCourseCatagories } from './Home';

const HomeSection3 = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Mocking 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        maxW={['620px', '100vw']}
        minH={'90vh'}
        mx={'auto'}
        bg={'yellow.50'}
        mt={['1rem', '1rem', '1rem', '6rem', '1rem']}
        py={['10', '10', '10', '10', '10']}
      >
        {loading ? (
          <Grid
            templateColumns={['1fr', '1fr', '1fr', '1fr']}
            px={['8', '8', '8', '20']}
            gap={['10', '10', '10', '20']}
          >
            <Box px={2}>
              <Skeleton height="50px" width={['200px', '400px']} mb={4} />
              <SkeletonText
                mt={4}
                noOfLines={4}
                spacing={4}
                skeletonHeight={4}
              />
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
              <Stack spacing={4} width="100%" height="250px">
                <Skeleton height="200px" width="100%" />
                <Skeleton height="20px" width="60%" />
              </Stack>
              <Stack spacing={4} width="100%" height="250px">
                <Skeleton height="200px" width="100%" />
                <Skeleton height="20px" width="60%" />
              </Stack>
              <Stack spacing={4} width="100%" height="250px">
                <Skeleton height="200px" width="100%" />
                <Skeleton height="20px" width="60%" />
              </Stack>
              <Stack spacing={4} width="100%" height="250px">
                <Skeleton height="200px" width="100%" />
                <Skeleton height="20px" width="60%" />
              </Stack>
              <Stack spacing={4} width="100%" height="250px">
                <Skeleton height="200px" width="100%" />
                <Skeleton height="20px" width="60%" />
              </Stack>
              <Stack spacing={4} width="100%" height="250px">
                <Skeleton height="200px" width="100%" />
                <Skeleton height="20px" width="60%" />
              </Stack>
            </Box>
          </Grid>
        ) : (
          <Grid
            templateColumns={['1fr', '1fr', '1fr', '1fr']}
            px={['8', '8', '8', '20']}
            gap={['10', '10', '10', '20']}
          >
            <Box px={2}>
              <Heading
                textTransform={'uppercase'}
                fontWeight={400}
                fontFamily={'body'}
                fontSize={['3xl', '5xl']}
                color={'blackAlpha.800'}
              >
                Explore Our Services
              </Heading>
              <Text color={'black'} fontSize={'xl'} opacity={'0.5'} my={'5'}>
                Our company offers a comprehensive suite of services to meet all
                your IT needs. We provide top-notch staffing solutions,
                cutting-edge online courses, and expert web and mobile
                development. Additionally, we specialize in data science and
                quality assurance (QA) services to ensure your projects excel.
                Whether you're looking to enhance your team's capabilities or
                advance your own skills, we've got you covered.
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
                paragraphText={'Online Courses'}
                IconName={FcReading}
                Title={'Online Courses'}
                linkOfCatagory={'/services/0'}
                bgImg={img01}
              />
              <CardForCourseCatagories
                paragraphText={'Staffing'}
                IconName={FcAssistant}
                Title={'Staffing'}
                linkOfCatagory={'/services/1'}
                bgImg={img02}
              />
              <CardForCourseCatagories
                IconName={FcMultipleDevices}
                Title={'Web/App Development'}
                linkOfCatagory={'/services/2'}
                bgImg={img03}
                paragraphText={'Web/App Development'}
              />
              <CardForCourseCatagories
                IconName={FcPositiveDynamic}
                Title={'Data Science'}
                linkOfCatagory={'/services/3'}
                bgImg={img04}
                paragraphText={'Data Science'}
              />
              <CardForCourseCatagories
                IconName={FcEditImage}
                Title={'UI/UX Design'}
                linkOfCatagory={'/services/4'}
                bgImg={img05}
                paragraphText={'UI/UX Design'}
              />
              <CardForCourseCatagories
                IconName={FcFaq}
                Title={'QA'}
                linkOfCatagory={'/services/5'}
                bgImg={img06}
                paragraphText={'QA'}
              />
            </Box>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default HomeSection3;
