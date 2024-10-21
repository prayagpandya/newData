import React from 'react';
import DynamicTable from '../../Components/dynamicTable';
import withAdminLayout from '../HOF';

const ContactList = () => {
  const contacts = [
    {
      contactName: 'Meet',
      contactNo: '85689487',
      email: 'xyz@gmail.com',
      message: 'Alice Johnson my name',
    },
    {
      contactName: 'Meet',
      contactNo: '85689487',
      email: 'xyz@gmail.com',
      message: 'Alice Johnson my name',
    },
    {
      contactName: 'Meet',
      contactNo: '85689487',
      email: 'xyz@gmail.com',
      message: 'Alice Johnson my name',
    },
  ];

  const contactHeaders = ['Contact Name', 'Contact No', 'Email', 'Message'];

  return (
    <DynamicTable
      caption="Contact List"
      headers={contactHeaders}
      data={contacts}
    />
  );
};

export default withAdminLayout(ContactList, 'Contact List');
