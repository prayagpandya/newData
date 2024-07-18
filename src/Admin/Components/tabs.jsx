import React, { useState } from 'react';
import {
  VStack,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const btnRef = React.useRef();
  const history = useLocation();

  const handleTabClick = tab => {
    onTabClick(tab.name);
    window.location.replace(tab.url);
    onClose(); // Close the drawer when a tab is clicked on mobile
  };

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            ref={btnRef}
            icon={<IoMdArrowDroprightCircle size={'28'} color="#ECC94B" />}
            onClick={onOpen}
            variant="ghost"
            scale={'1.5'}
            aria-label="Open menu"
            position="fixed"
            top="4rem"
            left="0.5rem"
            zIndex="999"
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack align="flex-start" spacing={4}>
                  {tabs.map(tab => (
                    <Button
                      key={tab.name}
                      textAlign={'left'}
                      onClick={() => handleTabClick(tab)}
                      variant={activeTab === tab.name && 'ghost'}
                      colorScheme={activeTab === tab.name ? 'yellow' : 'gray'}
                      w="100%"
                    >
                      {tab.name}
                    </Button>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Container position={'fixed'} w={'20%'}>
          <VStack align="flex-start" spacing={4}>
            {tabs.map(tab => (
              <Button
                key={tab.name}
                textAlign={'left'}
                onClick={() => handleTabClick(tab)}
                variant={activeTab === tab.name && 'ghost'}
                colorScheme={activeTab === tab.name ? 'yellow' : 'gray'}
                w="100%"
              >
                {tab.name}
              </Button>
            ))}
          </VStack>
        </Container>
      )}
    </>
  );
};

export default Tabs;
