import React from 'react';
import {
  Container,
  HStack,
  VStack,
  Box,
  Text,
  Input,
  FormLabel,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import data from './Servicedata.json';

const ServicesCard = () => {
  const { serviceName } = useParams();
  const serviceData = data.services.find(
    service =>
      service[Object.keys(service)[0]].title.toLowerCase() ===
      serviceName.toLowerCase()
  );

  if (!serviceData) {
    return (
      <Container minH={'100vh'} maxW={'container.xl'}>
        <Text>Service not found</Text>
      </Container>
    );
  }

  const serviceKey = Object.keys(serviceData)[0];
  const { title, heroDescription, imgForHero } = serviceData[serviceKey];

  return (
    <Container minH={'100vh'} maxW={'100vw'} boxSizing="border-box" m={0} p={0}>
      <Box
        bgImage={`url(${imgForHero})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        position={'relative'} // Changed from 'absolute' to 'relative'
        w="100%"
        minH="70vh"
        color="white"
        d="flex"
        zIndex={1} // Changed zIndex from -2 to 1
        alignItems="center"
        justifyContent="center"
        p={10}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          h={'70vh'}
          zIndex={0}
          right={0}
          bottom={0}
          backgroundColor="rgba(0, 0, 0, 0.65)" // Adjust opacity as needed
        ></Box>
        <HStack
          maxW={'container.xl'}
          h={'60vh'}
          zIndex={1}
          mx={'auto'}
          justifyContent={'center'}
        >
          <VStack w={'full'} zIndex={1} spacing={5} p={5} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">
              {title}
            </Text>
            <Text>{heroDescription}</Text>
          </VStack>
          <VStack
            w={'50%'}
            spacing={5}
            p={5}
            zIndex={1}
            borderRadius="md"
            bg={'rgba(251,251,251,0.4)'}
            backdropFilter={'blur(10px)'}
            _dark={{ backgroundColor: 'rgba(251,251,251,0.2)' }}
          >
            <form>
              <Box gap={'4'}>
                <HStack justifyContent={'space-between'} my={'2'}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    minW={'300px'}
                    maxW={'300px'}
                    type="text"
                    _dark={{ backgroundColor: 'gray', color: 'white' }}
                    bg={'yellow.50'}
                    color={'black'}
                    zIndex={1}
                    placeholder="Enter Your Name"
                  />
                </HStack>
                <HStack justifyContent={'space-between'} my={'2'}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    minW={'300px'}
                    maxW={'300px'}
                    type="email"
                    _dark={{ backgroundColor: 'gray', color: 'white' }}
                    bg={'yellow.50'}
                    color={'black'}
                    zIndex={1}
                    placeholder="Enter Your Name"
                  />
                </HStack>
                <HStack justifyContent={'space-between'} my={'2'}>
                  <FormLabel>Number</FormLabel>
                  <Input
                    minW={'300px'}
                    maxW={'300px'}
                    type="number"
                    _dark={{ backgroundColor: 'gray', color: 'white' }}
                    bg={'yellow.50'}
                    color={'black'}
                    zIndex={1}
                    placeholder="Enter Your Name"
                  />
                </HStack>
              </Box>
            </form>
          </VStack>
        </HStack>
      </Box>
    </Container>
  );
};

export default ServicesCard;
