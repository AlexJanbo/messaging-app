import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import { ThemeProvider, createTheme } from '@mui/material'
import { lightTheme } from './theme'
import Profile from './pages/Profile'
import MyProfile from './pages/MyProfile'

export default function App() {

    const { user } = useSelector((state) => state.auth)


    return(
        <>
            <ThemeProvider theme={lightTheme}></ThemeProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Homepage />}/>
                    <Route path='/dashboard' 
                        element={
                            <PrivateRoute user={user}>
                                <Dashboard />
                            </PrivateRoute> 
                        } 
                    />
<                   Route exact path='/my-profile'
                        element={
                            <PrivateRoute user={user}>
                                <MyProfile />
                            </PrivateRoute>
                        } 
                    />
                    <Route exact path='/profile/:userId'
                        element={
                            <PrivateRoute user={user}>
                                <Profile />
                            </PrivateRoute>
                        } 
                    />
                    <Route path='*' element={<Navigate to='/dashboard' />}/>
                </Routes>
            </Router>
        </>
    )
}