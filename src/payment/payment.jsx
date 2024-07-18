import { Box, Stack } from '@chakra-ui/react';
import React from 'react';
import CardOfPayment from './cardComponent';
import img from '../assets/images/1.png';
import axios from 'axios';
import { url } from '../url';

const Payment = () => {
  const checkOutHandler = async amount => {
    const { key } = await axios.get(`${url}/api/v1/getKey`);
    try {
      const {
        data: { order },
      } = await axios.post(`${url}/api/v1/pay/check-out`, {
        amount,
      });
      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Meet',
        description: 'Test Transaction',
        image: 'https://avatars.githubusercontent.com/u/147489256?v=4',
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${url}/api/v1/pay/payment-verification`,
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };
      //   console.log('Payment Response:', data);
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error in checkout:', error);
    }
  };

  return (
    <Box>
      <Stack direction={['column', 'row']}>
        <CardOfPayment
          amount={50000}
          img={img}
          checkOutHandler={checkOutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Payment;
