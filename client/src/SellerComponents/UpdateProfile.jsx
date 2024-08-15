import axios from 'axios';
import React, { useEffect, useState,  useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';


export default function UpdateProfile() {
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
  });
  const { sellerId } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
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
        });
      }).catch(err => { console.log(err) });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const renderImage = URL.createObjectURL(file);
      setPreview(renderImage);
    } else {
      setPreview(null);
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
    if (image) {
      formData.append('profile[image]', image);
    }

    axios.put(`http://localhost:3000/sellers/${sellerId}/profile`, formData)
      .then(res => {
        console.log("Profile updated successfully");
      }).catch(err => { console.log(err) });
  }

  return (
    <div className="create-profile-layout">
      <h1>Update Your Store Profile</h1>

      {preview && <img src={preview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />}
      <div className="form-section" id='form-section1'>
        <div className="left">
          <label htmlFor="img-space">
            <p>Add banner image</p>
            <input type="file" onChange={handleFileChange} id='img-space' />
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

          <label htmlFor="description">
            <p>Description</p>
            <textarea name="description" id="description" placeholder='For example: we sell rare and authentic wears' rows={10} value={profileData.description} onChange={handleStateChange} className='desc'></textarea>
          </label>
        </div>

        <div className="right">
          <h3>Enter Your Banking Details for Business Transaction</h3> <br />

          <label htmlFor="bank_name">
            <p>Bank name</p>
            <input type="text" name="bank_name" value={profileData.bank_name} onChange={handleStateChange} placeholder='Bank name' />
          </label>

          <label htmlFor="account_number">
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
          </datalist> <br /> <br />

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
