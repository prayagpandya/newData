import React from 'react';
import DynamicTable from '../../Components/dynamicTable';
import withAdminLayout from '../HOF';

const BookingList = () => {
  const bookings = [
    {
      userName: 'Meet',
      contactNo: '85689487',
      email: 'xyz@gmail.com',
    },
    {
      userName: 'Meet',
      contactNo: '85689487',
      email: 'xyz@gmail.com',
    },
    {
      userName: 'Meet',
      contactNo: '85689487',
      email: 'xyz@gmail.com',
    },
  ];

  const bookingHeaders = [' Name', 'Contact No', 'Email'];

  return (
    <DynamicTable
      caption="Booking List"
      headers={bookingHeaders}
      data={bookings}
    />
  );
};

export default withAdminLayout(BookingList, 'Booking List');
