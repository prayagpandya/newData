import React, { useEffect, useState } from 'react';
import DynamicTable from '../../Components/dynamicTable';
import withAdminLayout from '../HOF';
import axios from 'axios';
import { url } from '../../../url';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/book-demo/`);
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

  // Define the headers for the booking table
  const bookingHeaders = ['Name', 'Contact No', 'Email'];

  return (
    <DynamicTable
      caption="Booking List"
      headers={bookingHeaders}
      data={bookings} // Pass the bookings data to the DynamicTable
    />
  );
};

// Export the component wrapped with the higher-order layout
export default withAdminLayout(BookingList, 'Booking List');
