import { useEffect, useState, useRef } from "react";
import { Container, Box, Button } from "@chakra-ui/react";
import CKeditor from "../Components/CKEditor";
import Appbar from "../Components/Appbar";

const CreateBlog = () => {

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
    }

    return (
        <Box>
            <Appbar />
            <Container my="16" maxW="container.lg">
                <form onSubmit={handleSubmit}>
                    <CKeditor
                        name="description"
                        onChange={() => {
                            setData(data);
                        }}
                        editorLoaded={editorLoaded}
                    />
                    <Button type="submit" mt="3" maxW="9rem" colorScheme='teal'>Submit</Button>
                </form>
            </Container>
        </Box>
    );
}

export default CreateBlog;