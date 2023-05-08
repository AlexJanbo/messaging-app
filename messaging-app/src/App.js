import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './pages/Register'

export default function App() {

    return(
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />}/>
                <Route path='/register' element={<Register />}/>
            </Routes>
        </Router>
    )
}