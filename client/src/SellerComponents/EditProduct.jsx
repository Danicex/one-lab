import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import './ProfileStyles.css';
import { useLocation } from 'react-router-dom';

export default function EditProduct() {
  const [product, setProduct] = useState({
    product_name: '',
    category: '',
    price: '',
    description: '',
    delivery_time: '',
    quantity: ''
  });
  const location = useLocation();
  const { id } = location.state || {};
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [renderImg, setRenderImg] = useState([]);
  const { sellerId } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [active, setActive] = useState(false);

  // Fetch product data when the component mounts
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/sellers/${sellerId}/products/${id}`)
        .then(res => {
          const fetchedProduct = res.data;
          setProduct({
            product_name: fetchedProduct.name,
            category: fetchedProduct.category,
            price: fetchedProduct.price,
            description: fetchedProduct.description,
            delivery_time: fetchedProduct.delivery_time,
            quantity: fetchedProduct.quantity
          });
          setRenderImg([res.data]);
          setActive(false);
        })
        .catch(err => {
          console.error('Error fetching product data:', err);
        });
    }
  }, [sellerId, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const renderImage = URL.createObjectURL(file);
      setPreview(renderImage);
      setActive(true);
    } else {
      setPreview(null);
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
    if (image) {
      formData.append('product[image]', image);
    }

    axios.put(`http://localhost:3000/sellers/${sellerId}/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log(res.status);
        setSuccess(true);
      })
      .catch(err => {
        console.error('Error updating product:', err);
        setSuccess(false);
      });
  };

  return (
    <div className='product-post2'>
      {success && (
        <div className='success'>
          <p>Product successfully updated ✨🎉</p>
        </div>
      )}
      <div className="all">
        <div className="wrap1-form">
          <h1>Edit Product</h1>
          {active ? (
            preview && (
              <div>
                <img src={preview} alt="Preview" className="show-img" />
              </div>
            )
          ) : (
            renderImg.map((img) => (
              <img src={img.image_url} alt="" className='show-img' key={img.image_url} />
            ))
          )}
          <label>
            <p>Product Image</p>
            <input type="file" onChange={handleFileChange} />
          </label>
          <label>
            <p>Product Name</p>
            <input type="text" name="product_name" value={product.product_name} onChange={handleStateChange} placeholder='Name' />
          </label>
          <label>
            <p>Product Category</p>
            <input type="text" name="category" value={product.category} onChange={handleStateChange} list='category' placeholder='Category' />
            <datalist id='category'>
              <option value="shirts" />
              <option value="outfits" />
              <option value="trousers" />
              <option value="gown" />
            </datalist>
          </label>
          <label>
            <p>Price</p>
            <input type="number" name="price" value={product.price} onChange={handleStateChange} placeholder='50.6' />
          </label>
        </div>
        <div className="wrap-form2">
          <label>
            <p>Description</p>
            <textarea name="description" placeholder='Enter your product description like: size, texture, material type' value={product.description} onChange={handleStateChange} rows={10} className='desc' />
          </label>
          <label>
            <p>Delivery Date</p>
            <input type="text" name="delivery_time" value={product.delivery_time} onChange={handleStateChange} placeholder='1 week' />
          </label>
          <label>
            <p>Quantity</p>
            <input type="number" name="quantity" value={product.quantity} onChange={handleStateChange} placeholder='5' />
          </label>
          <br /><br />
          <button onClick={handleSubmit} className='upload-btn'>Update</button>
        </div>
      </div>
    </div>
  );
}
