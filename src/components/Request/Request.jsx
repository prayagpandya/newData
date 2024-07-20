import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/Request.png';
const Request = () => {
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [email, setEmail] = useState();

  return (
    <Container my={'16'} maxW={'container.xl'}>
      <HStack justifyContent={'space-evenly'} w={'full'} alignItems={'center'}>
        <VStack w={'full'} display={['none', 'none', 'block']}>
          <Image src={img} display={['none', 'none', 'block']} />
        </VStack>
        <VStack h={'full'} w={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading children="Request Us" textAlign={'center'} />
          <form style={{ width: '100%' }}>
            <Box boxShadow={'0 0 10px 2px #dbd695'} p={'4'} borderRadius={'lg'}>
              <Box my={'4'}>
                <FormLabel htmlFor="na,e" children="Name" />
                <Input
                  required
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  type="text"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Box my={'4'}>
                <FormLabel htmlFor="email" children="Email Address" />
                <Input
                  required
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  type="email"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Box my={'4'}>
                <FormLabel htmlFor="course" children="Course" />
                <Textarea
                  required
                  id="course"
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  placeholder="Explain your course"
                  focusBorderColor="yellow.500"
                />
              </Box>
              <Button my={'4'} w={'full'} colorScheme={'yellow'} type="submit">
                Send Message
              </Button>
              <Box my={'4'}>
                See Available courses?{' '}
                <Link to={'/courses'}>
                  <Button colorScheme={'yellow'} variant={'link'}>
                    Click
                  </Button>{' '}
                  here
                </Link>
              </Box>
            </Box>
          </form>
        </VStack>
      </HStack>
    </Container>
  );
};

export default Request;
