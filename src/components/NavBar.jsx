import {
    Box,
    Text,
    Stack,
    Image,
    useColorModeValue,
    HStack,
    Avatar,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    AvatarBadge,
    useDisclosure
} from "@chakra-ui/react";
import logo from '../images/logo.svg';
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiSealCheckFill } from "react-icons/pi";
import { BsHandbag } from 'react-icons/bs';
import ReactCountryFlag from "react-country-flag"
import { TbCurrencyNaira } from "react-icons/tb";
import DownloadChoice from "./DownloadChoice";

export default function NavBar({ storeInfo = null, handleSearch, cartItems = 0, showSearch = true, resetSearchText = false }) {
    const navigate = useNavigate();
    const [searchTxt, setSearchTxt] = useState("");
    const { isOpen: isOpenDownload, onOpen: onOpenDownload, onClose: onCloseDownload } = useDisclosure();

    useEffect(() => {
        if (resetSearchText) {
            setSearchTxt("");
        }
    }, [resetSearchText])

    const handleSearchText = (e) => {
        setSearchTxt(e.target.value);
        handleSearch(e.target.value);
    }

    return (
        <>
            <Stack spacing={0}>
                <Stack
                    bg={'#EBE7F7'}
                    color={useColorModeValue("gray.600", "white")}
                    minH={"60px"}
                    py={{ base: 3 }}
                    px={{ base: 4, md: 10 }}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.900")}
                    direction={'row'}
                    justify={'space-between'}
                    alignItems={"center"}
                >
                    <Box as='button' onClick={() => navigate('/')}>
                        <Image src={logo} w={'90%'} />
                    </Box>
                    <HStack justify={"center"} spacing={1} w={{ base: "80%", md: "100%" }}>
                        <Text fontWeight={500} color={"black"} align={{ base: "start", md: "center" }} fontSize={{ base: "13px", md: "sm" }} lineHeight={{ base: 1.4, md: 1.5 }}>Like this store? Start your own online store today!</Text>
                        <Button onClick={onOpenDownload} variant={"link"} color={"#695ACD"} fontWeight={500} size={"sm"} textDecoration={"underline"} textDecorationThickness={"1px"}>Join here!</Button>
                    </HStack>
                </Stack>
                <Stack
                    bg={'#F9F8FD'}
                    color={useColorModeValue("gray.600", "white")}
                    minH={"60px"}
                    py={{ base: 3 }}
                    px={{ base: 4, md: 10 }}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.900")}
                    direction={'row'}
                    justify={'space-between'}
                    alignItems={"center"}
                >
                    <HStack>
                        <Text fontSize={{ base: "14px", md: "16.5px" }} fontWeight={600} color={"black"}>{storeInfo ? storeInfo.businessName : ''}</Text>
                        <Box fontSize={{ base: 'md', md: 'lg' }}>
                            <PiSealCheckFill color="#43A047" />
                        </Box>
                    </HStack>
                    {
                        showSearch &&
                        <Box w={'35%'} display={{ base: 'none', md: 'flex' }}>
                            <InputGroup>
                                <Input type="text" value={searchTxt} onChange={handleSearchText} borderColor={'white'} fontSize={'sm'} bg={'white'} placeholder="Search for a product" _placeholder={{ color: 'gray.500' }} />
                                <InputRightElement>
                                    <Search2Icon color={'gray.500'} />
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    }
                    <HStack spacing={8}>
                        <HStack>
                            <Box>
                                <ReactCountryFlag
                                    countryCode="NG"
                                    title="NGN"
                                    style={{
                                        width: '1.5em',
                                        height: '1.5em',
                                    }} svg
                                />
                            </Box>
                            <Text color={"black"} fontSize={"sm"} fontWeight={400}>NGN -</Text>
                            <Box ml={-2} color={"black.800"} fontSize={'19px'} mt={navigator.userAgent.includes('Safari') ? "1px" : 0}>
                                <TbCurrencyNaira />
                            </Box>
                        </HStack>
                        <HStack cursor={"pointer"} onClick={() => navigate('/cart', { state: { ...storeInfo, itemsCount: cartItems } })}>
                            <Box px={1.5} py={0.5} rounded={40} bg={"#695ACD"} position={"absolute"} ml={2} mt={-4}>
                                <Text color={"white"} fontSize={"xs"}>{cartItems}</Text>
                            </Box>
                            <Box fontSize={"23px"}>
                                <BsHandbag />
                            </Box>
                            <Text color={"black"} fontSize={"sm"}>cart</Text>
                        </HStack>
                        <Avatar
                            _hover={{ cursor: 'pointer' }}
                            color="white"
                            name={storeInfo ? storeInfo.businessName : ''}
                            bg="#16456d"
                            size="sm"
                            src={storeInfo ? storeInfo.avatar : ''}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            <AvatarBadge boxSize='1.25em' bg='#43A047' />
                        </Avatar>
                    </HStack>
                </Stack>
                {
                    showSearch &&
                    <Stack px={2} py={2} display={{ md: 'none' }}>
                        <InputGroup>
                            <Input rounded={10} type="text" height={'45px'} value={searchTxt} onChange={handleSearchText} borderColor={'white'} fontSize={'sm'} bg={'#FAFAFA'} placeholder="Search for a product" _placeholder={{ color: 'gray.500' }} />
                            <InputRightElement>
                                <Search2Icon mt={1} color={'gray.500'} fontSize={'md'} mr={4} />
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                }
            </Stack>
            <DownloadChoice isOpen={isOpenDownload} onClose={onCloseDownload} />
        </>

    )
}