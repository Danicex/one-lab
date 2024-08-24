import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from './AuthContext'



export default function SignUpBuyer() {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userComPassword, setUserComPassword] = useState('')
    const {buyerSignUp} = useContext(AuthContext)

const handleSubmit = (e)=>{
  e.preventDefault()
  if(userPassword !== userComPassword){
    <div style={{padding:'20px 10px',  background:'red', color:'white', width:'30%', margin:'auto'}}> password don't macth </div>
  }
  buyerSignUp(userEmail, userPassword)
}

  return (
    <div className="auth-container">
      <div className="auth-side-img"></div>
      <div className="auth-form" id="seller-form">
        <h1>Sign up</h1>
        <p className="auth-subtitle">Provide email and password to create an account</p>
        <div className="auth-fields">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            id='auth-input'
          />
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            placeholder="Password"
            id='auth-input'
          />
          <input
            type="password"
            onChange={(e) => setUserComPassword(e.target.value)}
            value={userComPassword}
            placeholder="Confirm Password"
            id='auth-input'
          />
          <button onClick={handleSubmit} className="auth-submit-btn">Sign up</button>
        </div>
        <p className="auth-alt-option">or <Link to={'/login_buyer'}>login</Link></p>
      </div>
    </div>
  )
}
