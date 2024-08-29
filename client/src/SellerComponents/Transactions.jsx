import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

export default function Transactions() {
  const [transactionData, setTransactionData] = useState([]);
  const { sellerId } = useContext(AuthContext);
  useEffect(() => {

    axios.get(`http://localhost:3000/by_seller/?${sellerId}`).then(
      response => {
        setTransactionData(response.data);
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }, [sellerId]);



  return (
    <div className='transaction_layout'>
      <h1>Transaction List</h1>
      <br />
      <div className="transaction-map">
        {transactionData.map(({ transaction, buyer_profile, product_data }) => (
          <div className='transaction-card' key={transaction.id}>

            <div className="section1-transaction">
              <div className="section-left">
                <img src={product_data.image_url} alt={product_data.name} className='transaction-product-img' />
                <h3>{product_data.name}</h3>
                <br />
                <h5>Price: {product_data.price}{product_data.currency}</h5>
              </div>
              <div className="section-right">
                <h5>Purchase Date: {new Date(transaction.created_at).toLocaleDateString()}</h5>
                <br />
                <h3>Status: Product has been received {transaction.pending ? (<div className='pending'><p style={{ color: 'red' }}>NO</p></div>) : (<div className='pending'>
                  <p style={{ color: 'green' }}>YES</p>
                </div>)}</h3>
              </div>


            </div>




            <div className="seller-data">
              <img
                src={buyer_profile.image_url}
                alt={buyer_profile.name}
                className='transaction-profile-img'
                onClick={() => goToSellerProfile(buyer_profile.seller_id)}
              />
              <h3
                onClick={() => goToSellerProfile(buyer_profile.seller_id)}
                className='profile-link'
              >
                #{buyer_profile.store_name}
              </h3>


            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
