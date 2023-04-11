import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from 'axios';
import Cookies from 'universal-cookie';

const History = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { authstate } = useContext(context);
  const navigate = useNavigate()
  console.log(authstate)
  const [data ,setData]= useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await axios('http://localhost:8080/user/history',{headers})
      console.log(res.data.calculations)
      setData(res.data.calculations)
    }
    fetchData();
  })
  return (
    <>
      {authstate ?
        <div>
          <Navbar />
          <Box mt="50px" mx="auto" maxW="800px">
            <Heading mb="20px">BMI Calculations</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Height</Th>
                  <Th>Weight</Th>
                  <Th>BMI</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((calculation) => (
                  <Tr key={calculation._id}>
                    <Td>{new Date(calculation.createdAt).toLocaleDateString()}</Td>
                    <Td>{calculation.height} cm</Td>
                    <Td>{calculation.weight} kg</Td>
                    <Td>{calculation.bmi.toFixed(2)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </div>
        : navigate('/')}
    </>
  )
}

export default History

