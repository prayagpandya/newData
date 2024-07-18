import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Container p={'16'}>
      <Heading my={'8'} textAlign={'center'}>
        You have successfully made payment
      </Heading>
      <VStack
        boxShadow={'0 0 10px 2px #c1c1c1'}
        pb={'16'}
        alignItems={'center'}
        borderRadius={'lg'}
      >
        <Box
          w={'full'}
          bg={'yellow.400'}
          p={'4'}
          css={{ borderRadius: '8px 8px 0 0' }}
        >
          <Text children={`Payment Success`} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children={`Congratulations You Are Successfully Enrolled`} />
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill color="green" />
            </Heading>
          </VStack>
        </Box>
        <Link to={'/profile'}>
          <Button w={'full'} variant={'ghost'} colorScheme={'yellow'}>
            Go To Profile
          </Button>
        </Link>
        <Heading size={'xs'}> Referance ID: 12345</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
