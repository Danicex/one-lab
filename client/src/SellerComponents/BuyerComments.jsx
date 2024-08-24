import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

export default function BuyerComments() {
  const { sellerId } = useContext(AuthContext);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/comments/by_seller/${sellerId}`).then(
      res => {
        setComment(res.data)
      }
    ).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="comments-component">
      <div className='flex-comment'>

        {comment.map(({ comment, user_profile = {}, product = {} }, index) => (
          <div key={index} className="comment-wrap">
            <div className="comment-user">

            {user_profile.image_url && (
              <img
              src={user_profile.image_url}
              alt="User profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%", border:'3px #ea2340  solid' }}
              />
            )}
            <h3>{user_profile.name || "Anonymous"}</h3>
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            </div>
            <br />
            <p>{comment.body}</p>
            <br />
            <p>Product: {product.name}</p>
            <p>Price: {product.price} {product.currency}</p>
          
          </div>
        ))}
      </div>
    </div>

  )
}
