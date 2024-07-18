import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import img from '../../../assets/images/1.png';
import {
  TiSocialInstagramCircular,
  TiSocialYoutubeCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { IoMdMail } from 'react-icons/io';
const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
      <Stack
        direction={['column', 'row']}
        spacing={'4'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
      >
        <HStack w={'full'} alignItems={['center', 'flex-start']}>
          <Image
            src={img}
            w={'40'}
            objectFit={'contain'}
            backgroundColor={'white'}
          />
          <VStack spacing={'2'} alignItems={'flex-start'}>
            <Text fontSize={'md'} color={'white'}>
              {' '}
              <Icon boxSize={'28px'} p={'1'}>
                <AiOutlineWhatsApp fontSize={'20px'} color="green" />
              </Icon>
              +91 79904 33809
            </Text>
            <Text fontSize={'md'} color={'white'}>
              <Icon boxSize={'28px'} p={'1'}>
                <IoMdMail fontSize={'20px'} />
              </Icon>
              support@dataskillshub.com
            </Text>
          </VStack>
        </HStack>
        <Stack
          flexDirection={['column', 'column', 'column', 'row', 'row']}
          w={'full'}
          color={'white'}
          justifyContent={'space-evenly'}
          alignItems={['center', 'center', 'center', 'center', 'flex-start']}
        >
          <Link to={'/'}>
            <Button variant={'ghost'} colorScheme={'yellow'}>
              Home
            </Button>
          </Link>
          <Link to={'/courses'}>
            <Button variant={'ghost'} colorScheme={'yellow'}>
              Courses
            </Button>
          </Link>
          {/* <Link to={'/services'}>
            <Button variant={'ghost'} colorScheme={'yellow'}>
              Services
            </Button>
          </Link> */}
          <Link to={'/aboutus'}>
            <Button variant={'ghost'} colorScheme={'yellow'}>
              About Us
            </Button>
          </Link>
          <Link to={'/contact'}>
            <Button variant={'ghost'} colorScheme={'yellow'}>
              Contact Us
            </Button>
          </Link>
        </Stack>
        <HStack
          w={'full'}
          spacing={['2', '10']}
          justifyContent={'center'}
          color={'white'}
          fontSize={'50'}
        >
          <a href="https://youtube.com" target={'_blank'} rel="noreferrer">
            <TiSocialYoutubeCircular />
          </a>
          <a
            href="https://www.instagram.com/dataskillshub/ "
            target={'_blank'}
            rel="noreferrer"
          >
            <TiSocialInstagramCircular />
          </a>
          <a href="https://www.github.com/ " target={'_blank'} rel="noreferrer">
            <DiGithub />
          </a>
        </HStack>
      </Stack>
      <HStack spacing={'4'} w={'full'} justifyContent={'center'}>
        <Heading children="All Rights Reserved" size={'sm'} color={'white'} />
        <Heading
          children="@Data Skills Hub"
          color={'yellow.400'}
          size={'sm'}
          fontFamily={'body'}
        />
      </HStack>
    </Box>
  );
};

export default Footer;
