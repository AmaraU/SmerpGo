import {
    Container,
    Heading,
    Stack,
    Text,
    Box,
    Image,
} from "@chakra-ui/react";
import gplayImg from '../images/gplay_dark.png';
import appStoreImg from '../images/appstore_dark.png';
import appsImg from '../images/hero_img.png';
import { APP_STORE_URL, PLAY_STORE_URL } from '../config';

export default function HeroHome() {
    return (
        <>
            <Container maxW={"6xl"} pt={{ base: 4, md: 16 }} pl={{ base: 4, md: 16 }} pr={{ base: 4, md: 8 }}>
                <Stack direction={{ base: 'column', md: 'row' }} justify={{ md: 'space-between' }} pb={{ base: 5, md: 16 }} >
                    <Stack spacing={6} pt={8} pb={{ base: 6, md: 0 }}>
                        <Heading
                            fontWeight={700}
                            fontSize={{ base: "26px", md: "35px" }}
                            lineHeight={1.2}
                            textAlign={{ base: 'center', md: 'start' }}
                            bg={"linear-gradient(91deg, #644CFFCA, #644CFFEF, #644CFFBB, #644CFFBA)"}
                            bgClip={"text"}
                            w={{ base: "100%", md: "80%" }}
                        >
                            Grow your business with Smerp Go.
                        </Heading>
                        <Text px={{ base: 4, md: 0 }} align={{ base: 'center', md: 'start' }} fontSize={{ base: 'sm', md: '16px' }} color={"gray.700"} maxW={"lg"} lineHeight={1.5}>
                            Record sales, manage operations, issue receipts & invoices, gain vital financial insights, and claim your digital stage with Smerp Go. 🚀
                        </Text>
                        <Stack spacing={4} direction={"row"} justify={{ base: 'center', md: 'start' }}>
                            <Box as='a' href={PLAY_STORE_URL} target="_blank"><Image src={gplayImg} w='130px' /></Box>
                            <Box as='a' href={APP_STORE_URL} target="_blank"><Image src={appStoreImg} w='119px' /></Box>
                        </Stack>
                    </Stack>
                    <Box display={{ base: "none", md: "block" }} mt={{ base: 0, md: -8 }}>
                        <Image src={appsImg} h={350} />
                    </Box>
                </Stack>
            </Container>

            <Box align={"center"} display={{ md: "none" }} pb={{ base: 16, md: 10 }}>
                <Image src={appsImg} h={300} />
            </Box>
        </>

    )
}