import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
} from '@chakra-ui/react'; // Import Chakra UI components
import DynamicTable from '../../Components/dynamicTable';
import withAdminLayout from '../HOF';
import axios from 'axios';
import { url } from '../../../url';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State for modal
  const [newService, setNewService] = useState({
    // State for the new service data
    name: '',
    duration: '',
    capacity: '',
    briefDescription: '',
    overview: '',
    objectives: '',
    photo: '',
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/book-service/`);
        console.log('Response:', response.data);

        const formattedBookings = response.data.map(booking => ({
          Name: booking.name,
          'Contact No': booking.phoneNumber,
          Email: booking.email,
        }));
        setBookings(formattedBookings); // Set the state with the formatted data
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings(); // Call the function to fetch bookings
  }, []); // Empty dependency array to run only once on mount

  // Function to handle modal close
  const handleClose = () => {
    setIsOpen(false);
    setNewService({
      // Reset the form state
      name: '',
      duration: '',
      capacity: '',
      briefDescription: '',
      overview: '',
      objectives: '',
      photo: '',
    });
  };

  // Function to handle form submission
  const handleSubmit = async event => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(`${url}/api/v1/services`, newService);
      console.log('Service created:', response.data);
      setIsOpen(false); // Close the modal after submission
      // Optionally, fetch bookings again to update the table
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  // Define the headers for the booking table
  const bookingHeaders = ['Name', 'Contact No', 'Email'];

  return (
    <Box p={5}>
      <Button
        colorScheme="teal"
        onClick={() => setIsOpen(true)} // Open modal on button click
        mb={4} // Add margin below the button
      >
        Create Service
      </Button>

      <DynamicTable
        caption="Booking Service List"
        headers={bookingHeaders}
        data={bookings} // Pass the bookings data to the DynamicTable
      />

      {/* Modal for creating new service */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                value={newService.name}
                onChange={e =>
                  setNewService({ ...newService, name: e.target.value })
                }
                placeholder="Service Name"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Duration</FormLabel>
              <Input
                value={newService.duration}
                onChange={e =>
                  setNewService({ ...newService, duration: e.target.value })
                }
                placeholder="Duration"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Capacity</FormLabel>
              <Input
                value={newService.capacity}
                onChange={e =>
                  setNewService({ ...newService, capacity: e.target.value })
                }
                placeholder="Capacity"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Brief Description</FormLabel>
              <Textarea
                value={newService.briefDescription}
                onChange={e =>
                  setNewService({
                    ...newService,
                    briefDescription: e.target.value,
                  })
                }
                placeholder="Brief Description"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Overview (comma separated)</FormLabel>
              <Textarea
                value={newService.overview}
                onChange={e =>
                  setNewService({ ...newService, overview: e.target.value })
                }
                placeholder="Overview"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Objectives (comma separated)</FormLabel>
              <Textarea
                value={newService.objectives}
                onChange={e =>
                  setNewService({ ...newService, objectives: e.target.value })
                }
                placeholder="Objectives"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Photo URL</FormLabel>
              <Input
                value={newService.photo}
                onChange={e =>
                  setNewService({ ...newService, photo: e.target.value })
                }
                placeholder="Photo URL"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={handleClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Export the component wrapped with the higher-order layout
export default withAdminLayout(BookingList, 'Booking Services');
