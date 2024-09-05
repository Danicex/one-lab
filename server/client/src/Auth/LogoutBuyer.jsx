import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import './Auth.css'

export default function LogoutBuyer() {
    const {logoutBuyer} = useContext(AuthContext)
  return (
    <div className='logout-layout'>
      <p>are you sure you want to end this session ?</p>
      <button onClick={logoutBuyer}>yes</button>

    </div>
  )
}
