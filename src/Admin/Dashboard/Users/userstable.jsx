import React from 'react';
import DynamicTable from '../../Components/dynamicTable';
import withAdminLayout from '../HOF';

const Users = () => {
  const users = [
    { userName: 'Meet', no_: 8877665566, email: 'xyz@gmail.com' },
    { userName: 'John', no_: 9988776655, email: 'john@gmail.com' },
    { userName: 'Jane', no_: 9988776655, email: 'jane@gmail.com' },
  ];

  const userHeaders = ['User name', 'Mo. no.', 'Email'];

  return (
    <DynamicTable caption="Users List" headers={userHeaders} data={users} />
  );
};

export default withAdminLayout(Users, 'Users');
