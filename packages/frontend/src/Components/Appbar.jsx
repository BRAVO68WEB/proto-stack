import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Text, Button, IconButton } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import axios from "../helpers/axios";

const Appbar = () => {

    const navigate = useNavigate();

    const toast = useToast();

    // ! States
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("proto-stack-jwt")));
    }, [])

    function handleLogout(e) {
        e.preventDefault();
        let data = "";

        axios.post("/auth/logout")
            .then((result) => {
                if (result.data.status == true) {
                    localStorage.removeItem("proto-stack-token");
                    toast({
                        title: 'Success.',
                        description: result.data.message,
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    navigate("login");
                }
                else {
                    toast({
                        title: 'Fail.',
                        description: result.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch((error) => {
                toast({
                    title: 'Fail.',
                    description: "Failed to logout.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            });
    }

    return (
        <Box boxShadow="sm" py="2">
            <Container maxW="container.xl" display="flex">
                <Link to="/">
                    <Text fontSize="2xl" color="teal.500"
                        fontWeight="600">
                        ProtoStack
                    </Text>
                </Link>

                {!currentUser &&
                    <Box ml="auto">
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    </Box>}

                {currentUser &&
                    <Box ml="auto">
                        <Menu>
                            <MenuButton as={Button} icon={<SettingsIcon />}>
                                <SettingsIcon mt="-1" />
                            </MenuButton>
                            <MenuList>
                                <Link to="user/profile">
                                    <MenuItem color="red.500">Profile</MenuItem>
                                </Link>
                                <MenuItem onClick={handleLogout} color="red.500">Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>}
            </Container>
        </Box>
    );
}

export default Appbar;