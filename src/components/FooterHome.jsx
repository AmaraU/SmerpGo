import { Box, Text, Image, HStack, Link, Container, Stack, Button, Divider, useDisclosure } from "@chakra-ui/react";
import logo from '../images/logo.svg';
import { HashLink } from "react-router-hash-link";
import DownloadChoice from "./DownloadChoice";

export const FooterHome = () => {
    const { isOpen: isOpenDownload, onOpen: onOpenDownload, onClose: onCloseDownload } = useDisclosure();

    return (
        <>
            <Container maxW={'5xl'} pb={8} pt={8} display={{ base: "none", md: "block" }}>
                <Stack direction={"row"} justify={"space-between"} alignItems={"start"}>
                    <Stack spacing={1}>
                        <Box as={HashLink} smooth to='/#home'>
                            <Image src={logo} w={'100px'} />
                        </Box>
                        <Text fontSize={"xs"} color={"white"}>Grow your business with Smerp Go</Text>
                    </Stack>
                    <HStack spacing={7}>
                        <HashLink smooth to="/#features">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Features</Text>
                        </HashLink>
                        <HashLink smooth to="/#marketplace">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Marketplace</Text>
                        </HashLink>
                        <HashLink smooth to="/#community">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Community</Text>
                        </HashLink>
                        <HashLink smooth to="/#pricing">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Pricing</Text>
                        </HashLink>
                    </HStack>
                    <Stack spacing={4}>
                        <Text color={"white"} fontSize={"13.5px"} fontWeight={600}>Get started with SmerpGo now</Text>
                        <Button onClick={onOpenDownload} rounded={26} size={"md"} fontSize={"14px"} bg={"#7C5CFC"} color={"white"} fontWeight={400} _hover={{ bg: "#7C5CFCBF" }}>Get Started</Button>
                    </Stack>
                </Stack>
                <Stack pt={8} direction={"row"} spacing={7}>
                    <Stack spacing={1}>
                        <Text fontSize={"xs"} color={"#FFFFFFCC"}>Email</Text>
                        <Text fontSize={"13px"} color={"#FFFFFF"}>Smerp.Support@thefifthlab.com</Text>
                    </Stack>
                    <Stack spacing={1}>
                        <Text fontSize={"xs"} color={"#FFFFFFCC"}>Phone Number</Text>
                        <Text fontSize={"13px"} color={"#FFFFFF"}>+234 916 773 9689</Text>
                    </Stack>
                </Stack>
                <Box py={4}>
                    <Divider />
                </Box>
                <Stack direction={"row"} justify={"space-between"}>
                    <HStack spacing={1}>
                        <Text fontSize={'xs'} color={"white"}>Powered by</Text>
                        <Link href="https://www.thefifthlab.com" isExternal>
                            <Text fontSize={'xs'} fontWeight={600} color={"white"}>FifthLab</Text>
                        </Link>
                    </HStack>
                    <Text fontSize={"xs"} color={"white"} fontWeight={400}>&copy; Smerp 2024</Text>
                </Stack>
            </Container>

            <Container maxW={'5xl'} pb={8} pt={8} display={{ md: "none" }}>
                <Stack direction={"row"} justify={"space-between"} alignItems={"start"} pb={2}>
                    <Stack spacing={1}>
                        <Box as={HashLink} smooth to='/#home'>
                            <Image src={logo} w={'100px'} />
                        </Box>
                        <Text fontSize={"11px"} color={"white"} w={"80%"}>Grow your business with Smerp Go</Text>
                    </Stack>

                    <Stack spacing={4}>
                        <Text color={"white"} fontSize={"12px"} fontWeight={600}>Get started with SmerpGo now</Text>
                        <Button onClick={onOpenDownload} rounded={26} size={"sm"} fontSize={"13px"} bg={"#7C5CFC"} color={"white"} fontWeight={400} _hover={{ bg: "#7C5CFCBF" }}>Get Started</Button>
                    </Stack>
                </Stack>
                <Box py={2}>
                    <Divider />
                </Box>
                <Stack>
                    <HStack spacing={7} justify={"center"}>
                        <HashLink smooth to="/#features">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Features</Text>
                        </HashLink>
                        <HashLink smooth to="/#marketplace">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Marketplace</Text>
                        </HashLink>
                        <HashLink smooth to="/#community">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Community</Text>
                        </HashLink>
                        <HashLink smooth to="/#pricing">
                            <Text color={"white"} fontSize={"13px"} w={"100%"}>Pricing</Text>
                        </HashLink>
                    </HStack>
                </Stack>
                <Box py={2}>
                    <Divider />
                </Box>
                <Stack pt={2} direction={"row"} justify={"space-between"} w="100%">
                    <Stack spacing={1}>
                        <Text fontSize={"11px"} color={"#FFFFFFCC"}>Email</Text>
                        <Text fontSize={"11px"} color={"#FFFFFF"}>Smerp.Support@thefifthlab.com</Text>
                    </Stack>
                    <Stack spacing={1}>
                        <Text fontSize={"11px"} color={"#FFFFFFCC"}>Phone Number</Text>
                        <Text fontSize={"11px"} color={"#FFFFFF"}>+234 916 773 9689</Text>
                    </Stack>
                </Stack>
                <Stack pt={8} direction={"row"} justify={"space-between"} spacing={3} w="100%">
                    <HStack spacing={1}>
                        <Text fontSize={'xs'} color={"white"}>Powered by</Text>
                        <Link href="https://www.thefifthlab.com" isExternal>
                            <Text fontSize={'xs'} fontWeight={600} color={"white"}>FifthLab</Text>
                        </Link>
                    </HStack>
                    <Text fontSize={"xs"} color={"white"} fontWeight={400}>&copy; Smerp 2024</Text>
                </Stack>
            </Container>
            <DownloadChoice isOpen={isOpenDownload} onClose={onCloseDownload} />
        </>

    );
}