import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import FlutterwavePayment from './FlutterwavePayment';
import { FaWallet } from "react-icons/fa";

export default function ProductDetail() {
    const [productData, setProductData] = useState({});
    const [sellerProfile, setSellerProfile] = useState({});
    const [count, setCount] = useState(1);
    const location = useLocation();
    const { id } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                setProductData(res.data);
                const sellerId = res.data.seller_id;
                axios.get(`http://localhost:3000/sellers/${sellerId}/profile`)
                    .then(response => {
                        setSellerProfile(response.data);
                    })
                    .catch(err => {
                        console.log('Error fetching seller profile:', err);
                    });
            })
            .catch(err => {
                console.error('Error fetching product:', err);
            });
    }, [id]);

    const addProduct = () => {
        setCount((prevCount) => prevCount < productData.quantity ? prevCount + 1 : prevCount);
    };

    const removeProduct = () => {
        setCount((prevCount) => prevCount > 1 ? prevCount - 1 : prevCount);
    };

    const goToSellerProfile = (id) => {
        navigate('/view_seller_profile', { state: { id } });
    }

    return (
        <div className='bg-product-detail'>
            <div className='view-product-details'>
                <section className='first'>
                    <img src={productData.image_url} alt={productData.name} className='detail-img' />
                    <br />
                    <section>
                        <h1>{productData.name}</h1>
                        <h3>{productData.price}{productData.currency}</h3>
                    </section>
                </section>
                <p>{productData.description}</p>
                <h4>{productData.quantity} products left</h4> 
                
                <div className="cart">
                    <p>Quantity</p>
                    <button onClick={removeProduct}> - </button>
                    <h3>{count}</h3>
                    <button onClick={addProduct}> + </button>
                </div>

                <div className="seller-profile">
                    <img 
                        src={sellerProfile.image_url} 
                        alt={sellerProfile.store_name} 
                        className='seller-profile-img'
                        onClick={() => goToSellerProfile(productData.seller_id)}
                    />
                    <h3 
                        onClick={() => goToSellerProfile(productData.seller_id)} 
                        className='profile-link'
                    >
                        #{sellerProfile.store_name}
                    </h3>
                </div>
            </div>

            <div className="glass">
                <h1>Payment Checkout</h1>
                <div className="x">
                    <h3>Total price: {productData.price * count}{productData.currency}</h3> 
                    <p>Delivery in {productData.delivery_time}</p> 
                    <span className='y'>
                        <FlutterwavePayment
                            description={productData.description}
                            price={productData.price * count} 
                            name={productData.name}
                            seller_id={productData.seller_id}
                            id={productData.id}
                        /> 
                        <FaWallet className='icon-w' />
                    </span>
                </div>
                <p style={{ color: '#fff' }}>Thank you for shopping with us  </p>
            </div>
        </div>
    );
}
