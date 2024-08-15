import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Check buyer and seller authenticity
    const [isAuthenticatedBuyer, setIsAuthenticatedBuyer] = useState(!!localStorage.getItem('buyer'));
    const [isAuthenticatedSeller, setIsAuthenticatedSeller] = useState(!!localStorage.getItem('seller'));
    // Client data
    const [seller, setSeller] = useState(localStorage.getItem('seller_data') || null);
    const [buyer, setBuyer] = useState(localStorage.getItem('buyer_data') || null);
    const [buyerId, setBuyerId] = useState(localStorage.getItem('buyer_id') || null);
    const [sellerId, setSellerId] = useState(localStorage.getItem('seller_id') || null);
    const [sellerEmail,setSellerEmail] = useState(
        !!localStorage.getItem('seller_email' || null)
    )
    const [buyerEmail,setBuyerEmail] = useState(
        !!localStorage.getItem('buyer_email' || null)
    )
    const navigate = useNavigate();

    // Use useEffect to check if data is stored in localStorage 
    useEffect(() => {
        const storedBuyer = localStorage.getItem('buyer');
        const storedSeller = localStorage.getItem('seller');

        if (storedBuyer) {
            const parsedBuyerData = JSON.parse(storedBuyer);
            setBuyer(parsedBuyerData);
            setIsAuthenticatedBuyer(true);
        } else {
            setIsAuthenticatedBuyer(false);
            
        }

        if (storedSeller) {
            const parsedSellerData = JSON.parse(storedSeller);
            setSeller(parsedSellerData);
            setIsAuthenticatedSeller(true);
        } else {
            setIsAuthenticatedSeller(false);
            
        }
    }, [navigate]);

    const buyerLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/users/tokens/sign_in', {
                email,
                password
            });
            const buyerData = response.data;
            localStorage.setItem('buyer_data', JSON.stringify(buyerData));
            setBuyer(buyerData);
            console.log(buyerData.resource_owner.id)
            localStorage.setItem('buyer_email', buyerData.resource_owner.email)
            setBuyerEmail(buyerData.resource_owner.email);

            localStorage.setItem('buyer_id', buyerData.resource_owner.id);
            setBuyerId(buyerData.resource_owner.id);
            console.log(buyerData.resource_owner.id)

            localStorage.setItem('buyer', JSON.stringify(buyerData));
            setIsAuthenticatedBuyer(true);
            navigate('/store');
        } catch (error) {
            console.error('Sign-in failed due to:', error);
        }
    };

    const sellerLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/sellers/tokens/sign_in', {
                email,
                password
            });
            const sellerData = response.data;
            localStorage.setItem('seller_data', sellerData.resource_owner);

            setSeller(sellerData.resource_owner);

            localStorage.setItem('seller_email', sellerData.resource_owner.email)
            setSellerEmail(sellerData.resource_owner.email);
            console.log(sellerData.resource_owner.email);


            localStorage.setItem('seller_id', sellerData.resource_owner.id);
            setSellerId(sellerData.resource_owner.id);
            console.log(sellerId)

            localStorage.setItem('seller', JSON.stringify(sellerData));

            setIsAuthenticatedSeller(true);
            navigate('/dashboard');
        } catch (error) {
            console.error('Sign-in failed due to:', error);
        }
    };

    const buyerSignUp = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/users/tokens/sign_up', {
                email,
                password
            });
            const buyerData = response.data;
            localStorage.setItem('buyer_data', JSON.stringify(buyerData));
            setBuyer(buyerData);

            localStorage.setItem('buyer_email', buyerData.resource_owner.email)
            setBuyerEmail(buyerData.resource_owner.email);

            localStorage.setItem('buyer_id', buyerData.resource_owner.id);
            setBuyerId(buyerData.resource_owner.id);
            localStorage.setItem('buyer', JSON.stringify(buyerData));
            setIsAuthenticatedBuyer(true);
            navigate('/user_profile');
        } catch (error) {
            console.error('Sign-up failed due to:', error);
        }
    };

    const sellerSignUp = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/sellers/tokens/sign_up', {
                email,
                password
            });
            const sellerData = response.data;

            localStorage.setItem('seller_data', sellerData.resource_owner);
            setSeller(sellerData.resource_owner);
            console.log(sellerData.resource_owner.email);

            localStorage.setItem('seller_email', sellerData.resource_owner.email)
            setSellerEmail(sellerData.resource_owner.email);

            localStorage.setItem('seller_id', sellerData.resource_owner.id);
            setSellerId(sellerData.resource_owner.id);
            localStorage.setItem('seller', JSON.stringify(sellerData));
            setIsAuthenticatedSeller(true);
            navigate('/create_profile');
            console.log(sellerData);
        } catch (error) {
            console.error('Sign-up failed due to:', error);
        }
    };

    const logoutBuyer = () => {
        setBuyer(null);
        localStorage.removeItem('buyer_data');
        localStorage.removeItem('buyer');
        setIsAuthenticatedBuyer(false);
        navigate('/')
    };

    const logoutSeller = () => {
        setSeller(null);
        localStorage.removeItem('seller_data');
        localStorage.removeItem('seller');
        setIsAuthenticatedSeller(false);
        console.log('logged out seller')
        navigate('/')   
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticatedBuyer,
            isAuthenticatedSeller,
            logoutSeller,
            logoutBuyer,
            sellerSignUp,
            buyerSignUp,
            sellerLogin,
            buyerLogin,
            sellerId,
            buyerId,
            seller,
            sellerEmail,
            buyerEmail
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
