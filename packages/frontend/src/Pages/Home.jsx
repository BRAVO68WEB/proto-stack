import { useState, useEffect, useRef } from "react";
import { Box, Container, Input, Button, IconButton, Spinner, Center, Tag } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import Appbar from "../Components/Appbar";
import axios from "../helpers/axios"

const Home = () => {

    let baseURL;

    if (process.env.NODE_ENV !== 'production') {
        baseURL = process.env.REACT_APP_DEV_API_URL;
        console.log(baseURL);
    }
    else {
        baseURL = process.env.REACT_APP_PROD_API_URL;
        console.log(baseURL);
    }

    // ! tags
    const tags = ["frontend", "backend", "aws", "rust", "graphql", "react", "interview", "scalability", "javascript"]
    // ! states
    const [blogs, setBlogs] = useState("");
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [metadata, setMetadata] = useState("");
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyWord] = useState("");

    // ! useEffect
    useEffect(() => {
        setLoading(true);
        axios.get(`/blog?search=${query}&page=${page}`)
            .then((result) => {
                // console.log(result);
                setMetadata(result.data.metadata)
                // console.log("test " + result.data.data);
                setBlogs(result.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

        getCurrentUser();
    }, [])

    function getCurrentUser() {
        let config = {
            method: 'get',
            url: `${baseURL}/user/me`,
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem("proto-stack-jwt"),
            }
        };

        axios(config)
            .then((result) => {
                localStorage.setItem("proto-stack-user-id", result.data.data._id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // ! useRefs
    const keyWordRef = useRef();

    function handleFetchBlogs() {
        setLoading(true);
        axios.get(`/blog?search=${keyWordRef.current.value}`)
            .then((result) => {
                console.log(result.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    function handleFetchBlogsByTags(tag) {
        console.log("by");
        setLoading(true);
        axios.get(`/blog/tag/${tag}`)
            .then((result) => {
                console.log(result.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    function handlePageChange(pageNum) {
        setLoading(true);
        axios.get(`/blog?search=${query}&page=${pageNum}`)
            .then((result) => {
                console.log(result);
                setMetadata(result.data.metadata);
                console.log("test " + result.data.data);
                setBlogs(result.data.data);
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
                        <Input ref={keyWordRef} placeholder='Search here ...' size='lg' />
                        <IconButton onClick={handleFetchBlogs} size="lg" ml="2" aria-label='Search database' icon={<SearchIcon />} />
                    </Box>
                    <Box>
                        <Link to="/create/blog">
                            <Button ml="30%" colorScheme='teal' size='md' mt="1">
                                New Blog <AddIcon ml="2" />
                            </Button>
                        </Link>
                    </Box>
                </Box>

                <Box mt="3">
                    {tags.map((tag, id) => (
                        <Tag key={id} mt="2" cursor="pointer" onClick={() => handleFetchBlogsByTags(tag)}
                            colorScheme='teal' mx="1">
                            {tag}
                        </Tag>
                    ))}
                </Box>
            </Container>

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
                <Box>
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
            }

            {metadata &&
                <Center mb="20">
                    <Box mx="auto" display="flex">
                        {[...Array(metadata.totalPage)].map((e, i) => (
                            <Button onClick={() => handlePageChange(i)} key={i} mx="1" my="2" colorScheme="teal">{i + 1}</Button>
                        ))}
                    </Box>
                </Center>}
        </Box >
    );
}

export default Home;