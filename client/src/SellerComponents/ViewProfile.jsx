import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import './ProfileStyles.css';

export default function ViewProfile() {
  const [profileData, setProfileData] = useState([]);
  const [products, setProducts] = useState([]);
  const { sellerEmail, sellerId } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/sellers/${sellerId}/profile`)
      .then(res => {
        setProfileData([res.data]);
      }).catch(err => {
        console.log('an error occurred', err);
      });

    axios.get(`http://localhost:3000/sellers/${sellerId}/products`)
      .then(response => {
        setProducts(response.data.products);
      }).catch(error => {
        console.log(error);
      });
  }, [sellerId]);

  const total = products.length;

  return (
    <div className='profile-layout'>
      <div className="profile-data">
        {profileData.map((item) => (
          <div className="profile-wrap" key={item.id}>
            <img src={item.image_url} alt="" className='profile-image' />
            <div className="profile-details">
              <h1>{item.store_name}</h1>
              <h3>{sellerEmail}</h3>
              <h3>{item.phone_number}</h3>
              <h4>{item.address}</h4>
              <p>{item.description}</p>
              <p>Currency: {item.currency}</p>
              <p>Bank: {item.bank_name}</p>
              <h3>{total} products in total</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="line"></div>
      <div className="product-wrap-profile">
        {products.map((data) => (
          <div className='product-card' key={data.id}>
            <img src={data.image_url} alt="" className='product-image' />
            <div className="card-section">
              <h4>{data.name}</h4>
              <h5>{data.price}NGN</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
