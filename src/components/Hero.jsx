import {
    Box,
    Avatar,
    Text,
    Container,
    VStack
} from "@chakra-ui/react";

export const Hero = ({ storeInfo = null }) => {
    return (
        <Container display={{ base: 'none', md: 'none' }} maxW={'5xl'} py={6}>
            <Box h={'200px'} bg={'#F0EDF9'} rounded={15}>
                <VStack pt={7} spacing={2.5}>
                    <Avatar borderWidth={2} borderColor={'#CCC4EC'} size={'xl'} src={storeInfo ? storeInfo.avatar : ''}></Avatar>
                    <Text fontSize={'md'} fontWeight={600}>{storeInfo ? storeInfo.businessName : ''}</Text>
                    <Text fontSize="xs" color="gray.600" mt={-2}>
                        {storeInfo ? (storeInfo.businessEmailAddress ? storeInfo.businessEmailAddress : '') + (storeInfo.businessPhoneNumber ? ' | ' + storeInfo.businessPhoneNumber : '') : ''}
                    </Text>
                </VStack>
            </Box>
        </Container>
    )
}