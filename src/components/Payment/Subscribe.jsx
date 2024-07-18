import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Subscribe = () => {
  return (
    <Container p={'16'} maxW={'5xl'}>
      <Heading children="Welcome" m={'8'} textAlign={'center'} />
      <Stack direction={['column', 'row']}>
        <VStack
          alignItems={'stretch'}
          boxShadow={'0 0 10px 2px #c1c1c1'}
          borderRadius={'lg'}
          spacing={'0'}
        >
          <Box bg={'yellow'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
            <Text children={`Pro Pack - ₹299.00`} color={'black'} />
          </Box>
          <Box p={'4'}>
            <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
              <Text children={`Join Pro Pack and get access to all content`} />
              <Heading
                children={`₹299.00 / mo`}
                size={'md'}
                fontFamily={'Recursive'}
              />
            </VStack>
            <Button w={'full'} my={'8'} colorScheme={'yellow'}>
              Buy Now
            </Button>
          </Box>
          <Box
            bg={'blackAlpha.600'}
            p={'4'}
            css={{ borderRadius: '0 0 8px 8px' }}
          >
            <Heading
              textAlign={'center'}
              textTransform={'uppercase'}
              color={'white'}
              size={'md'}
              children={`Cancel anytime`}
            />
            <Text
              fontSize={'sm'}
              textAlign={'center'}
              color={'white'}
              children={`Terms and Conditions Apply`}
            />
          </Box>
        </VStack>
        <VStack
          alignItems={'stretch'}
          boxShadow={'0 0 10px 2px #c1c1c1'}
          borderRadius={'lg'}
          spacing={'0'}
        >
          <Box bg={'yellow'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
            <Text children={`Pro Pack - ₹299.00`} color={'black'} />
          </Box>
          <Box p={'4'}>
            <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
              <Text children={`Join Pro Pack and get access to all content`} />
              <Heading
                children={`₹299.00 / mo`}
                size={'md'}
                fontFamily={'Recursive'}
              />
            </VStack>
            <Button w={'full'} my={'8'} colorScheme={'yellow'}>
              Buy Now
            </Button>
          </Box>
          <Box
            bg={'blackAlpha.600'}
            p={'4'}
            css={{ borderRadius: '0 0 8px 8px' }}
          >
            <Heading
              textAlign={'center'}
              textTransform={'uppercase'}
              color={'white'}
              size={'md'}
              children={`Cancel anytime`}
            />
            <Text
              fontSize={'sm'}
              textAlign={'center'}
              color={'white'}
              children={`Terms and Conditions Apply`}
            />
          </Box>
        </VStack>
        <VStack
          alignItems={'stretch'}
          boxShadow={'0 0 10px 2px #c1c1c1'}
          borderRadius={'lg'}
          spacing={'0'}
        >
          <Box bg={'yellow'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
            <Text children={`Pro Pack - ₹299.00`} color={'black'} />
          </Box>
          <Box p={'4'}>
            <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
              <Text children={`Join Pro Pack and get access to all content`} />
              <Heading
                children={`₹299.00 / mo`}
                size={'md'}
                fontFamily={'Recursive'}
              />
            </VStack>
            <Button w={'full'} my={'8'} colorScheme={'yellow'}>
              Buy Now
            </Button>
          </Box>
          <Box
            bg={'blackAlpha.600'}
            p={'4'}
            css={{ borderRadius: '0 0 8px 8px' }}
          >
            <Heading
              textAlign={'center'}
              textTransform={'uppercase'}
              color={'white'}
              size={'md'}
              children={`Cancel anytime`}
            />
            <Text
              fontSize={'sm'}
              textAlign={'center'}
              color={'white'}
              children={`Terms and Conditions Apply`}
            />
          </Box>
        </VStack>
      </Stack>
    </Container>
  );
};

export default Subscribe;
