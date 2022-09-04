import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
import CKeditor from "../Components/CKEditor";
import Appbar from "../Components/Appbar";
import { htmlToText } from "html-to-text";
import parse from "html-react-parser";
import axios from '../helpers/axios';

const CreateBlog = () => {

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    const [btnText, setBtnText] = useState("Submit");

    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(JSON.stringify(data));
        let raw = {
            "content": parse(data),
        };

        axios.post("/blog/create", raw)
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
                // console.log('error', error);
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