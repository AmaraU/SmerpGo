import {
    Box,
    Stack,
    Image,
    useColorModeValue,
    InputGroup,
    Input,
    InputRightElement,
    Container,
} from "@chakra-ui/react";
import logo from '../images/logo.svg';
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBarStorelist({ handleSearch }) {
    const navigate = useNavigate();
    const [searchTxt, setSearchTxt] = useState('');

    const handleSearchText = (e) => {
        setSearchTxt(e.target.value);
        handleSearch(e.target.value);
    }

    return (
        <Stack>
            <Stack
                bg={'#F9F8FD'}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 3 }}
                px={{ base: 4, md: 10 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                direction={'row'}
                justify={'space-between'}
            >
                <Box as='button' onClick={() => navigate('/')}>
                    <Image src={logo} w={'90%'} />
                </Box>

                <Box w={'40%'} display={{ base: 'none', md: 'block' }}>
                    <InputGroup>
                        <Input type="text" value={searchTxt} onChange={handleSearchText} borderColor={'white'} fontSize={'sm'} bg={'white'} placeholder="Search for a store" _placeholder={{ color: 'gray.500' }} />
                        <InputRightElement>
                            <Search2Icon color={'gray.500'} />
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Stack>
            <Container maxW={'5xl'} py={4} display={{ md: 'none' }}>
                <InputGroup>
                    <Input rounded={15} type="text" height={'60px'} value={searchTxt} onChange={handleSearchText} borderColor={'white'} fontSize={'sm'} bg={'#FAFAFA'} placeholder="Search for a store" _placeholder={{ color: 'gray.500' }} />
                    <InputRightElement>
                        <Search2Icon mt={5} color={'gray.500'} fontSize={'md'} mr={4} />
                    </InputRightElement>
                </InputGroup>
            </Container>
        </Stack>
    )
}