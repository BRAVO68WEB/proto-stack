import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Box, Text, Avatar, Divider, Button, Center, Spinner } from "@chakra-ui/react";
import Appbar from "../Components/Appbar";
import axios from "axios";

const Profile = () => {

    let baseURL;

    if (process.env.NODE_ENV !== 'production') {
        baseURL = process.env.REACT_APP_DEV_API_URL;
        console.log(baseURL);
    }
    else {
        baseURL = process.env.REACT_APP_PROD_API_URL;
        console.log(baseURL);
    }

    // ! states
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [blogs, setBlogs] = useState();

    let user_id;

    // ! useEffect
    useEffect(() => {
        setLoading(true);
        let config = {
            method: 'get',
            url: `${baseURL}/user/me`,
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem("proto-stack-jwt"),
            }
        };

        axios(config)
            .then((result) => {
                console.log(result);
                setUser(result.data.data);
                setUserName(result.data.username);
                setUserId(result.data.data._id);
                user_id = result.data.data._id;
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

        fetchUserAllBlogs();
    }, [])

    function fetchUserAllBlogs() {
        setLoading(true);
        let config = {
            method: 'get',
            url: `${baseURL}/blog/author/${localStorage.getItem("proto-stack-user-id")}`,
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem("proto-stack-jwt"),
            }
        };

        axios(config)
            .then(function (result) {
                console.log("blogs " + result);
                setBlogs(result.data.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    return (
        <Box>
            <Appbar />
            {loading ?
                <Center>
                    <Spinner
                        my="44"
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center>
                :
                <Container my="20" maxW="container.xl">
                    <Box>
                        <Container display="flex" maxW="container.lg">
                            <Box>
                                <Avatar ml="2" size='2xl' name='Segun Adebayo' src={user.profile_picture} />
                                <Center>
                                    <Button mt="2" display="block">Upload</Button>
                                </Center>
                            </Box>
                            <Box ml="20">
                                <Text fontSize="2xl">{user.username}</Text>
                                {/* <Text>sanyog29</Text> */}
                                <Text mt="8">{user.email}</Text>
                            </Box>
                        </Container>

                        <Divider mt="10" />

                        {blogs &&
                            <>
                                {blogs.map((blogs) => (
                                    <Link key={blogs._id} to={`/blog/${blogs._id}`}>
                                        <Container maxW="container.lg">
                                            <Box boxShadow="md" py="6" px="12" my="10">
                                                <Box fontSize="2xl" fontWeight="500">
                                                    {blogs.title}
                                                </Box>
                                                <Box mt="3" fontSize="sm">
                                                    By - {blogs.author.username}
                                                </Box>
                                                <Box mt="4" fontSize="lg">
                                                    {blogs.content}
                                                </Box>
                                            </Box>
                                        </Container>
                                    </Link>
                                ))}
                            </>
                        }
                    </Box>
                </Container>}
        </Box>
    );
}

export default Profile;