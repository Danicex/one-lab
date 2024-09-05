import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Chatlist() {
  const { buyerId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [chatData, setChatData] = useState([])
  const [noChats,   setNoChat] = useState(null)

  



  useEffect(() => {

      axios.get(`http://localhost:3000/messages/buyer_message/${buyerId}`).then(
        res => { 
          setChatData(res.data)
          setNoChat(false)       
         }
      ).catch(
        err => { console.log(err) 
          setNoChat(true)
        }
      )

  }, [buyerId])

  const openChat = (id,  seller_id)=>{
    navigate('/chats', {state: {id, seller_id}})
  }

  return (
    <div className='inbox-layout2'>
        <h1>your messages</h1>
        {noChats &&(<p> No messages yet</p>)}
        <ul className='chat-list-map'>
     {chatData.map(({message, seller_profile })=>(
            <li key={message.id} className='chat-list-map2' onClick={()=>openChat(message.id, seller_profile.seller_id)}>
                <div className="chat-list-contact">
                    <img src={seller_profile.image_url} alt=""  className='chat-list-profile'/>
                    <p>{seller_profile.store_name}</p>
                    <small className='chat-list-date'><i>Date:</i>{new Date(seller_profile.created_at).toLocaleDateString()}</small>
                </div>
            </li>
     ))}
        </ul>
    </div>
  )
}
