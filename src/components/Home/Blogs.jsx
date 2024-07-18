import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const BlogsCard = ({ img, title, date, description, id }) => {
  return (
    <Link to={`/blogs/${id}`} style={{ minHeight: '60vh' }}>
      <Card maxW="sm" role="group">
        <CardBody minH={'500px'}>
          <Image objectFit={'cover'} src={img} alt={title} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Text children={date} opacity={0.8} />
            <Heading
              _groupHover={{
                color: '#D69E2E',
                transition: 'all 0.7s',
                transitionBehavior: 'ease-in-out',
              }}
              fontFamily={'Fira Sans'}
              fontWeight={'500'}
              fontSize="2xl"
            >
              {title}
            </Heading>
            <Text opacity={0.8} fontFamily={'Recursive'}>
              {description}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default BlogsCard;
