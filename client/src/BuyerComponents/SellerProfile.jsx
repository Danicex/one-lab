import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";

export default function SellerProfile() {
  const location = useLocation();
  const { id } = location.state || {};
  const [profileData, setProfileData] = useState([]);
  const [products, setProducts] = useState([]);
  const [sellerEmail, setSellerEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/sellers/${id}/profile`)
        .then(response => {
          setProfileData([response.data]);
        })
        .catch(err => {
          console.log(err);
        });

      axios.get(`http://localhost:3000/sellers/${id}`)
        .then(user => {
          setSellerEmail(user.data.email);
        })
        .catch(err => {
          console.log(err);
        });

      axios.get(`http://localhost:3000/sellers/${id}/products`)
        .then(res => {
          setProducts(res.data.products);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  const handleView = (productId) => {
    navigate('/view_product', { state: { id: productId } });
  };

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
           
          </div>

          <div className="right-profile-secrion">
            <div className="profile-section2">
            <p>Bio: {item.description}</p>
              <p>Country: {item.country}</p>
              <p>website <a href={item.website}>{item.website}</a></p>
              <p>social <a href={item.social}>{item.social}</a></p>
<p>Ratings ⭐⭐⭐</p>
            </div>
          </div>


        </div>
      ))}
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
