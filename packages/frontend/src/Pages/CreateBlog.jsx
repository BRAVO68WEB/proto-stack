import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, Button, Input } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
import CKeditor from "../Components/CKEditor";
import Appbar from "../Components/Appbar";
import { htmlToText } from "html-to-text";
import parse from "html-react-parser";
import axios from 'axios';

const CreateBlog = () => {

    let baseURL;

    if (process.env.NODE_ENV !== 'production') {
        baseURL = process.env.REACT_APP_DEV_API_URL;
        console.log(baseURL);
    }
    else {
        baseURL = process.env.REACT_APP_PROD_API_URL;
        console.log(baseURL);
    }

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    const [btnText, setBtnText] = useState("Submit");

    const titleRef = useRef();
    const tagsRef = useRef();

    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    function handleSubmit(e) {
        const tags = tagsRef.current.value.split(" ");
        e.preventDefault();
        console.log(JSON.stringify(data));

        let raw = {
            "content": data,
            "title": titleRef.current.value,
            "tags": tags
        };

        let config = {
            method: 'post',
            url: `${baseURL}/blog/create`,
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem("proto-stack-jwt"),
                'Content-Type': 'application/json'
            },
            data: raw
        };
        console.log(config)

        axios(config)
            .then((result) => {
                console.log(result);
                if (result.data.status == true) {
                    console.log(result);
                    toast({
                        title: 'Submitted successfully.',
                        description: "Submitted successfully.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    navigate("/");
                }
                else {
                    setBtnText("Submit");
                    toast({
                        title: 'Failed to Submit.',
                        description: result.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch((error) => {
                console.log('error', error);
                setBtnText("Submit");
                toast({
                    title: 'Failed to Submit.',
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
            <Container my="16" maxW="container.lg">
                <form onSubmit={handleSubmit}>
                    <Input ref={titleRef} mb="4" placeholder='Blog title should go here' />

                    <Input ref={tagsRef} mb="4" placeholder='Enter tags seperated by spaces' />

                    <CKeditor
                        name="description"
                        onChange={(data) => {
                            setData(data);
                        }}
                        editorLoaded={editorLoaded}
                    />

                    {/* {JSON.stringify(data)} */}
                    <Button type="submit" mt="3" maxW="9rem" colorScheme='teal'>Submit</Button>
                </form>
            </Container>
        </Box>
    );
}

export default CreateBlog;