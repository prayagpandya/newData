import React from 'react';
import { useParams } from 'react-router-dom';
import blogData from '../../assets/docs/Blogs.json';
import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  VStack,
} from '@chakra-ui/react';

const BlogsSingle = () => {
  // Get the blog ID from the URL params
  const { id } = useParams();

  // Find the blog data based on the ID
  const blog = blogData.blogs.find(blog => blog.id === id);

  // If blog is not found, return a message or handle accordingly
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Box py={['8', '10', '24']} textAlign="center" position="relative">
        <Box w="full" height="50vh" position="relative">
          <Image
            src={blog.imgforBlog}
            alt={blog.title}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            width="100%"
            height="70vh"
            objectFit="cover"
            objectPosition="center"
            zIndex={-10}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            h="70vh"
            right={0}
            bottom={0}
            backgroundColor="rgba(53, 52, 71, 0.65)"
            zIndex={-1}
          ></Box>
          <Box
            position="absolute"
            top="25%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex="1"
            textAlign="center"
          >
            <Heading
              fontWeight="500"
              fontFamily="Fira Sans"
              w={'90vw'}
              as="h1"
              fontSize={['3xl', '4xl', '5xl']}
              color="white"
              mb={[0, -8, -8, -8]}
            >
              {blog.title}
            </Heading>
          </Box>
        </Box>
      </Box>
      <VStack w="full" mt={32} spacing={10} px={[4, 8, 20]}>
        <Heading
          textAlign="center"
          fontWeight="500"
          color="yellow.500"
          _dark={{ color: 'yellow.300' }}
        >
          {blog.title}
        </Heading>
        <Text
          fontSize="lg"
          opacity={0.8}
          fontFamily="Recursive"
          letterSpacing="wide"
          textAlign="justify"
        >
          {blog.blogDescription}
        </Text>
        <UnorderedList spacing={6} styleType="none">
          {blog.keyPoints.map((keyPoint, index) => (
            <ListItem key={index}>
              <Heading
                as="h4"
                fontFamily="Fira Sans"
                fontSize="xl"
                fontWeight="500"
                mb={2}
                color="yellow.500"
                _dark={{ color: 'yellow.300' }}
              >
                {keyPoint?.title}
              </Heading>
              <Text
                fontSize="lg"
                opacity={0.8}
                fontFamily="Recursive"
                letterSpacing="wide"
                textAlign="justify"
              >
                {keyPoint.description}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
        <Text
          fontSize="lg"
          opacity={0.8}
          fontFamily="Recursive"
          letterSpacing="wide"
          textAlign="justify"
        >
          {blog.endDescription}
        </Text>
      </VStack>
    </Container>
  );
};

export default BlogsSingle;
