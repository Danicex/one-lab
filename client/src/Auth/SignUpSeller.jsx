import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthContext'



export default function SignUpSeller() {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userComPassword, setUserComPassword] = useState('')
  const { sellerSignUp } = useContext(AuthContext)
  const [error, setError] = useState(false)



  const handleSubmit = (e) => {
    e.preventDefault()
    if (userPassword !== userComPassword) {
      setError(true)
    }else{
      setError(false)
    sellerSignUp(userEmail, userPassword)
  }
  }

  return (
    <div className="auth-container">
    {error && (
      <div className="auth-error">
        Passwords don't match
      </div>
    )}
    <div className="auth-side-img"></div>
    <div className="auth-form">
      <div className="auth-fields" id="seller-form">
        <h1 className="auth-heading">Provide Your Authentication Details</h1><br />
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
        <input
          type="password"
          onChange={(e) => setUserComPassword(e.target.value)}
          value={userComPassword}
          placeholder="Confirm Password"
        /> <br />
        <button onClick={handleSubmit} className="auth-submit-btn">Submit</button>
        <p className="auth-alt-option">or <Link to={'/seller_login'}>login</Link></p>
      </div>
    </div>
  </div>
  )
}
