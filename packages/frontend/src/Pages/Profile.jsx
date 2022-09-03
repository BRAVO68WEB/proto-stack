import { useState, useEffect } from "react";
import { Container, Box, Text, Avatar, Divider } from "@chakra-ui/react";
import Appbar from "../Components/Appbar";
import axios from "../helpers/axios";

const Profile = () => {

    // ! states
    const [loading, setLoading] = useState(false);

    // ! useEffect
    useEffect(() => {
        setLoading(true);
        // axios.get(`/user/id/${user_id}`)
        //     .then((result) => {
        //         console.log(result);
        //         // setMetadata(result.data.metadata)
        //         // console.log("test " + result.data.data);
        //         // setBlogs(result.data.data);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setLoading(false);
        //     });
    }, [])

    return (
        <Box>
            <Appbar />
            <Container my="20" maxW="container.xl">
                <Box>
                    <Container display="flex" maxW="container.lg">
                        <Box>
                            <Avatar ml="2" size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        </Box>
                        <Box ml="20">
                            <Text fontSize="2xl">Sanyog Changmai</Text>
                            <Text>sanyog29</Text>
                            <Text mt="8">sanyogchangmai29@gmail.com</Text>
                        </Box>
                    </Container>

                    <Divider mt="10" />

                    <Box>
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
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Profile;