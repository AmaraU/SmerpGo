import { Stack, Text, Button, Box } from "@chakra-ui/react";
import NavBarHome from "../components/NavBarHome";
import BottomHero from "../components/BottomHero";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export const Page404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBarHome />
            <Stack pt={16} pb={20}>
                <Text lineHeight={2} textAlign={'center'} fontWeight={600} fontSize={'3xl'}>Sorry, we couldn't find the page you are looking for :(</Text>
                <Button fontWeight={400} variant={'link'} align={'center'} fontSize={'2xl'} color="blue.600" onClick={() => navigate('/stores')}>See all stores</Button>
            </Stack>
            <Box bg={'#F0EDF9'} mt={20}>
                <BottomHero />
            </Box>
            <Box bg={"#1A202C"}>
                <Footer />
            </Box>
        </>
    );
}