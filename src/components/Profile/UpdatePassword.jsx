import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading
          children="Update Profile"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          {/* <FormLabel htmlFor="password" children="Password" /> */}
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Your Name"
            type="text"
            focusBorderColor="yellow.500"
          />
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter new Email"
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button w={'full'} type="submit" colorScheme={'yellow'}>
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
