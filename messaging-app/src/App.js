import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { useSelector } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'

export default function App() {

    const { user } = useSelector((state) => state.auth)

    const isLoggedIn = () => {
        if(user) {
            return true
        } else {
            return false
        }
    }

    return(
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/dashboard' 
                    element={
                        <PrivateRoute user={user}>
                            <Dashboard />
                        </PrivateRoute> 
                    } />
                <Route path='*' element={<Navigate to='/dashboard' />}/>
            </Routes>
        </Router>
    )
}