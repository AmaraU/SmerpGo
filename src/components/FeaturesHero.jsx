import {
    Container,
    Stack,
    Text,
    Box,
    Image,
    Center
} from "@chakra-ui/react";
import img1 from '../images/feature_img_1.png';
import img2 from '../images/feature_img_2.png';
import img3 from '../images/feature_img_3.png';
import img4 from '../images/feature_img_4.png';
import img5 from '../images/feature_img_5.png';
import gradientImg from '../images/gradient.png';

export default function FeaturesHero() {
    return (
        <Container maxW={"4xl"}>
            <Stack id="features">
                <Stack px={{ base: 2, md: 0 }} pt={20} spacing={2} bgImage={{ md: gradientImg }} bgSize={"contain"} bgRepeat={"no-repeat"} bgPosition={"center"}>
                    <Text align={"start"} fontSize={"sm"} color={"#7C5CFC"} fontWeight={500}>FEATURES</Text>
                    <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 4, md: 0 }} alignItems={"center"} justify={{ md: "space-between" }}>
                        <Text w={{ base: "100%", md: "40%" }} fontSize={{ base: "26px", md: "32px" }} fontWeight={600} color={"#040815"} lineHeight={1.2}>Discover our Powerful Tools for Your Business</Text>
                        <Text textAlign={"start"} fontSize={"13px"} color={"#596780"} w={{ base: "100%", md: "250px" }}>Take a look at some of our amazing features tailored for your success and standout with Smerp Go.</Text>
                    </Stack>
                </Stack>
                <Stack direction={{ base: "column", md: "row" }} spacing={6} pt={6}>
                    <Box w={"100%"} rounded={12} bg={{ base: "#F6F6F9", md: "#F9F9FB" }} px={{ base: 6, md: 4 }} pt={5} spacing={3}>
                        <Stack spacing={3}>
                            <Text textAlign={"start"} fontSize={"16px"} fontWeight={600} color={"#040815"}>Record Sales and Streamline Orders</Text>
                            <Text textAlign={"start"} fontSize={"13px"} color={"#596780"} >Effortlessly track and manage every sale and order, keeping your business on the path to success.</Text>
                        </Stack>
                        <Center pt={{ base: 4, md: 7 }}>
                            <Image src={img1} w={{ base: 200, md: 250 }} />
                        </Center>
                    </Box>
                    <Box w={"100%"} rounded={12} bg={{ base: "#F6F6F9", md: "#F9F9FB" }} px={{ base: 6, md: 4 }} pt={5} spacing={3}>
                        <Stack spacing={3}>
                            <Text textAlign={"start"} fontSize={"16px"} fontWeight={600} color={"#040815"}>Receive financial Insights and reports on your business</Text>
                            <Text textAlign={"start"} fontSize={"13px"} color={"#596780"}>See as your money dey move with real-time reports. Make better decisions wey go make your business shine.</Text>
                        </Stack>
                        <Center pt={{ base: 4, md: 7 }}>
                            <Image src={img2} w={{ base: 300, md: 350 }} />
                        </Center>
                    </Box>
                </Stack>
                <Box mt={{ base: 4, md: 3 }} w={"100%"} rounded={12} bg={"linear-gradient(91deg, rgba(99.60, 76.29, 255, 0.75) 55%, rgba(99.60, 76.29, 255, 0.75) 55%, rgba(99.60, 76.29, 255, 0.28) 100%, rgba(168, 154, 255, 0.98) 100%)"} px={7} pt={5}>
                    <Stack direction={{ base: "column", md: "row" }} justify={"space-between"}>
                        <Stack justify={"center"} w={{ base: "100%", md: "40%" }} spacing={3}>
                            <Text fontSize={"18px"} fontWeight={600} color={"white"}>Manage Inventory</Text>
                            <Text fontSize={"14px"} color={"white"}>Take control of your stock with intuitive tools, ensuring you never miss a beat in your product offerings.</Text>
                        </Stack>
                        <Box pt={2} alignSelf={{ base: "center", md: "start" }}>
                            <Image src={img3} w={{ base: 200, md: 250 }} />
                        </Box>
                    </Stack>
                </Box>
                <Stack direction={{ base: "column", md: "row" }} spacing={6} pt={3} pb={10}>
                    <Box w={"100%"} rounded={12} bg={"#F9F9FB"} px={{ base: 6, md: 4 }} mt={{ base: 1, md: 0 }} pt={5} spacing={3}>
                        <Stack spacing={3}>
                            <Text textAlign={"start"} fontSize={"16px"} fontWeight={600} color={"#040815"}>Business Websites</Text>
                            <Text textAlign={"start"} fontSize={"13px"} color={"#596780"}>Claim Your Digital Space, launch your business into the online realm with a professional business website, showcasing your brand to the world.</Text>
                        </Stack>
                        <Center pt={4}>
                            <Image src={img4} w={{ base: 200, md: 250 }} />
                        </Center>
                    </Box>
                    <Box w={"100%"} rounded={12} bg={"#F9F9FB"} px={{ base: 6, md: 4 }} pt={5} spacing={3}>
                        <Stack spacing={3}>
                            <Text textAlign={"start"} fontSize={"16px"} fontWeight={600} color={"#040815"}>Receive financial Insights and reports on your business</Text>
                            <Text textAlign={"start"} fontSize={"13px"} color={"#596780"}>See as your money dey move with real-time reports. Make better decisions wey go make your business shine.</Text>
                        </Stack>
                        <Center pt={3}>
                            <Image src={img5} w={{ base: 230, md: 250 }} />
                        </Center>
                    </Box>
                </Stack>
            </Stack>
        </Container >
    )
}