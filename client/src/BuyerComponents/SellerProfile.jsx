import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function SellerProfile() {
  const location = useLocation();
  const { id } = location.state || {};
  const [profileData, setProfileData] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
   
      axios.get(`http://localhost:3000/sellers/${id}/profile`)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios.get(`http://localhost:3000/products/seller_product/${id}`)
        .then(res => {
          setProducts(res.data.products);
        })
        .catch(err => {
          console.log(err);
        });
    
  }, [id]);

  const handleView = (productId) => {
    navigate('/view_product', { state: { id: productId } });
  };
  const handleInbox = (sellerId) => {
    navigate('/inbox', { state: { id: sellerId } });
  };

  return (
    <div className='profile-layout'>
     

    <div className="profile-data">
   
        <div className="profile-wrap" >

          <img src={profileData.banner_url} alt="" className='banner-profile' />
           
          <div className="profile-section1">
            <img src={profileData.image_url} alt="" className='profile-image' />
            <h2>{profileData.store_name}</h2>
            <h4></h4>
            <h5><BsTelephone id='h5-icon'/> {profileData.phone_number}</h5>
            <h5><CiLocationOn id='h5-icon'/> {profileData.address}</h5>
           
           <button id='order-btn' onClick={()=>handleInbox(profileData.seller_id)}>message designer</button>
          </div>

          <div className="right-profile-secrion">
            <div className="profile-section2">
            <p>Bio: {profileData.description}</p>
              <p>Country: {profileData.country}</p>
              <p>website <a href={profileData.website}>{profileData.website}</a></p>
              <p>social <a href={profileData.social}>{profileData.social}</a></p>
<p>Ratings ⭐⭐⭐</p>
            </div>
          </div>


        </div>
      
    </div>

    <div className="product-wrap-profile">
      {products.map((data) => (
        <div className='product-card2' key={data.id} onClick={() => handleView(data.id)}>
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
