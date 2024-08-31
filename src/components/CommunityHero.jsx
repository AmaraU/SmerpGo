import {
    Container,
    Stack,
    Text,
    Box,
    Image,
    Center,
    Button,
} from "@chakra-ui/react";
import img1 from '../images/community_img.png';

export default function CommunityHero() {
    return (
        <Container maxW={"3xl"} pt={4} id="community">
            <Box mt={3}>
                <Stack spacing={4} align={"center"}>
                    <Text fontWeight={500} textAlign={"center"} fontSize={"sm"} color={"white"} w={"100%"}>COMMUNITY</Text>
                    <Text textAlign={"center"} fontSize={{ base: "24px", md: "28px" }} w={{ base: "100%", md: "60%" }} lineHeight={1.2} fontWeight={600} color={"white"}>Join Our Supportive Community of Professionals</Text>
                </Stack>
                <Center pt={6}>
                    <Image src={img1} h={{ base: 125, md: 220 }} />
                    <Button size={{ base: "sm", md: "md" }} position={"absolute"} rounded={30} bg={"#010101"} _hover={{ bg: "#333333" }} color={"white"} fontSize={{ base: "xs", md: "sm" }} mt={{ base: "65px", md: 28 }}>Join Community</Button>
                </Center>
            </Box>
        </Container>
    )
}