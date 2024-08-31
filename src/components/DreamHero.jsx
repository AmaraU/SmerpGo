import {
    Stack,
    Text,
    Box,
    Image,
    Center,
    Divider,
    VStack
} from "@chakra-ui/react";
import img1 from '../images/dream_img1.png';
import img2 from '../images/dream_img2.png';

export default function DreamHero() {

    return (
        <Center pt={16} id="about">
            <Stack>
                <Stack spacing={1}>
                    <Text fontWeight={500} textAlign={"center"} fontSize={"sm"} color={"#7C5CFC"}>DREAM</Text>
                    <Text textAlign={"center"} fontSize={{ base: "26px", md: "32px" }} fontWeight={600} color={"#040815"}>Easy and Simple</Text>
                </Stack>
                <Stack display={{ base: "none", md: "flex" }} direction={"row"} spacing={6} pt={8}>
                    <Stack spacing={3}>
                        <Box>
                            <Image src={img1} h={150} />
                        </Box>
                        <Text textAlign={"start"} fontSize={"md"} fontWeight={600} color={"#040815"}>Elevate Your Game with Smerp Go</Text>
                        <Text textAlign={"start"} fontSize={"13px"} color={"#596780"} maxW={"250px"}>Embrace the simplicity Smerp Go brings to your hustle. Imagine effortlessly managing your business, streamlining operations, and achieving more in less time.</Text>
                    </Stack>
                    <VStack justify={"center"}>
                        <Divider borderColor={"#7C5CFC"} orientation="vertical" h={"75%"} />
                    </VStack>
                    <Stack pt={3}>
                        <Text textAlign={"start"} fontSize={"md"} fontWeight={600} color={"#040815"}>Smerp Go for Everyone</Text>
                        <Text textAlign={"start"} fontSize={"13px"} color={"#596780"} maxW={"250px"}>Double your hustle, make it profitable. Power up your journey with Smerp Go and watch your ambitions take flight!</Text>
                        <Box pt={2.5}>
                            <Image src={img2} h={150} />
                        </Box>
                    </Stack>
                </Stack>

                <Stack display={{ md: "none" }} spacing={6} pt={4}>
                    <Stack spacing={3} align={"center"}>
                        <Box>
                            <Image src={img1} h={150} />
                        </Box>
                        <Text textAlign={"center"} fontSize={"md"} fontWeight={600} color={"#040815"}>Elevate Your Game with Smerp Go</Text>
                        <Text textAlign={"center"} fontSize={"13px"} color={"#596780"} maxW={"250px"}>Embrace the simplicity Smerp Go brings to your hustle. Imagine effortlessly managing your business, streamlining operations, and achieving more in less time.</Text>
                    </Stack>
                    <Stack justify={"center"} py={6}>
                        <Divider borderColor={"#7C5CFC"} w={"98%"} />
                    </Stack>
                    <Stack align={"center"}>
                        <Text textAlign={"center"} fontSize={"md"} fontWeight={600} color={"#040815"}>Smerp Go for Everyone</Text>
                        <Text textAlign={"center"} fontSize={"13px"} color={"#596780"} maxW={"250px"}>Double your hustle, make it profitable. Power up your journey with Smerp Go and watch your ambitions take flight!</Text>
                        <Box pt={2}>
                            <Image src={img2} h={150} />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Center>
    )
}