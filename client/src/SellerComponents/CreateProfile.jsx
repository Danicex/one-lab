import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import './ProfileStyles.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default function CreateProfile() {
  const [countryValue, setCountryValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const options = countryList().getData();
  const [bannerImage, setBannerImage] = useState(null);
  const [image, setImage] = useState(null);
  const [designer, setDesigner] = useState(false)
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
    website: '',
    social: '',
  });
  const [previewImg, setPreviewImg] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);

  const navigate = useNavigate();
  const { sellerId } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImg(imageUrl);
    } else {
      setPreviewImg(null);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    if (file) {
      const bannerUrl = URL.createObjectURL(file);
      setPreviewBanner(bannerUrl);
    } else {
      setPreviewBanner(null);
    }
  };

  const moveToNext = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const moveToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
    formData.append('profile[country]', countryValue ? countryValue.label : '');
    formData.append('profile[social]', profile.social);
    formData.append('profile[website]', profile.website);
    formData.append('profile[seller_id]', sellerId);
    formData.append('profile[designer]', designer);
    if (image) {
      formData.append('profile[image]', image);
    }
    if (bannerImage) {
      formData.append('profile[banner]', bannerImage);
    }

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

  const handleCountryChange = (selectedOption) => {
    setCountryValue(selectedOption);
  };
  const checkDesigner = () => {
    setDesigner(true)
  }
  return (
    <div className="profile-layout2">
      <div className="auth-side-img2"></div>
      <section className="profile-form-section">
        <h1 className="form-title">Create Your Store Profile</h1>

        <div className="profile-form-group2">
          <div className="profile-form-column">
            {currentPage === 1 && (
              <>
                {previewImg && (
                  <img src={previewImg} style={{ width: '100px', height: '100px' }} alt="Profile Preview" />
                )}
                {previewBanner && (
                  <img src={previewBanner} alt="Banner Preview" style={{ width: '100px', height: '100px' }} />
                )}
                <label className="form-label2">
                  <p>Add Profile Image</p>
                  <input type="file" onChange={handleFileChange} id='img-space' className="file-input" />
                </label>
                <label className="form-label2">
                  <p>Add Banner Image</p>
                  <input type="file" onChange={handleBannerChange} id='banner-space' className="file-input" />
                </label>
                <label className="form-label2">
                  <p>Store Name</p>
                  <input type="text" name="storeName" value={profile.storeName} onChange={handleChange} placeholder='Store Name' className="text-input" />
                </label>
                <label htmlFor="store_name">
                  <p>select if you are a designer</p>
                  <input type="checkbox" onClick={checkDesigner} />
                </label>
                <label className="form-label2">
                  <p>Phone Number</p>
                  <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} placeholder='Phone Number' className="text-input" />
                </label>
                <label className="form-label2">
                  <p>Address</p>
                  <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder='Address' className="text-input" />
                </label>
                <button onClick={moveToNext}>Next</button>
              </>
            )}
            {currentPage === 2 && (
              <>
                <label htmlFor="country">
                  <p>Country</p>
                  <Select
                    options={options}
                    value={countryValue}
                    onChange={handleCountryChange}
                    placeholder="Select a country"
                    id='country-list'
                  />
                </label>
                <label htmlFor="website">
                  <p>Website Link</p>
                  <input type="text" name="website" value={profile.website} onChange={handleChange} placeholder='http://example.com' /> <br />
                  <small style={{ textAlign: 'end' }}>If you don't have a website, you can create one <a href="">here</a></small>
                </label>
                <label htmlFor="social">
                  <p>Social Media Link</p>
                  <input type="text" name="social" value={profile.social} onChange={handleChange} placeholder='@johndoe/facebook.com' />
                </label>
                <label className="form-label">
                  <p>Description</p>  <br />
                  <textarea name="description" id="description" placeholder='For example: we sell rare and authentic wears' rows={10} value={profile.description} onChange={handleChange} className="textarea-input"></textarea>
                </label>

                <div className="btn-next">
                  <button onClick={moveToPrev}>Prev</button>
                  <button onClick={moveToNext}>Next</button>
                </div>
              </>
            )}
            {currentPage === 3 && (
              <>
                <h3 className="form-subtitle">Enter Your Banking Details for Business Transaction</h3>
                <label className="form-label2">
                  <p>Bank Name</p>
                  <input type="text" name="bankName" value={profile.bankName} onChange={handleChange} placeholder='Bank Name' className="text-input" />
                </label>
                <label className="form-label2">
                  <p>Account Name</p>
                  <input type="text" name="fullname" value={profile.fullname} onChange={handleChange} placeholder='Account Name' className="text-input" />
                </label>
                <label className="form-label2">
                  <p>Bank Code</p>
                  <input type="number" name="bankCode" value={profile.bankCode} onChange={handleChange} placeholder='Bank Code' className="text-input" />
                </label>
                <label className="form-label2">
                  <p>Account Number</p>
                  <input type="number" name="accountNumber" value={profile.accountNumber} onChange={handleChange} placeholder='Account Number' className="text-input" />
                </label>
                <label className="form-label2">
                  <p>Currency</p>
                  <input type="text" name="currency" value={profile.currency} onChange={handleChange} list='currency' placeholder='Currency' className="text-input" />
                  <datalist id='currency'>
                    <option value="NGN" />
                    <option value="USD" />
                    <option value="YEN" />
                  </datalist>
                </label>
                <div className="btn-next">
                  <button onClick={moveToPrev}>Prev</button>
                  <button onClick={handleSubmit} className="submit-btn2">Submit</button>
                </div>

              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
