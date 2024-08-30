import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function SellerChatlist() {
  const { sellerId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [chatData, setChatData] = useState([])
  const [noChats,   setNoChat] = useState(null)
  



  useEffect(() => {

      axios.get(`http://localhost:3000/messages/seller_message/${sellerId}`).then(
        res => { 
          setChatData(res.data) 
          setNoChat(false)      
         }
      ).catch(
        err => { 
          console.log(err) 
        setNoChat(true)
        }
      )

  }, [sellerId])

  const openChat = (id,  buyer_id)=>{
    navigate('/sellerchats', {state: {id, buyer_id}})
  }

  return (
    <div className='inbox-layout2'>
        <h1>your messages</h1>
        {noChats &&(<p> No messages yet</p>)}
        <ul className='chat-list-map'>
     {chatData.map(({message, buyer_profile })=>(
            <li key={message.id} className='chat-list-map2' onClick={()=>openChat(message.id, buyer_profile.user_id)}>
                <div className="chat-list-contact">
                    <img src={buyer_profile.image_url} alt=""  className='chat-list-profile'/>
                    <p>{buyer_profile.name}</p>
                    <small className='chat-list-date'><i>Date:</i>{new Date(buyer_profile.created_at).toLocaleDateString()}</small>
                </div>
            </li>
     ))}
        </ul>
    </div>
  )
}
