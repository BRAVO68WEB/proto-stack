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
import axios from "../helpers/axios";

const Login = () => {

    const navigate = useNavigate();

    const toast = useToast();

    // ! states
    const [passShow, setPassShow] = useState(false);
    const [btnText, setBtnText] = useState("Login");

    // ! useRef
    const userNameRef = useRef();
    const passwordRef = useRef();

    // ! Function to handle show and hide password, Chakra UI
    const handleShowPassword = () => setPassShow(!passShow);

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText("Logging in...");

        let data = {
            "username": userNameRef.current.value,
            "password": passwordRef.current.value
        };

        axios.post("/auth/login", data)
            .then((result) => {
                console.log(result);
                if (result.data.status == true) {
                    console.log(result);
                    // localStorage.setItem("proto-stack-jwt", JSON.stringify(result.data.token));
                    localStorage.setItem("proto-stack-jwt", JSON.stringify(result.data.data.access_token));
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

                            <Input ref={userNameRef} mt="6" placeholder='Email' size='lg'
                                type="text" required />

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