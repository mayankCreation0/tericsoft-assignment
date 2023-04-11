import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginSignupPage from '../Pages/LoginSignupPage'
import Home from '../Pages/Home'
import { context } from '../Context/Context'
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
