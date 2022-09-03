import { useState, useEffect, useRef } from "react";
import { Box, Container, Input, Button, IconButton, Spinner, Center } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import Appbar from "../Components/Appbar";
import axios from "../helpers/axios"

const Home = () => {
    // ! states
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyWord] = useState("");


    // ! useRefs
    const keyWordRef = useRef();

    // useEffect(() => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer ");

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch("http://localhost:5000/blog?search=Bye", requestOptions)
    //         .then(response => response.json())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    // },[])

    function handleFetchBlogs() {
        setLoading(true);
        console.log("Search " + keyWordRef.current.value);
        axios.get("/blog?search=by")
            .then((result) => {
                console.log(result.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    return (
        <Box>
            <Appbar />

            <Container maxW="container.lg" mt="10">
                <Box w="100%" display="flex">
                    <Box w="80%" display="flex">
                        <Input ref={keyWordRef} placeholder='large size' size='lg' />
                        <IconButton onClick={handleFetchBlogs} size="lg" ml="2" aria-label='Search database' icon={<SearchIcon />} />
                    </Box>
                    <Box w="20%">
                        <Link to="/create/blog">
                            <Button ml="30%" colorScheme='teal' size='md' mt="1">
                                New Blog <AddIcon ml="2" />
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>

            {loading ?
                <Center>
                    <Spinner
                        mt="44"
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center>
                :
                <Container maxW="container.lg">
                    <Box boxShadow="md" py="6" px="12" my="10">
                        <Box fontSize="2xl" fontWeight="500">
                            This is the title of the blog
                        </Box>
                        <Box mt="3" fontSize="sm">
                            By - Elon Musk
                        </Box>
                        <Box mt="4" fontSize="lg">
                            Hello LeetCoders! We are excited to annouce that our BiWeekly
                            Contest 86 is sponsored by Airtel! 😎 Register for our upcoming
                            contest here and fill out the form at registration
                        </Box>
                    </Box>
                </Container>
            }
        </Box>
    );
}

export default Home;