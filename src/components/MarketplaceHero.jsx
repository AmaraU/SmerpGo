import {
    Container,
    Stack,
    Text,
    Box,
    Image,
    Center,
    Button,
} from "@chakra-ui/react";
import img1 from '../images/market_img.png';

export default function MarketplaceHero() {
    return (
        <Container maxW={"3xl"} pt={16} id="marketplace">
            <Stack>
                <Stack spacing={1}>
                    <Text fontWeight={500} textAlign={"center"} fontSize={"sm"} color={"#7C5CFC"}>MARKETPLACE</Text>
                    <Text textAlign={"center"} fontSize={{ base: "26px", md: "32px" }} fontWeight={600} color={"#040815"}>Easy, Simple, Affordable</Text>
                </Stack>
                <Box mt={3} w={"100%"} rounded={12} bg={"#F2F0FE"} px={6} py={5}>
                    <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 8, md: 16 }}>
                        <Box rounded={12} bg={"#F9F9FB"} px={4} pt={5}>
                            <Center>
                                <Image src={img1} w={270} />
                            </Center>
                        </Box>
                        <Stack spacing={4} justify={"center"}>
                            <Text textAlign={{ base: "center", md: "start" }} fontSize={"md"} fontWeight={600} color={"#040815"}>Smerp Go's Marketplace</Text>
                            <Text textAlign={{ base: "center", md: "start" }} fontSize={"13px"} color={"#596780"} maxW={{ base: "100%", md: "300px" }}>Unlock limitless potential in our marketplace section! Amplify your audience, boost sales, and skyrocket your exposure. Join now and watch your business thrive.</Text>
                            <Box alignSelf={{ base: "center", md: "start" }} pb={{ base: 4, md: 0 }}>
                                <Button
                                    as="a"
                                    rounded={20}
                                    fontSize={"sm"}
                                    fontWeight={500}
                                    bg={"linear-gradient(91deg, rgba(99.60, 76.29, 255, 0.85) 65%, rgba(99.60, 76.29, 255, 0.58) 100%, rgba(168, 154, 255, 0.98) 100%)"}
                                    color={"#FFFFFF"}
                                    _hover={{
                                        bg: "linear-gradient(120deg, rgba(99.60, 76.29, 255, 0.85) 15%, rgba(99.60, 76.29, 255, 0.58) 100%, rgba(168, 154, 255, 0.98) 80%)"
                                    }}
                                    px={6}
                                    href={'/stores'}
                                    target="_blank"
                                >
                                    Explore Our Marketplace
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}