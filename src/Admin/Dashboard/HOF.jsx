import React, { useState } from 'react';
import { Box, Container, HStack, VStack } from '@chakra-ui/react';
import Tabs from '../Components/tabs';

const withAdminLayout = (Component, activeTabName) => {
  const tabs = [
    { name: 'Users', url: '/admin/users' },
    { name: 'Manage Courses', url: '/admin/manage-courses' },
    { name: 'Create Courses', url: '/admin/create-course' },
    { name: 'Contact List', url: '/admin/contacts' },
    { name: 'Booking List', url: '/admin/bookings' },
  ];

  return props => {
    const [activeTab, setActiveTab] = useState(activeTabName);

    return (
      <Container minH={'90vh'} mt={20} maxW={'100%'} w={'100%'}>
        <HStack align="flex-start" w={'100%'}>
          <Box
            w={['100px', '200px', '300px']}
            h="100vh"
            position="sticky"
            top="0"
          >
            <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
          </Box>
          <VStack w={'100%'} ml={[0, 4, 6]}>
            <Component {...props} />
          </VStack>
        </HStack>
      </Container>
    );
  };
};

export default withAdminLayout;
