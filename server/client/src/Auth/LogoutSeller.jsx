import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'

export default function LogoutSeller() {
    const {logoutSeller} = useContext(AuthContext)
  return (
    <div className='logout-layout'>
      <p>Are you sure you want to end this session ?</p>
      <button onClick={logoutSeller}>yes</button>
    </div>
  )
}
