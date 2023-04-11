import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import { context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const { authstate } = useContext(context);
  const navigate = useNavigate()
  console.log(authstate)
  return (
    <>
      {authstate ?
        <div>
          <Navbar />
          history
        </div>
        : navigate('/')}
    </>
  )
}

export default History
