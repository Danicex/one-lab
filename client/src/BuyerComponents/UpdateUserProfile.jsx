import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UpdateUserProfile() {
  const { buyerId } = useContext(AuthContext);
  const [profileInput, setProfileInput] = useState({
    phone_number: '',
    username: '',
  });
  const [fetchedImage, setFetchedImage] = useState([])
  const [image, setImage] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${buyerId}/buyer_profile`).then(
      res => {
        const fetchedData = res.data
        setProfileInput({
          phone_number: fetchedData.phone_number,
          username: fetchedData.name,
        })
        setLoaded(true)
        setFetchedImage(fetchedData.image_url)
      }
    ).catch(err => {
      console.log(err)
      setLoaded(false)
    })
  }, [])
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(fetchedImage);
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

    axios.put(`http://localhost:3000/users/${buyerId}/buyer_profile`, formData, {
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
        {
          preview ? (
            <img src={preview} alt="Preview" style={{ width: '20%', borderRadius: '50%' }} />)  : (<img src={fetchedImage} alt="Fetched" style={{ width: '20%', borderRadius: '50%' }}/>)
      }

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
