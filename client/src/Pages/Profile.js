import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import {
  Box,
  Avatar,
  Heading,
  Text,
} from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { context } from '../Context/Context'
import Cookies from "universal-cookie";
// import MyLoader from "./Loader";

const Profile = () => {
  const { id } = useParams();
  const cookies = new Cookies();
  const { authstate } = useContext(context);
  const navigate = useNavigate()
  const token = cookies.get('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/profile/${id}`,{headers});
        setUserData(response.data.user);
        console.log(response.data.user)

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);
  return (
    <>
      {authstate ?
      <>
      <Navbar/>
        <Box maxW='500px' mx='auto' mt='50px' p='20px' bg='white' boxShadow='xl' borderRadius='md'>
          {userData ? (
            <>
              <Avatar size='xl' name={userData.name} src={userData.avatar} mx='auto' mb='20px' />
              <Heading mb='10px'>Name:- {userData.name}</Heading>
                <Text mb='20px'> Email id:- {userData.email}</Text>
                <Text mb='20px'> Created At:- {(userData.createdAt).slice(0,10)}</Text>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </Box>
        </>
        : navigate('/')}
    </>
  )
}

export default Profile
