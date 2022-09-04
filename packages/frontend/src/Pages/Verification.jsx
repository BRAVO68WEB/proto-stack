import { Button, Center, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Verification = () => {
    return (
        <Container>
            <Center>
                Please check your email.
                <Link to="/login">
                    <Button>
                        Login
                    </Button>
                </Link>
            </Center>

        </Container>
    );
}

export default Verification;