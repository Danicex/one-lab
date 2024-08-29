import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import './StoreStyles.css';
import { useNavigate } from 'react-router-dom';

export default function BuyerTransaction() {
  const [transactionData, setTransactionData] = useState([]);
  const { buyerId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the transaction data
    axios
      .get(`http://localhost:3000/transactions/by_seller?seller_id=${buyerId}`)
      .then((response) => {
        setTransactionData([response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [buyerId]);

  const goToSellerProfile = (id) => {
    navigate('/view_seller_profile', { state: { id } });
  };

  return (
    <div className='transaction_layout'>
      <h1>Transaction List</h1>
      <br />
      <div className="transaction-map">
        {transactionData.map(({ transaction, seller_profile, product_data }) => (
          <div className='transaction-card' key={transaction.id}>
            <div className="section1-transaction">
              <div className="section-left">
                <img
                  src={product_data.image_url}
                  alt={product_data.name}
                  className='transaction-product-img'
                />
                <h3>{product_data.name}</h3>
                <br />
                <h5>Price: {product_data.price}{product_data.currency}</h5>
              </div>
              <div className="section-right">
                <h5>Purchase Date: {new Date(transaction.created_at).toLocaleDateString()}</h5>
                <br />
                <h3>Status: Product has been received {transaction.pending ? (
                  <div className='pending'>
                    <p style={{ color: 'red' }}>NO</p>
                  </div>
                ) : (
                  <div className='pending'>
                    <p style={{ color: 'green' }}>YES</p>
                  </div>
                )}</h3>
              </div>
            </div>
            <div className="seller-data">
              <img
                src={seller_profile.image_url}
                alt={seller_profile.name}
                className='transaction-profile-img'
                onClick={() => goToSellerProfile(seller_profile.seller_id)}
              />
              <h3
                onClick={() => goToSellerProfile(seller_profile.seller_id)}
                className='profile-link'
              >
                #{seller_profile.store_name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
