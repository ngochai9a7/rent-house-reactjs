import React from 'react'
import {useFirebase} from "../firebase"
import {Navigate} from 'react-router-dom'
export default function PrivateRoutes({children}) {
  const firebase = useFirebase()
  if (!firebase.user) {
    return <Navigate to='/'/>
  }
  return children;
  
}
