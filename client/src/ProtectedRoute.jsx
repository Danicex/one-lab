import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import  {AuthContext} from './Auth/AuthContext'

export default function ProtectedRoute({children}) {
    const isAuthenticatedBuyer  = useContext(AuthContext);
    const isAuthenticatedSeller  = useContext(AuthContext);

  return isAuthenticatedBuyer && isAuthenticatedSeller ? children : <Navigate to='/' />;

  
}
