import {
    Image,
    Text,
    Stack,
    Box,
    Center,
    Container
} from "@chakra-ui/react";
import gplayImg from '../images/gplay_dark.png';
import appStoreImg from '../images/appstore_dark.png';
import { APP_STORE_URL, PLAY_STORE_URL } from "../config";

export default function BottomHero() {
    return (
        <Container maxW={"5xl"} py={{ base: 10, md: 8 }}>
            <Stack align={"center"}>
                <Stack py={{ base: 0, md: 5 }} spacing={4} w={{ base: '100%', md: '45%' }}>
                    <Text w={'100%'}
                        color={"#7C5CFC"}
                        fontSize={{ base: 'md', md: "32px" }}
                        rounded={"md"}
                        textAlign={'center'}
                        fontWeight={700}
                    >
                        Join Smerp Go today
                    </Text>
                    <Text px={{ base: 6, md: 0 }} textAlign={"center"} fontSize={{ base: 'sm', md: 'sm' }} lineHeight={1.5}>
                        Let's embody your beautiful ideas together, simplify the way you visualize your next big things.
                    </Text>
                    <Center>
                        <Stack pt={1} spacing={{ base: 2, md: 4 }} direction={"row"}>
                            <Box as='a' href={PLAY_STORE_URL} target="_blank">
                                <Image src={gplayImg} w={{ base: '120px', md: '125px' }} />
                            </Box>
                            <Box as='a' href={APP_STORE_URL} target="_blank">
                                <Image src={appStoreImg} w={{ base: '110px', md: '115px' }} />
                            </Box>
                        </Stack>
                    </Center>
                </Stack>
            </Stack>
        </Container>
    )
}
