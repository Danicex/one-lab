import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default function UpdateProfile() {
  const [countryValue, setCountryValue] = useState(null); 
  const options = countryList().getData();
  const [profileData, setProfileData] = useState({
    fullname: '',
    phone_number: '',
    address: '',
    bank_name: '',
    account_number: '',
    bank_code: '',
    currency: '',
    description: '',
    store_name: '',
    website: '',
    social: '',
  });
  const { sellerId } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [preview2, setPreview2] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/sellers/${sellerId}/profile`)
      .then(res => {
        const fetchedData = res.data;
        setProfileData({
          fullname: fetchedData.fullname,
          phone_number: fetchedData.phone_number,
          address: fetchedData.address,
          bank_name: fetchedData.bank_name,
          account_number: fetchedData.account_number,
          bank_code: fetchedData.bank_code,
          currency: fetchedData.currency,
          description: fetchedData.description,
          store_name: fetchedData.store_name,
          country: fetchedData.country,
          website: fetchedData.website,
          social: fetchedData.social
        });
        setCountryValue(options.find(option => option.label === fetchedData.country)); 
      })
      .catch(err => {
        console.log(err);
      });
  }, [sellerId, options]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file)
    setImage(file);
    if (file) {
      const renderImage = URL.createObjectURL(file);
      setPreview(renderImage);
    } else {
      setPreview(null);
    }
  }
  const handleFileChange2 = (e) => {
    const file2 = e.target.files[0];
    setBannerImage(file2)
    
    if (file2) {
      const renderImage2 = URL.createObjectURL(file2);
      setPreview2(renderImage2);
    } else {
      setPreview2(null);
    }
  }

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('profile[fullname]', profileData.fullname);
    formData.append('profile[phone_number]', profileData.phone_number);
    formData.append('profile[address]', profileData.address);
    formData.append('profile[bank_name]', profileData.bank_name);
    formData.append('profile[account_number]', profileData.account_number);
    formData.append('profile[bank_code]', profileData.bank_code);
    formData.append('profile[currency]', profileData.currency);
    formData.append('profile[description]', profileData.description);
    formData.append('profile[store_name]', profileData.store_name);
    formData.append('profile[country]', countryValue ? countryValue.label : '');
    formData.append('profile[website]', profileData.website);
    formData.append('profile[social]', profileData.social);
    if (image && bannerImage) {
      formData.append('profile[image]', image);
      formData.append('profile[banner]', bannerImage);
    }

    axios.put(`http://localhost:3000/sellers/${sellerId}/profile`, formData)
      .then(res => {
        console.log("Profile updated successfully");
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleChange = (selectedOption) => {
    setCountryValue(selectedOption);
  };

  return (
    <div className="create-profile-layout">
      <div className="form-section" id='form-section1'>
        <div className="left">
          <h1>Update Your Store Profile</h1>

          {preview && <img src={preview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />}
          {preview2 && <img src={preview2} alt="Image Preview" style={{ width: '100px', height: '100px' }} />}
          <label htmlFor="img-space">
            <p>profile  image</p>
            <input type="file" onChange={handleFileChange} id='img-space' />
            <p>Add banner image</p>
            <input type="file" onChange={handleFileChange2} id='img-space' />
          </label>

          <label htmlFor="store_name">
            <p>Store name</p>
            <input type="text" name="store_name" value={profileData.store_name} onChange={handleStateChange} placeholder='Store name' />
          </label>

          <label htmlFor="phone_number">
            <p>Phone number</p>
            <input type="tel" name="phone_number" value={profileData.phone_number} onChange={handleStateChange} placeholder='Phone number' />
          </label>

          <label htmlFor="address">
            <p>Address</p>
            <input type="text" name="address" value={profileData.address} onChange={handleStateChange} placeholder='Address' />
          </label>

          <label htmlFor="country-list">
            <p>Country</p>
            <Select
              options={options}
              value={countryValue}
              onChange={handleChange}
              placeholder="Select a country"
              id='country-list'
            />
          </label>

          <label htmlFor="website">
            <p>Website link</p>
            <input type="text" name="website" value={profileData.website} onChange={handleStateChange} placeholder='http://example.com' />
            <small style={{ textAlign: 'end' }}>If you don't have a website, you can create one <a href="#">here</a></small>
          </label>

          <label htmlFor="social">
            <p>Social media link</p>
            <input type="text" name="social" value={profileData.social} onChange={handleStateChange} placeholder='@johndoe/facebook.com' />
          </label>

          <label htmlFor="description">
            <p>Description</p>
            <textarea name="description" id="description" placeholder='For example: we sell rare and authentic wears' rows={10} value={profileData.description} onChange={handleStateChange} className='desc'></textarea>
          </label>
        </div>

        <div className="right">
          <h3>Enter Your Banking Details for Business Transaction</h3><br />

          <label htmlFor="bank_name">
            <p>Bank name</p>
            <input type="text" name="bank_name" value={profileData.bank_name} onChange={handleStateChange} placeholder='Bank name' />
          </label>

          <label htmlFor="fullname">
            <p>Account name</p>
            <input type="text" name="fullname" value={profileData.fullname} onChange={handleStateChange} placeholder='Account name' />
          </label>

          <label htmlFor="bank_code">
            <p>Bank code</p>
            <input type="number" name="bank_code" value={profileData.bank_code} onChange={handleStateChange} placeholder='Bank code' />
          </label>

          <label htmlFor="account_number">
            <p>Account number</p>
            <input type="number" name="account_number" value={profileData.account_number} onChange={handleStateChange} placeholder='Account number' />
          </label>

          <label htmlFor="currency">
            <p>Currency</p>
            <input type="text" name="currency" value={profileData.currency} onChange={handleStateChange} list='currency' placeholder='Currency' />
          </label>

          <datalist id='currency'>
            <option value="NGN" />
            <option value="USD" />
            <option value="YEN" />
          </datalist><br /><br />

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
