import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfileAuth() {
    const { buyerId } = useContext(AuthContext);
    const [profileInput, setProfileInput] = useState({
        phone_number: '',
        username: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        } else {
            setPreview(null);
        }
    };

    const handleStateChange = (e) => {
        const { name, value } = e.target;
        setProfileInput({ ...profileInput, [name]: value });
    };

    const handleProfilePost = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('buyer_profile[phone_number]', profileInput.phone_number);
        formData.append('buyer_profile[name]', profileInput.username);
        if (image) {
            formData.append('buyer_profile[image]', image);
        }

        axios.post(`http://localhost:3000/users/${buyerId}/buyer_profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log(res.status);
            navigate('/store');
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <div className='auth-container'>
            <div className="auth-side-img"></div>
            <div className="auth-form" id="seller-form">
                <h1>Setup your profile</h1>
                {preview && (
                    <img src={preview} alt="Preview" style={{ width: '20%', borderRadius: '50%'}} />
                )}
                <div className="auth-fields">
                    <label>
                        <p>Profile Image</p>
                        <input type="file" onChange={handleFileChange} />
                    </label>
                    <label>
                        <p>Username</p>
                        <input
                            type="text"
                            name="username"
                            placeholder='john doe'
                            value={profileInput.username}
                            onChange={handleStateChange}
                        />
                    </label>
                    <label>
                        <p>Phone Number</p>
                        <input
                            type="tel"
                            name="phone_number"
                            placeholder='123 456 78'
                            value={profileInput.phone_number}
                            onChange={handleStateChange}
                        />
                    </label>
                    <button onClick={handleProfilePost} className='auth-submit-btn'>Submit</button>
                </div>
            </div>
        </div>
    );
}
