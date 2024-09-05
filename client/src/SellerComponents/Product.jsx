import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import './ProfileStyles.css';
import { FiAlertCircle } from "react-icons/fi";

export default function Product() {
  const [product, setProduct] = useState({
    product_name: '',
    category: '',
    price: '',
    description: '',
    delivery_time: '',
    quantity: '',
    currency: ''
  });
  const [previewImage, setPreviewImage] = useState(null)
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const { sellerId } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      const renderImage = URL.createObjectURL(file);
      setPreviewImage(renderImage)
    } else {
      setPreviewImage(null);
    }
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('product[name]', product.product_name);
    formData.append('product[category]', product.category);
    formData.append('product[price]', product.price);
    formData.append('product[description]', product.description);
    formData.append('product[delivery_time]', product.delivery_time);
    formData.append('product[quantity]', product.quantity);
    formData.append('product[currency]', product.currency);
    formData.append('product[image]', image);

    axios.post(`http://localhost:3000/sellers/${sellerId}/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log(res.status);
        setSuccess(true);
      })
      .catch(err => {
        console.log('Error:', err);
        setSuccess(false);
      });
  };

  const  closeSuc= ()=>{
    setSuccess(false)
  }
  return (
    <div className='product-post'>

    {success && (
      <div className='success'>
        <p>Product successfully created ✨🎉</p>
        <p onClick={closeSuc} className='text'>✖</p>
        </div>
    )}
  
    <div className="form-container">
      <h1 className="form-title">Create Product</h1>
  
      <div className="form-section">
        <div className="image-preview">
          {previewImage && (
            <img src={previewImage} className="fabric-img" alt="Product Preview" />
          )}
        </div>
        <label className="form-label">
          <p>Product Image</p>
          <input type="file" onChange={handleFileChange} className="file-input" />
        </label>
        <label className="form-label">
          <p>Product Name</p>
          <input type="text" name="product_name" value={product.product_name} onChange={handleStateChange} placeholder='Name' className="text-input" />
        </label>
        <label className="form-label">
          <p>Product Category</p>
          <input type="text" name="category" value={product.category} onChange={handleStateChange} list='category' placeholder='Category' className="text-input" />
          <datalist id='category'>
            <option value="casual_wear" />
            <option value="formal_wear" />
            <option value="Business_Attire" />
            <option value="sportswear" />
            <option value="native_wear" />
            <option value="luxury_fashion" />
            <option value="vintage_fashion" />
            <option value="rare_fashion" />
          </datalist>
        </label>
        <label className="form-label2">
          <div className="k">
          <p>Price</p>
          <input type="number" name="price" value={product.price} onChange={handleStateChange} placeholder='50.6' className="file-input" />
          </div>

          <div className="k">
          <p>Currency</p>
          <input type="text" name='currency' value={product.currency} onChange={handleStateChange} placeholder='USD' className="file-input" />
          <datalist id='currency'>
            <option value="NGN" />
            <option value="USD" />
            <option value="YEN" />
            <option value="EUR" />
          </datalist>

          </div>
        </label>

      </div>
  
      <div className="form-section">
        <label className="form-label">
          <p>Description</p>
          <textarea name="description" placeholder='Enter your product description like: size, texture, material type' value={product.description} onChange={handleStateChange} rows={10} className='textarea-input' />
          <small style={{textAlign:'end', fontSize: '12px',padding: '6px'}} className='global-span'> <FiAlertCircle /> note that this will be the search term a buyer will use to get this  product</small>
        </label>
        <label className="form-label2">
          <div className="k">
          <p>Delivery Date</p>
          <input type="text" name="delivery_time" value={product.delivery_time} onChange={handleStateChange} placeholder='1 week' className="text-input" />
          </div>
          <div className="k">
          <p>Quantity</p>
          <input type="number" name="quantity" value={product.quantity} onChange={handleStateChange} placeholder='5' className="text-input" />
          </div>
        </label>
        
        <button onClick={handleSubmit} className='upload-btn'>Upload</button>
      </div>

    </div>
  
  </div>
  
  );
}
