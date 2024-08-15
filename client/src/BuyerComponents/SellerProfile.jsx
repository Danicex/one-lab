import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    <div>
      <div className="profile-data">
        {profileData.map((item) => (
          <div className="profile-wrap" key={item.id}>
            <img src={item.image_url} alt="" className='profile-image' />
            <div className="profile-details">
              <h1>{item.store_name}</h1>
              <h3>{item.phone_number}</h3>
              <h4>{item.address}</h4>
              <p>{item.description}</p>
              <h3>{products.length} products in total</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="store-data">
        {products.map((data) => (
          <div className='product-card1' key={data.id} onClick={() => handleView(data.id)}>
            <img src={data.image_url} alt="" className='product-image' />
            <div className="card-section">
              <h4>{data.name}</h4>
              <h5>{data.price} {data.currency}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
