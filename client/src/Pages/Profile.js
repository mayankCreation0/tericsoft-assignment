import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import {
  Box,
  Avatar,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  }, []);
  return (
    <>
      {authstate ?
      <>
      <Navbar/>
          <Box maxW='500px' mx='auto' mt='50px' p='20px' bg='gray.100' boxShadow='2xl' borderRadius='xl'>
            {userData ? (
              <>
                <Avatar size='2xl' name={userData.name} src={userData.avatar} mx='auto' mb='20px' />
                <Heading mb='10px' color='teal.500'>Name: {userData.name}</Heading>
                <Text mb='20px' color='gray.700'>Email: {userData.email}</Text>
                <Text mb='20px' color='gray.700'>Created At: {(userData.createdAt).slice(0, 10)}</Text>
              </>
            ) : (
              <Text color='gray.700' textAlign='center'>Loading...</Text>
            )}
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Link to='/home'><Button
                bg='blue.500'
                color='white'
                borderRadius='md'
                boxShadow='md'
                mr='10px'
                _hover={{ bg: 'blue.600' }}
              >
                Home
              </Button></Link>
              <Link to='/history'><Button
                bg='green.500'
                color='white'
                borderRadius='md'
                boxShadow='md'
                _hover={{ bg: 'green.600' }}
              >
                Bmi History
              </Button></Link>
            </Box>
          </Box> 
        </>
        : navigate('/')}
    </>
  )
}

export default Profile
