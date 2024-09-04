import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";

export default function IndoxSeller() {
  const { buyerId } = useContext(AuthContext);
  const location = useLocation()
  const { id } = location.state || {}
  const navigate = useNavigate();
  const [content, setContent] = useState('Hi there, I will like you to make a dress for me');
  const [chatData, setChatData] = useState([])
  const [chatupdate, setChatupdate] = useState(0)
  const [buyerProfile, setBuyerProfile] = useState([])
const [buyer, setBuyer] = useState(true)




  useEffect(() => {

    const getChat = () => {
      axios.get(`http://localhost:3000/inboxes`).then(
        res => { setChatData([res.data]) }
      ).catch(
        err => { console.log(err) }
      )
    }

    axios.get(`http://localhost:3000/users/${buyerId}/buyer_profile`)
      .then(response => {
        setBuyerProfile(response.data)
      })
      .catch(err => (console.log(err)))

    getChat()
  }, [buyerId, chatupdate])

  const handlePost = () => {

    const formData = new FormData()

    formData.append('inbox[content]', content)
    formData.append('inbox[buyer_id]', buyerId)
    formData.append('inbox[seller_id]', id)
    formData.append('inbox[buyer]', buyer)
console.log(id);

    axios.post(`http://localhost:3000/inboxes/`, formData)
      .then(res => {

        const formData2 = new FormData()
        formData2.append('message[seller_id]', id )
        formData2.append('message[buyer_id]', buyerId)
        formData2.append('message[inbox_id]', res.data.id )

        axios.post(`http://localhost:3000/messages`,  formData2 ).then(
          response => console.log(response.status)).catch(
            err=>console.log(err))

        console.log(res.status)
        setChatupdate(chatupdate + 1)

      }).catch(err => {
        console.log(err.data.flag_message)
      })
  }

  const  handleBack =()=>{
    navigate('/store')
  }
  return (
    <div className='inbox-layout'>
      <button  onClick={handleBack}  className='back-btn'>←—</button>
      <h1 style={{ textAlign: 'center' }}>make a direct order</h1>

      <div className="chat-input">
      <div className="chat-content">
          {chatData.map((item) => (
            <div key={item.id}>
              <p>{item.content}</p>

            </div>
          ))}
        </div>
        <textarea name="" id="inbox-content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handlePost} className='send-inbox-btn'>
          <IoIosSend style={{ fontSize: '27px' }} /></button>
      </div>


    </div>
  )
}
