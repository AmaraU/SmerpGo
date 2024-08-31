import {
    Container,
    Heading,
    Stack,
    Text,
    Box,
    Image,
    Button,
    HStack,
    IconButton,
    Card, CardBody
} from "@chakra-ui/react";
import kuleanpayLogo from '../images/kuleanpay_logo.png';
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CARD_WIDTH = 370;

export default function BlogHero() {
    const [scrollPos, setScrollPos] = useState(0);
    const containerRef = useRef();

    const handleScrolling = (scrollAmt) => {
        const scrollPosition = scrollPos + scrollAmt;
        setScrollPos(scrollPosition);
    }

    useEffect(() => {
        containerRef.current.scrollLeft = scrollPos;
    }, [scrollPos])

    const blogs = [
        {
            id: 1,
            title: "Collaboration with Kulean Pay",
            desc: "Track direct messages, comments, and mentions from multiple communication channels, such as social media platforms, all in one place",
            url: "#",
            img: kuleanpayLogo
        },
        {
            id: 2,
            title: "Collaboration with Kulean Pay",
            desc: "Track direct messages, comments, and mentions from multiple communication channels, such as social media platforms, all in one place",
            url: "#",
            img: kuleanpayLogo
        },
        {
            id: 3,
            title: "Collaboration with Kulean Pay",
            desc: "Track direct messages, comments, and mentions from multiple communication channels, such as social media platforms, all in one place",
            url: "#",
            img: kuleanpayLogo
        },
        {
            id: 4,
            title: "Collaboration with Kulean Pay",
            desc: "Track direct messages, comments, and mentions from multiple communication channels, such as social media platforms, all in one place",
            url: "#",
            img: kuleanpayLogo
        },
        {
            id: 5,
            title: "Collaboration with Kulean Pay",
            desc: "Track direct messages, comments, and mentions from multiple communication channels, such as social media platforms, all in one place",
            url: "#",
            img: kuleanpayLogo
        },
    ]

    return (
        <Container maxW={"6xl"} pt={16} id="testimonials">
            <Stack spacing={7}>
                <Stack>
                    <Text fontSize={"sm"} color={"#7C5CFC"} fontWeight={500}>TESTIMONIALS</Text>
                    <Stack direction={"row"} alignItems={"center"} justify={"space-between"}>
                        <Text w={"70%"} fontSize={{ base: "22px", md: "32px" }} fontWeight={600} color={"#040815"} lineHeight={1.2}>Get Valuable Industry Insights</Text>
                        <HStack>
                            <IconButton isDisabled={scrollPos === 0} onClick={() => handleScrolling(-CARD_WIDTH)} size={"sm"} variant={"outline"} borderColor={"#7C5CFC66"} color={"#7C5CFC"} _hover={{ bg: "#7C5CFC22" }} icon={<IoIosArrowBack size={24} />} />
                            <IconButton onClick={() => handleScrolling(CARD_WIDTH)} size={"sm"} variant={"outline"} borderColor={"#7C5CFC66"} color={"#7C5CFC"} _hover={{ bg: "#7C5CFC22" }} icon={<IoIosArrowForward size={24} />} />
                        </HStack>
                    </Stack>
                </Stack>
                <div ref={containerRef} style={{ overflowX: "auto", scrollBehavior: "smooth" }} >
                    <div style={{ width: "2000px", display: "flex", alignItems: "center", gap: "20px" }}>
                        {
                            blogs.map((v, k) =>
                                <Card key={k} w={{ base: "300px", md: '370px' }} variant={"outline"} borderColor={"white"}>
                                    <CardBody bg={"#EFEBFE"} rounded={20}>
                                        <Stack justify={"center"} align={"center"} h={200} rounded={15} bg={"white"}>
                                            <Image src={v.img} w={{ base: 180, md: 230 }} />
                                        </Stack>

                                        <Stack mt='6' spacing='3'>
                                            <Heading fontSize={{ base: "16px", md: '17px' }}>{v.title}</Heading>
                                            <Text w={{ base: "95%", md: "100%" }} fontSize={{ base: "13px", md: "sm" }} color={"#616161"}>
                                                {v.desc}
                                            </Text>
                                            <Box alignSelf={"start"}>
                                                <Button rightIcon={<ExternalLinkIcon fontSize="sm" />} variant={"link"} color={"#7C5CFC"} fontSize={{ base: "15px", md: '16px' }}>Read More</Button>
                                            </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            )
                        }
                    </div>
                </div>
                <Box alignSelf={"center"} pt={4}>
                    <Button fontSize={{ base: "13px", md: "sm" }} rounded={26} bg={"#7C5CFC"} _hover={{ bg: "#7C5CFCCF" }} color={"white"}>Visit Our Blog</Button>
                </Box>
            </Stack>
        </Container>
    )
}