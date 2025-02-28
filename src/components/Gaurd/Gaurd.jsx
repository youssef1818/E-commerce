import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Gaurd({children}) {
    const token=localStorage.getItem('token')
    
  return <>
  {token? children:<Navigate to={'/login'}/>}
  </>
}
