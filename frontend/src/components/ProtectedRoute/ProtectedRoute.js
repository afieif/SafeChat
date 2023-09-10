import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const {user} = useAuth();
  return ( 
    <div>
    {user? <Outlet/>:<Navigate to='/login' replace={true}/>}
    </div>
  )
}