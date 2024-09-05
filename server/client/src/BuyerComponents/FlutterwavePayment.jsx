import React, { useContext, useEffect, useState } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentComponent = ({description, price, name, id,  seller_id}) => {
    const {buyerEmail} = useContext(AuthContext)
    const {buyerId} = useContext(AuthContext);
    const [buyerData, setBuyerData] = useState([]);
    const [pending, setPending] =  useState(true)
    const navigate = useNavigate()
    const productId = id
    useEffect(()=>
      {
        axios.get(`http://localhost:3000/users/${buyerId}/buyer_profile`)
        .then(res => {setBuyerData(res.data)})
        .catch(err => {console.log(err)})
        
      },[buyerId]);

  const config = {
    public_key: 'YOUR_FLUTTERWAVE_PUBLIC_KEY',
    tx_ref: Date.now(),
    amount: price,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: buyerEmail,
      phonenumber: buyerData.phone_number,
      name: buyerData.name,
    },
    customizations: {
      title: name,
      description: description,
      
    },
  };

  const handleFlutterwaveSuccess = (response) => {
    if(response.status === 200){
      const formData = new FormData()
      formData.append('transaction[seller_id]', seller_id )
      formData.append('transaction[buyer_id]',  buyerId  )
      formData.append('transaction[product_id]', productId )
      formData.append('transaction[pending]', pending )

      axios.post(`http://localhost:3000/transactions`,
        formData
      )
      .then(res =>{
        console.log(res, 'sucessful payment')
        navigate('/store')
      }).catch(err => {console.log(err)})
    }else{
      console.log('sorry transaction could not be completed,  try again later')
      alert('sorry transaction could not be completed,  try again later')
    }
    console.log(response);
    closePaymentModal(); 
  };

  const handleFlutterwaveClose = () => {
    console.log('Payment modal closed');
  };

  return (
    <div>
      <FlutterWaveButton
        callback={handleFlutterwaveSuccess}
        onClose={handleFlutterwaveClose}
        {...config}
        text="Pay with flutterwave"
      className='payment-btn'
      />
    </div>
  );
};

export default PaymentComponent;
