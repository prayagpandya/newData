import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  HStack,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';

const HomeSection4 = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Mocking 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box padding={'8'} bg={'blackAlpha.800'}>
      {loading ? (
        <>
          <SkeletonText
            mt={4}
            noOfLines={1}
            spacing={4}
            skeletonHeight="20px"
            width="200px"
            mx="auto"
          />
          <HStack justifyContent={'space-evenly'} mt={'4'}>
            {Array(5)
              .fill('')
              .map((_, index) => (
                <SkeletonCircle key={index} size="12" />
              ))}
          </HStack>
        </>
      ) : (
        <>
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
            <CgGoogle size={40} color={'white'} />
            <CgYoutube size={40} color={'white'} />
            <SiCoursera size={40} color={'white'} />
            <SiUdemy size={40} color={'white'} />
            <DiAws size={40} color={'white'} />
          </HStack>
        </>
      )}
    </Box>
  );
};

export default HomeSection4;
