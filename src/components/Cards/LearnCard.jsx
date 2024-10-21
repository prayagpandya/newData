import { Box, Image, Stack, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import usa from '../../assets/images/us.avif';
import canada from '../../assets/images/canada.avif'; // Ensure this image path is correct

const LearnCard = () => {
  return (
    <Stack
      my={'8'}
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
        px={['2', '12']}
        py={4}
        spacing={'10'}
      >
        <Text fontWeight={'500'} fontSize={['2xl', '6xl']} color={'white'}>
          Land Your Dream Job <br /> in Just 45 to 60 Days!
        </Text>
        <Stack
          direction={['column', 'column', 'row', 'row']}
          spacing={5}
          w={['full', 'full', '40%']}
        >
          {/* USA Flag */}
          <Flex direction="column" alignItems="center" w={'full'}>
            <Box
              w={['100px', '120px', '150px']} // Adjust size for different screen sizes
              h={['100px', '120px', '150px']}
              bg={'white'}
              borderRadius={'full'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden" // Ensure the image is contained within the circle
            >
              <Image
                src={usa}
                alt="USA Flag"
                objectFit="cover"
                boxSize={['100%', '100%', '100%']} // Ensure full coverage
              />
            </Box>
            <Text
              textAlign={'center'}
              fontSize={['lg', 'xl']}
              fontWeight={'bold'}
              color={'white'} // Change color as needed
              textTransform="uppercase" // Make text uppercase
              letterSpacing={1} // Add spacing between letters
              mt={2} // Add margin-top for spacing
              textShadow="0px 1px 2px rgba(0, 0, 0, 0.5)" // Optional shadow for better readability
            >
              USA
            </Text>
          </Flex>

          {/* Canada Flag */}
          <Flex direction="column" alignItems="center" w={'full'}>
            <Box
              w={['100px', '120px', '150px']} // Adjust size for different screen sizes
              h={['100px', '120px', '150px']}
              bg={'white'}
              borderRadius={'full'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden" // Ensure the image is contained within the circle
            >
              <Image
                src={canada}
                alt="Canada Flag"
                objectFit="cover"
                boxSize={['100%', '100%', '100%']} // Ensure full coverage
              />
            </Box>
            <Text
              textAlign={'center'}
              fontSize={['lg', 'xl']}
              fontWeight={'bold'}
              color={'white'} // Change color as needed
              textTransform="uppercase" // Make text uppercase
              letterSpacing={1} // Add spacing between letters
              mt={2} // Add margin-top for spacing
              textShadow="0px 1px 2px rgba(0, 0, 0, 0.5)" // Optional shadow for better readability
            >
              Canada
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LearnCard;
