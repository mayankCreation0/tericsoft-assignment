import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { context } from '../Context/Context'

const Home = () => {
  const { authstate } = useContext(context);
  const navigate = useNavigate()
  console.log(authstate)
  return (
    <>
      {authstate ?
        <div>
          <Navbar />
          home
        </div>
        : navigate('/')}
    </>
  )
}

export default Home
