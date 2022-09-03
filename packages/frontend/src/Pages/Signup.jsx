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
import {
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import Appbar from '../Components/Appbar';
import axios from "../helpers/axios";
// import axios? from "axios";

const Signup = () => {

    const navigate = useNavigate();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [passShow, setPassShow] = useState(false);
    const [confirmedPassShow, setConfirmedPassShow] = useState(false);
    const [passError, setPassError] = useState(false);
    const [btnText, setBtnText] = useState("Signup");

    // ! useRef
    const userNameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmedPasswordRef = useRef();

    // ! Function to handle show and hide password, Chakra UI
    const handleShowPassword = () => setPassShow(!passShow);
    const handleShowConfirmedPassword = () => setConfirmedPassShow(!confirmedPassShow);

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText("Creating account...");
        if (passwordRef.current.value.length < 5) {
            onOpen();
            setBtnText("Signup");
        }
        else {
            if (passwordRef.current.value !== confirmedPasswordRef.current.value) {
                setPassError(true);
                setBtnText("Signup");
            }
            else {
                let data = {
                    "username": userNameRef.current.value,
                    "first_name": firstNameRef.current.value,
                    "last_name": firstNameRef.current.value,
                    "email": emailRef.current.value,
                    "password": passwordRef.current.value
                };

                axios.post("/auth/register", data)
                    .then((result) => {
                        console.log(result.data)
                        if (result.data.status == true) {
                            console.log(result);
                            toast({
                                title: result.data.status,
                                description: result.data.message,
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                            })
                            navigate("/verification");
                        }
                        else {
                            setBtnText("Signup");
                            toast({
                                title: result.data.status,
                                description: result.data.message,
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            })
                        }
                    })
                    .catch((error) => {
                        setBtnText("Signup");
                        toast({
                            title: 'Failed to create account.',
                            description: "Something went wrong. Try again.",
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        })
                    });
            }

        }
    }

    return (
        <Box>
            <Appbar />
            <Container maxW="container.xl">
                <Center mt={["30%", "25%", "5%"]}>
                    <Box w={["90%", "30%", "30%"]}>
                        <form onSubmit={handleSubmit}>
                            <Text fontSize="2xl"
                                fontWeight="500">
                                Create Account
                            </Text>

                            <Input ref={userNameRef} mt="6" placeholder='Username' size='lg'
                                type="text" required />

                            <Input ref={firstNameRef} mt="3" placeholder='First Name' size='lg'
                                type="text" required />

                            <Input ref={lastNameRef} mt="3" placeholder='Last Name' size='lg'
                                type="text" required />

                            <Input ref={emailRef} mt="3" placeholder='email' size='lg'
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

                            <InputGroup size='md' mt='3'>
                                <Input
                                    ref={confirmedPasswordRef}
                                    pr='4.5rem'
                                    size="lg"
                                    type={confirmedPassShow ? 'text' : 'password'}
                                    placeholder='Confirm password'
                                    required
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' mt="2" size='sm' onClick={handleShowConfirmedPassword}>
                                        {confirmedPassShow ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Button type="submit" mt='3' w="100%" colorScheme='teal' size='lg'>
                                {btnText}
                            </Button>

                            <Text mt="4" textAlign="center">
                                Already have account ?
                                <Link to="/login">
                                    <span className="prompt-text">
                                        Login
                                    </span>
                                </Link>
                            </Text>

                            {passError &&
                                <Center mt="2">
                                    <Alert status='error'>
                                        <AlertIcon />
                                        <Text textAlign="center">
                                            Passwords do not match. Try again.
                                        </Text>
                                    </Alert>
                                </Center>}

                        </form>
                    </Box>
                </Center>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Invalid Password</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Password should be of minimum 5 characters.
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Container>
        </Box>
    );
}

export default Signup;