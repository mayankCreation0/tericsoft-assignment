import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { context } from '../Context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button
} from '@chakra-ui/react';
// import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Pagination from '../Components/Pagination';
import MyLoader from '../Components/Loader';

const History = () => {
  // const cookies = new Cookies();
  const { uid } = useParams()
  // const { uid } = useParams();
  const { authstate } = useContext(context);
  const navigate = useNavigate()
  console.log(authstate)
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [datalength, setDatalength] = useState(0);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    // const uid =  cookies.get('userid') 
    setLoading(true);
    const res = await axios(`https://tericsoft-assignment-backend.vercel.app/user/history/${uid}`)
    console.log(res.data.calculations)
    setData(res.data.calculations)
    // setDatalength(res.data.calculations.length);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [])
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  // const paginateData = data.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      {authstate ?
        <>
          {loading ?
            <>
              <MyLoader />
            </> :<>
            {data === null || data.length <1 ? "Oops no Data found" : <div>
              <Navbar />
              <Box mt="50px" mx="auto" maxW="800px">
                <Heading mb="20px">BMI Calculations</Heading>
                <Table variant="simple">
                  <TableCaption>Calculations of BMI values</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Height (m)</Th>
                      <Th>Weight (kg)</Th>
                      <Th>BMI</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((calculation) => (
                      <Tr
                        key={calculation._id}
                        _hover={{ bgColor: 'gray' }}
                      >
                        <Td>{new Date(calculation.createdAt).toLocaleDateString()}</Td>
                        <Td>{calculation.height}</Td>
                        <Td>{calculation.weight}</Td>
                        <Td>{calculation.bmi.toFixed(2)}</Td>
                        <Td><Button colorScheme='red'>Delete</Button></Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
              <Pagination totalPosts={datalength}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
              </div>} </>}
    </>
        : navigate('/')}
    </>
  )
}

export default History

