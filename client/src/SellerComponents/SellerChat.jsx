import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";

export default function SellerChat() {
  const { sellerId } = useContext(AuthContext)
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [chatData, setChatData] = useState([])
  const [chatupdate, setChatupdate] = useState(0);
  const location = useLocation();
  const { id, buyer_id } = location.state || {};
  const [buyer, setBuyer] = useState(false)


  useEffect(() => {

    const getChat = () => {
      axios.get(`http://localhost:3000/inboxes/sellerchat?seller_id=${sellerId}&buyer_id=${buyer_id}`).then(
        res => { setChatData(res.data) }
      ).catch(
        err => { console.log(err) }
      )
    }

    getChat()
  }, [sellerId, chatupdate])

  const handlePost = () => {

    const formData = new FormData()

    formData.append('inbox[content]', content)
    formData.append('inbox[buyer_id]', buyer_id)
    formData.append('inbox[seller_id]', sellerId)
    formData.append('inbox[buyer]', buyer)


    axios.post(`http://localhost:3000/inboxes`, formData)
      .then(res => {
        setContent('')
        const formData2 = new FormData()
        formData2.append('message[seller_id]', sellerId )
        formData2.append('message[buyer_id]', buyer_id)
        formData2.append('message[inbox_id]', res.data.id )

        axios.put(`http://localhost:3000/messages/${id}`,  formData2 ).then(
          response => console.log(response.status)).catch(
            err=>console.log(err))

        console.log(res.status)
        setChatupdate(chatupdate + 1)
      }).catch(err => {
        console.log(err)
      })
  }

  const  handleBack =()=>{
    navigate('/dashboard')
  }
  return (
    <div className='inbox-layout'>
      <button  onClick={handleBack}  className='back-btn'>←—</button>
      <h3 style={{ textAlign: 'center', padding:'10px 0' }}>chats</h3>

        <div className="chat-content2">
          {chatData.map(({inbox, seller_profile, buyer_profile}) => (
            <div key={inbox.id} className='message-chat'>

              <img src={ inbox.buyer === true ? buyer_profile.image_url : seller_profile.image_url} alt="" className='chat-list-profile'/>

              <div className="message-content">
              <p>{inbox.content}</p>
              <small>{new Date(inbox.created_at).toLocaleString()}</small>
              </div>

            </div>
          ))}
        </div>

      <div className="chat-input">
        <textarea name="" id="inbox-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder='message...' />
        <button onClick={handlePost} className='send-inbox-btn'>
          <IoIosSend style={{ fontSize: '27px' }} /></button>
      </div>


    </div>
  )
}
