import React, { useState, useEffect } from 'react';
import { Box, Skeleton, Stack, VStack, Heading, Text } from '@chakra-ui/react';
import introvideo from '../../assets/videos/intro.mp4';
const Section2 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a fetch call
    setTimeout(() => {
      setLoading(false); // Set to false after data has been "loaded"
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          className="container2"
          width={'100%'}
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          mt={['2rem', '2rem', '2rem', '18rem', '2rem']}
          mb={['2rem', '2rem', '2rem', '18rem', '2rem']}
        >
          <Skeleton
            height="40px"
            width={['200px', '300px']}
            my={['2', '2', '2', '16', '20']}
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
            <VStack w={'100%'} h={'100%'} spacing={[5, 0]} align={'flex-start'}>
              <Skeleton height="200px" width="100%" />
            </VStack>

            <VStack w={'100%'} mb={10} align={'flex-start'}>
              <Skeleton count={6} height="20px" width="100%" />
              <Skeleton count={6} height="20px" width="100%" mt="20px" />
            </VStack>
          </Stack>
        </Box>
      ) : (
        <Box
          className="container2"
          width={'100%'}
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          mt={['2rem', '2rem', '2rem', '18rem', '2rem']}
          mb={['2rem', '2rem', '2rem', '18rem', '2rem']}
        >
          <Heading
            my={['2', '2', '2', '16', '20']}
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
              mb={10}
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
                and staffing solutions. At Data Skills Hub, we specialize in empowering
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
      )}
    </>
  );
};

export default Section2;
