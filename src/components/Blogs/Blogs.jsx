import React from 'react';
import blogData from '../../assets/docs/Blogs.json';
import { HStack, Stack } from '@chakra-ui/react';
import BlogsCard from '../Home/Blogs';

const Blogs = () => {
  // Extract the blogs array from the imported blogData object
  const blogs = blogData.blogs;

  // Check if blogs is an array
  if (!Array.isArray(blogs)) {
    console.error('blogs is not an array');
    return null;
  }

  return (
    <Stack
      mt={20}
      direction={['column']}
      mx={'auto'}
      maxW={'container.xl'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={5}
      p={5}
    >
      <HStack
        w={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        flexWrap="wrap"
        spacing={5}
      >
        {blogs.map(blog => (
          <BlogsCard
            key={blog.id}
            img={blog.imgForCard}
            title={blog.title}
            date={blog.date}
            description={blog.blogCardDescription}
            id={blog.id}
          />
        ))}
      </HStack>
    </Stack>
  );
};

export default Blogs;
