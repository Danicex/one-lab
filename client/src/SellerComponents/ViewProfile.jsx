import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import './ProfileStyles.css';
import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";

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

            <img src={item.banner_url} alt="" className='banner-profile' />
             
            <div className="profile-section1">
              <img src={item.image_url} alt="" className='profile-image' />
              <h2>{item.store_name}</h2>
              <h4>{sellerEmail}</h4>
              <h5><BsTelephone id='h5-icon'/> {item.phone_number}</h5>
              <h5><CiLocationOn id='h5-icon'/> {item.address}</h5>
              <h5 style={{color: '#7d86ff'}}>{total} products in total</h5>
             
            </div>

            <div className="right-profile-secrion">
              <div className="profile-section2">
              <p>Bio: {item.description}</p>
                <p>Currency: {item.currency}</p>
                <p>Account number: {item.account_number}</p>
                <p>Account name: {item.fullname}</p>
                <p>Bank: {item.bank_name}</p>
                <p>website <a href={item.website}>{item.website}</a></p>
                <p>social <a href={item.social}>{item.social}</a></p>

              </div>
              <div className="product-section3">
                <h5>your ratings</h5>

              </div>
            </div>


          </div>
        ))}
      </div>

      <div className="product-wrap-profile">
        {products.map((data) => (
          <div className='product-card2' key={data.id}>
            <img src={data.image_url} alt="" className='product-image2' />
            <div className="card-section2">
              <h4>{data.name}</h4>
              <h5>{data.price}NGN</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
