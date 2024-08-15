import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import './ProfileStyles.css';

export default function CreateProfile() {
  const [profile, setProfile] = useState({
    fullname: '',
    phoneNumber: '',
    address: '',
    bankName: '',
    bankCode: '',
    accountNumber: '',
    currency: '',
    storeName: '',
    description: '',
  });
  const [banner, setBanner] = useState(null);
  const [previewImg, setPreviewImg] = useState(null)

  const navigate = useNavigate();
  const { sellerId } = useContext(AuthContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    setBanner(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImg(imageUrl)
    } else {
      setPreviewImg(null)
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('profile[fullname]', profile.fullname);
    formData.append('profile[phone_number]', profile.phoneNumber);
    formData.append('profile[address]', profile.address);
    formData.append('profile[bank_code]', profile.bankCode);
    formData.append('profile[bank_name]', profile.bankName);
    formData.append('profile[account_number]', profile.accountNumber);
    formData.append('profile[currency]', profile.currency);
    formData.append('profile[store_name]', profile.storeName);
    formData.append('profile[description]', profile.description);
    formData.append('profile[image]', banner);
    formData.append('profile[seller_id]', sellerId);

    axios.post(`http://localhost:3000/sellers/${sellerId}/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log(res.status);
        navigate('/dashboard');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="profile-layout">
      <div className="auth-side-img"></div>
      <section className="profile-form-section">
        <h1 className="form-title">Create Your Store Profile</h1>
        {previewImg && (
          <img src={previewImg} className="profile-preview-img" alt="Profile Preview" />
        )}

        <div className="profile-form-group">
          <div className="profile-form-column">
            <label className="form-label">
              <p>Add Banner Image</p>
              <input type="file" onChange={handleFileChange} id='img-space' className="file-input" />
            </label>
            <label className="form-label">
              <p>Store Name</p>
              <input type="text" name="storeName" value={profile.storeName} onChange={handleChange} placeholder='Store Name' className="text-input" />
            </label>
            <label className="form-label">
              <p>Phone Number</p>
              <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} placeholder='Phone Number' className="text-input" />
            </label>
            <label className="form-label">
              <p>Address</p>
              <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder='Address' className="text-input" />
            </label>
            <label className="form-label">
              <p>Description</p>
              <textarea name="description" id="description" placeholder='For example: we sell rare and authentic wears' rows={10} value={profile.description} onChange={handleChange} className="textarea-input"></textarea>
            </label>
          </div>
          <div className="profile-form-column">
            <h3 className="form-subtitle">Enter Your Banking Details for Business Transaction</h3>
            <label className="form-label">
              <p>Bank Name</p>
              <input type="text" name="bankName" value={profile.bankName} onChange={handleChange} placeholder='Bank Name' className="text-input" />
            </label>
            <label className="form-label">
              <p>Account Name</p>
              <input type="text" name="fullname" value={profile.fullname} onChange={handleChange} placeholder='Account Name' className="text-input" />
            </label>
            <label className="form-label">
              <p>Bank Code</p>
              <input type="number" name="bankCode" value={profile.bankCode} onChange={handleChange} placeholder='Bank Code' className="text-input" />
            </label>
            <label className="form-label">
              <p>Account Number</p>
              <input type="number" name="accountNumber" value={profile.accountNumber} onChange={handleChange} placeholder='Account Number' className="text-input" />
            </label>
            <label className="form-label">
              <p>Currency</p>
              <input type="text" name="currency" value={profile.currency} onChange={handleChange} list='currency' placeholder='Currency' className="text-input" />
              <datalist id='currency'>
                <option value="NGN" />
                <option value="USD" />
                <option value="YEN" />
              </datalist>
            </label>
            <button onClick={handleSubmit} className="submit-btn">Submit</button>
          </div>
        </div>
      </section>
    </div>


  );
}
