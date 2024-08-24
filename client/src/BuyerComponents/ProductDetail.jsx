import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import FlutterwavePayment from './FlutterwavePayment';
import { FaWallet } from "react-icons/fa";
import { AuthContext } from '../Auth/AuthContext';

export default function ProductDetail() {
    const [productData, setProductData] = useState({});
    const [sellerProfile, setSellerProfile] = useState({});
    const [count, setCount] = useState(1);
    const [body, setBody] = useState('')
    const location = useLocation();
    const { id } = location.state || {};
    const navigate = useNavigate();
    const {buyerId} =  useContext(AuthContext)
    const [sellerId, setSellerId] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                setProductData(res.data);
                const x = res.data.seller_id
                setSellerId(x)
                axios.get(`http://localhost:3000/sellers/${x}/profile`)
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

    const handleComment =()=>{
        const formData = new FormData()
        formData.append('comment[user_id]', buyerId );
        formData.append('comment[body]', body)
        formData.append('comment[seller_id]', sellerId)
        formData.append('comment[products_id]', id )
        axios.post(`http://localhost:3000/comments`, formData ).then(res=> console.log(res.status))
        .catch(err => console.log(err))
        console.log(id)
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
                    <h3>Total price: <span className='special-text'> {productData.price * count}{productData.currency}</span></h3> 
                    <p>Delivery in <span style={{color:'orange'}}>{productData.delivery_time}</span></p> 
                    <span className='y'>
                        <FlutterwavePayment
                            description={productData.description}
                            price={productData.price * count} 
                            name={productData.name}
                            seller_id={productData.seller_id}
                            id={productData.id}
                            className ="pay-btn"
                        /> 
                        <FaWallet className='icon-w' />
                    </span>
                </div>
                <p style={{ color: '#fff' }}>Thank you for shopping with us  </p>

                <textarea name="" id="" rows={10} cols={20} value={body} onChange={(e)=>setBody(e.target.value)}  placeholder='add a comment on the product you just bought'></textarea>
                <small style={{textAlign:'end', color: '#bfbfff'}}>Your comments gives feedback to the seller </small>
                <button onClick={handleComment}>post</button>
            </div>
        </div>
    );
}
