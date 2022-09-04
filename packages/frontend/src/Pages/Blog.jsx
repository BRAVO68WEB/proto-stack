import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Box, Avatar, Divider, Tag, Text } from "@chakra-ui/react";
import Appbar from "../Components/Appbar";
import axios from "../helpers/axios";
import { AiFillHeart } from "react-icons/ai";

const Blog = () => {

    // ! useParams
    const { id } = useParams();

    // ! states
    const [blog, setBlog] = useState("");
    const [loading, setLoading] = useState(false);

    // ! useEffect
    useEffect(() => {
        setLoading(true);
        axios.get(`/blog/${id}`)
            .then((result) => {
                console.log("result");
                console.log(result);
                // setMetadata(result.data.metadata)
                console.log("test " + result.data.data);
                setBlog(result.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [])

    return (
        <Box bg="#fffff">
            <Appbar />
            {blog &&
                <Container p="10" maxW="container.lg" my="20" boxShadow="md">
                    <Box>
                        <Avatar mr="4" mt="-2" name='Dan Abrahmov' src={blog.author.profile_picture} />
                        <Link to={`/user/profile/${blog.author._id}`}>
                            {blog.author.username}
                        </Link>
                    </Box>

                    <Divider my="3" />

                    <Box mt="2" fontSize="xl">
                        {blog.title}
                    </Box>

                    <Box mt="3">
                        {blog.tags.map((tag, id) => (
                            <Tag key={id} mt="2" cursor="pointer" colorScheme='teal' mx="1">
                                {tag}
                            </Tag>
                        ))}
                    </Box>

                    <Box mt="4">
                        {blog.content}
                    </Box>

                    <Box display="flex" float="right" cursor="pointer">
                        <AiFillHeart className="like-btn" />{blog.likes}
                    </Box>

                </Container>}
        </Box>
    );
}

export default Blog;