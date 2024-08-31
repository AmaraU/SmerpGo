import {
    Box,
    Image,
    Text,
    Container,
    Stack
} from "@chakra-ui/react";
import heroImg1 from '../images/announce.png';
import heroImg2 from '../images/shopping_bags.png';

export const HeroStores = () => {
    return (
        <Container display={{ base: 'none', md: 'block' }} maxW={'5xl'} py={6}>
            <Box h={'200px'} bg={'#8677D6'} rounded={25}>
                <Stack direction={'row'} justify={'space-between'}>
                    <Image src={heroImg1} w={'21.4%'} />
                    <Text w={'35%'} lineHeight={1.2} align={'center'} pt={16} color={'white'} fontWeight={600} fontSize={'3xl'}>Just a smerp away from what you need</Text>
                    <Image src={heroImg2} w={'250px'} />
                </Stack>
            </Box>
        </Container>
    )
}