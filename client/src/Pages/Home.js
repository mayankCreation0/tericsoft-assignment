import React, {useState, useContext } from 'react'
import Navbar from '../Components/Navbar'
import {
  Box,
  Heading,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { context } from '../Context/Context'
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
// import MyLoader from "./Loader";

const Home = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const decodedToken = jwt_decode(token);
  const user = decodedToken.id;
  const { authstate } = useContext(context);
  const navigate = useNavigate()
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [height, setHeight] = useState(6);
  const [weight, setWeight] = useState(70);
  const [bmiResult, setBmiResult] = useState(null);

  const handleHeightChange = (value) => {
    setHeight(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const calculateBMI = async () => {
    try {
      const response = await axios.post('https://tericsoft-assignment-backend.vercel.app/user/bmi-calulation', {
        height,
        weight,
        user
      },{headers});
       setBmiResult(response.data.bmi);
       console.log(response.data.bmi)
    } catch (error) {
      console.log(error);
    }
  };

  const getBackgroundColor = () => {
    if (bmiResult < 18.5) {
      return 'red.200';
    } else if (bmiResult >= 18.5 && bmiResult < 25) {
      return 'green.200';
    } else if (bmiResult >= 25 && bmiResult < 30) {
      return 'yellow.200';
    } else {
      return 'red.400';
    }
  };
  return (
    <>
      {authstate ?
        <Box bgColor={ getBackgroundColor() } h={"100vh"}>
          <Navbar />
          <Box maxW='500px' mx='auto' mt='50px' p='20px' bg='white' boxShadow='xl' borderRadius='md'>
            <Heading mb='20px'>BMI Calculator</Heading>
            <Box mb='20px'>
              <Text mb='5px'>Height: {height} feet</Text>
              <Slider aria-label='height slider' defaultValue={height} min={4} max={10} step={0.1} onChange={handleHeightChange}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box mb='20px'>
              <Text mb='5px'>Weight: {weight} kg</Text>
              <Slider aria-label='weight slider' defaultValue={weight} min={30} max={200} step={1} onChange={handleWeightChange}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Button colorScheme='blue' onClick={calculateBMI} mb='20px'>
              Calculate BMI
            </Button>
            {bmiResult && (
              <Box p='20px' bg={getBackgroundColor()} borderRadius='md'>
                <Text fontSize='xl' mb='10px'>
                  Your BMI: {bmiResult.toFixed(2)}
                </Text>
                <Text>
                  BMI Categories:
                  <ul>
                    <li>Underweight: less than 18.5</li>
                    <li>Normal weight: 18.5–24.9</li>
                    <li>Overweight: 25–29.9</li>
                    <li>Obesity: 30 or greater</li>
                  </ul>
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        : navigate('/')}
    </>
  )
}

export default Home
