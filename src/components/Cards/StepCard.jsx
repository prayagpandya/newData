import {
  Button,
  Container,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const StepCard = ({ title, description, img, no }) => {
  return (
    <Container>
      <VStack pos={'relative'}>
        <Heading
          //   border={'1px solid black'}
          px={'4'}
          py={'3'}
          right={'16'}
          boxShadow={'0 0 10px 2px #EBE0D3'}
          bg={'white'}
          zIndex={5}
          borderRadius={'full'}
          pos={'absolute'}
          size="xs"
          textTransform={'uppercase'}
        >
          {no}
        </Heading>
        <Image
          src={img}
          alt="step1Img"
          w={'16rem'}
          objectFit={'cover'}
          minH={'16rem'}
        />
        <Heading size="md" fontWeight={'500'}>
          {title}
        </Heading>
        <Text fontSize={'1.1rem'} px={'10'} textAlign={'center'}>
          {description}
        </Text>
        <Button colorScheme={'yellow'} variant={'ghost'}>
          Learn More
        </Button>
      </VStack>
    </Container>
  );
};

export default StepCard;
