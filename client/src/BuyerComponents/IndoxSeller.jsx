import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";

export default function IndoxSeller() {
  const { buyerId } = useContext(AuthContext);
  const location = useLocation()
  const { sellerId } = location.state || {}
  const navigate = useNavigate();
  const [content, setContent] = useState('Hi there, I will like you to make a dress for me');

  const [buyerProfile, setBuyerProfile] = useState([])



  useEffect(() => {
    axios.get(`http://localhost:3000/users/${buyerId}/buyer_profile`)
      .then(response => {
        setBuyerProfile(response.data)
      })
      .catch(err => (console.log(err)))
  }, [buyerId])

  const handlePost = () => {

    const formData = new FormData()
  
    formData.append('inbox[content]', content)
    formData.append('inbox[buyer_id]', buyerId)
    formData.append('inbox[seller_id]', sellerId)

    axios.post(`http://localhost:3000/inboxes`, formData)
      .then(res => {
        console.log(res.status)
        navigate('/store')
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='inbox-layout'>
      <h1 style={{textAlign:'center'}}>make a direct order</h1>

      <div className="chat-input">
        <div className="chat-content">

        </div>
        <textarea name="" id="inbox-content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handlePost} style={{borderRadius:'10px'}}><IoIosSend style={{fontSize:'27px'}}/></button>
      </div>


    </div>
  )
}
