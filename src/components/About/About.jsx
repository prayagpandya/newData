import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import video from '../../assets/videos/intro.mp4';
import './About.css';
import { RiSecurePaymentFill } from 'react-icons/ri';
import TermsAndConditions from '../../assets/docs/TermsAndCondition';
import img1 from '../../assets/images/aboutimg.jpg';
const Founder = () => {
  return (
    <Stack spacing={['4', '16']} p={['1', '8']} direction={['column', 'row']}>
      <VStack>
        <Avatar boxSize={['40', '48']} src={img1} />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading children="Prayagraj Pandya" size={['md', 'xl']} />
        <Text
          textAlign={['justify', 'left']}
          children={`
                As a dedicated Data Analyst and educator, our mission is to deliver high-quality content and resources at affordable prices. We strive to make valuable information and educational materials accessible to all, ensuring that everyone can benefit from top-notch learning opportunities without financial barriers. Through our commitment to excellence and affordability, we aim to empower individuals with the knowledge and skills they need to succeed.`}
        />
      </VStack>
    </Stack>
  );
};

const VideoPlayer = () => {
  return (
    <Box>
      <video
        autoPlay={true}
        controls
        loop
        muted
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        src={video}
        className="hidden-controls"
      ></video>
    </Box>
  );
};

const TandC = () => {
  return (
    <Box mt={'8'}>
      <Heading
        children="Terms and Conditions"
        size={'lg'}
        textAlign={['center', 'left']}
      />
      <Box h={'sm'} p={'4'} overflowY={'scroll'}>
        <TermsAndConditions />
        <Heading size={'xs'} my={'4'} children="We Have NoRefund Policy" />
      </Box>
    </Box>
  );
};

const About = () => {
  return (
    <Container
      maxW={'container.lg'}
      padding={['8', '16']}
      boxShadow={'0 0 10px 6px #c1c1c1'}
    >
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      {/* <Heading children="Our Vision" size={'md'} textAlign={'center'} /> */}
      <Stack
        pt={['8', '0']}
        m={['0', '8']}
        direction={['column', 'row']}
        alignItems={'center'}
      >
        <Text
          fontFamily={'Recursive'}
          opacity={0.7}
          pt={['4', '0']}
          m={['0', '8']}
          fontSize={['15', '16']}
          textAlign={['justify', 'left']}
        >
          Data Skills Hub offers top-quality, practical IT courses in Data
          Analytics, Data Science, and Business Analysis. Designed by industry
          experts, our affordable, accessible education equips students with the
          skills needed for exceptional job opportunities and career success.
        </Text>
        <Link to={'/courses'}>
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Courses
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC />
      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          children="100% SECURE PAYMENT BY PHONE-PE"
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
        />
      </HStack>
    </Container>
  );
};

export default About;
