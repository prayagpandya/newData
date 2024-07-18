import { Button, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const CardOfPayment = ({ amount, img, checkOutHandler }) => {
  return (
    <VStack>
      <Image src={img} />
      <Text>{amount}</Text>
      <Button onClick={() => checkOutHandler(amount)}>Pay Now</Button>
    </VStack>
  );
};

export default CardOfPayment;
