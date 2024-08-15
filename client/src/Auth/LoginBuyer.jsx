import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from './AuthContext'



export default function LoginBuyer() {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const{ buyerLogin} = useContext(AuthContext)

const handleSubmit = (e)=>{
  e.preventDefault()
  buyerLogin(userEmail, userPassword)
}

  return (
    <div className="auth-container">
      <div className="auth-side-img"></div>
      <div className="auth-form" id="seller-form">
        <h1>Login</h1>
        <p className="auth-subtitle">Provide credentials to login into your account</p>
        <div className="auth-fields">
          <input
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            placeholder="Password"
          />
          <button onClick={handleSubmit} className="auth-submit-btn">Login</button>
          <p className="auth-alt-option">or <Link to={'/signup_buyer'}>sign up</Link></p>
        </div>
      </div>
    </div>
  )
}
