import {
    Container,
    Image,
    Text,
    Stack,
    Box,
} from "@chakra-ui/react";
import gplayImg from '../images/google_play.svg';
import appStoreImg from '../images/apple_store.svg';
import { APP_STORE_URL, PLAY_STORE_URL } from "../config";

export default function AppDownload() {
    return (
        <Container maxW={"6xl"}>
            <Box borderRadius={0} bg={'#F0EDF9'}>
                <Stack direction={{ base: 'column', md: 'row' }} justify={{ base: 'normal', md: 'space-between' }}>
                    <Stack pt={{ base: 8, md: 16 }} pl={{ base: 4, md: 20 }} pr={{ base: 4, md: 0 }} spacing={4} w={{ base: '100%', md: '50%' }} align={{ base: 'center', md: 'start' }}>
                        <Text
                            color={"gray.600"}
                            fontWeight={600}
                            fontSize={"md"}
                            rounded={"md"}
                        >
                            Download the mobile app
                        </Text>
                        <Text align={{ base: 'center', md: 'start' }} fontSize={{ base: '26px', md: '45px' }} fontWeight={600} lineHeight={1.15} color={"#695ACD"}>Grow your business on the GO.</Text>
                        <Stack pt={1} spacing={4} direction={"row"}>
                            <Box as='a' href={PLAY_STORE_URL} target="_blank">
                                <Image src={gplayImg} w={{ base: '120px', md: '100%' }} />
                            </Box>
                            <Box as='a' href={APP_STORE_URL} target="_blank">
                                <Image src={appStoreImg} w={{ base: '110px', md: '100%' }} />
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}
