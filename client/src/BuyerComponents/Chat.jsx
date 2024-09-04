import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";

export default function Chat() {
  const { buyerId } = useContext(AuthContext)
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [chatData, setChatData] = useState([])
  const [chatupdate, setChatupdate] = useState(0);
  const location = useLocation();
  const { id, seller_id } = location.state || {};
  const [buyer, setBuyer] = useState(true)
  const [file,  setFile] = useState(false)


  useEffect(() => {

    const getChat = () => {
      axios.get(`http://localhost:3000/inboxes/buyerchat?buyer_id=${buyerId}&seller_id=${seller_id}`).then(
        res => { setChatData(res.data) }
      ).catch(
        err => { console.log(err) }
      )
    }

    getChat()
  }, [buyerId, chatupdate])

  const handlePost = () => {

    const formData = new FormData()

    formData.append('inbox[content]', content)
    formData.append('inbox[buyer_id]', buyerId)
    formData.append('inbox[seller_id]', seller_id)
    formData.append('inbox[buyer]', buyer)


    axios.post(`http://localhost:3000/inboxes`, formData)
      .then(res => {
        setContent('')
        console.log(res.status)
        setChatupdate(chatupdate + 1)
        const formData2 = new FormData()
        formData2.append('message[seller_id]', seller_id )
        formData2.append('message[buyer_id]', buyerId)
        formData2.append('message[inbox_id]', res.data.id )

        axios.put(`http://localhost:3000/messages/${id}`,  formData2 ).then(
          response => console.log(response.status)).catch(
            err=>console.log(err))
      }).catch(err => {
        console.log(err)
      })
  }

  const  handleBack =()=>{
    navigate('/store')
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
        <label htmlFor="file_upload">
      <FiPaperclip className='paper-clip'/>
          <input type="file"
          id='file_upload'
          style={{display:'none'}} 
          />
        </label>
        <textarea name="" id="inbox-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder='message...'/>
        <button onClick={handlePost} className='send-inbox-btn'>
          <IoIosSend style={{ fontSize: '27px' }} /></button>
      </div>


    </div>
  )
}
