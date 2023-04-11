import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginSignupPage from '../Pages/LoginSignupPage'
import Home from '../Pages/Home'
import Profile from '../Pages/Profile'
import History from '../Pages/History'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginSignupPage/>} />
            <Route path='/home' element={ <Home/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/history' element={<History/>} />
        </Routes>
    )
}

export default AllRoutes
