import React, { useContext, useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    Link,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import axios from 'axios'
import Cookies from 'universal-cookie';
import { context } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import '../Styles/LoginSignupPage.css'

const LoginSignupPage = () => {
    const navigate = useNavigate();
    const { falseAuthState, fnauthstate } = useContext(context)
    const cookies = new Cookies();
    const toast = useToast();
    const [loginput, setLoginput] = useState([]);
    const [sininput, setSininput] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(
                "https://tericsoft-assignment-backend.vercel.app/register",
                sininput
            );
            console.log(res.status);
            setLoading(false);
            if (res.status === 201) {
                toast({
                    title: 'Registered Sucessfully.',
                    description: "Welcome!!",
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
                setIsLogin(true)
            }
            else if (res.status === 400) {
                setLoading(false);
                toast({
                    title: "User Already Registered",
                    description: "",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (e) {
            setLoading(false);
            toast({
                title: "Something went wrong",
                description: "",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            console.log(e);
        }
    };
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(
                "https://tericsoft-assignment-backend.vercel.app/login",
                loginput
            );
            console.log(res.data.user._id);
            setLoading(false);
            if (res.data.token) {
                cookies.set('token', res.data.token, { path: '/' });
                cookies.set('userid', res.data.user._id, { path: '/' });

                setTimeout(() => {
                    console.log(cookies.get('token'))
                    console.log(cookies.get('userid'))
                }, 1000);
                toast({
                    title: 'LoggedIn Sucessfully.',
                    description: "Welcome!!",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                fnauthstate();
                navigate('/home')
            }
            else {
                setLoading(false);
                toast({
                    title: "Invalid credentials",
                    description: "",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
                falseAuthState();
            }
        } catch (e) {
            setLoading(false);
            toast({
                title: "Invalid credentials",
                description: "",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            console.log(e);
        }
    };
    const handleChange = (e) => {
        setLoginput({
            ...loginput,
            [e.target.name]: e.target.value,
        });
    };
    const sinhandleChange = (e) => {
        setSininput({
            ...sininput,
            [e.target.name]: e.target.value,
        });
    }

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Flex width="full"
            height="100vh"
            align="center"
            justifyContent="left"
            backgroundImage="url('https://thumbs.dreamstime.com/z/bmi-weight-loss-banner-background-bmi-weight-loss-banner-background-vector-157645784.jpg')"
            backgroundRepeat="no-repeat"
            backgroundSize="cover">
            <Box p={8} width="500px" borderWidth={1} borderRadius={8} boxShadow="lg" style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }} position="absolute" left="20px">
                <Box textAlign="center">
                    <Heading>{isLogin ? "Login" : "Register"}</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit}>
                            <FormControl>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl mt={6}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <button className="stylish-button" type="submit">
                                Login{loading ? <Spinner style={{ marginBottom: "-4px" }} /> : null}
                            </button>
                            <Text mt={4}>
                                Don't have an account?{" "}
                                <Link href="#" onClick={handleToggle} style={{ color: "blue" }}>
                                    Register Here
                                </Link>
                            </Text>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupSubmit}>
                            <FormControl mt={6}>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="name"
                                    placeholder="Enter Full Name"
                                    name="name"
                                    onChange={sinhandleChange}
                                />
                            </FormControl>
                            <FormControl mt={6}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={sinhandleChange}
                                />
                            </FormControl>
                            <FormControl mt={6}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={sinhandleChange}
                                />
                            </FormControl>
                            <button className="stylish-button" type="submit">
                                Register{loading ? <Spinner style={{ marginBottom: "-4px" }} /> : null}
                            </button>
                            <Text mt={4}>
                                Already have an account?{" "}
                                <Link href="#" onClick={handleToggle} style={{ color: "blue" }}>
                                    Log In
                                </Link>
                            </Text>
                        </form>
                    )}
                </Box>
            </Box>
        </Flex>
    );
};

export default LoginSignupPage;
