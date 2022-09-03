import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    Container,
    Center,
    Text,
    Input,
    InputRightElement,
    InputGroup, Button
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Appbar from '../Components/Appbar';

const Login = () => {

    //! API_URL variable
    let API_URL;

    //! Set API_URL based on env

    if (process.env.NODE_ENV !== 'production') {
        API_URL = process.env.REACT_APP_DEV_API_URL;
    }
    else {
        API_URL = process.env.REACT_APP_PROD_API_URL;
    }

    const navigate = useNavigate();

    const toast = useToast();

    // ! states
    const [passShow, setPassShow] = useState(false);
    const [btnText, setBtnText] = useState("Login");

    // ! useRef
    const emailRef = useRef();
    const passwordRef = useRef();

    // ! Function to handle show and hide password, Chakra UI
    const handleShowPassword = () => setPassShow(!passShow);

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText("Logging in...");

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${API_URL}/users/login`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                if (result.status === "success") {
                    // console.log(result);
                    localStorage.setItem("anime-facts-jwt-token", JSON.stringify(result.data.token));
                    toast({
                        title: 'Login complete.',
                        description: "Logged in successfully.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    navigate("/");
                }
                else {
                    setBtnText("Login");
                    toast({
                        title: 'Failed to login.',
                        description: result.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch((error) => {
                // console.log('error', error);
                setBtnText("Login");
                toast({
                    title: 'Failed to login.',
                    description: "Something went wrong. Try again.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            });
    }

    return (
        <Box>
            <Appbar />
            <Container maxW="container.xl">
                <Center mt={["30%", "25%", "10%"]}>
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <Text fontSize="2xl"
                                fontWeight="500">
                                Login to continue
                            </Text>

                            <Input ref={emailRef} mt="6" placeholder='Email' size='lg'
                                type="email" required />

                            <InputGroup size='md' mt='3'>
                                <Input
                                    ref={passwordRef}
                                    pr='4.5rem'
                                    size="lg"
                                    type={passShow ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    required
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' mt="2" size='sm' onClick={handleShowPassword}>
                                        {passShow ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Button type="submit" mt='3' w="100%" colorScheme='teal' size='lg'>
                                {btnText}
                            </Button>

                            <Text mt="4" textAlign="center">
                                Create account ?
                                <Link to="/signup">
                                    <span className="prompt-text">
                                        Signup
                                    </span>
                                </Link>
                            </Text>

                        </form>
                    </Box>
                </Center>
            </Container>
        </Box>
    );
}

export default Login;