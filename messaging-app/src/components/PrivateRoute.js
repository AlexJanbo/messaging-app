import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ user, children }) {

    if(!user) {
        console.log("Protected route")
        return <Navigate to='/' replace />
    }

  return (children)
}

export default PrivateRoute