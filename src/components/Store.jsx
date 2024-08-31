import {
    Box,
    Image,
    Stack,
    Card,
    CardBody,
} from "@chakra-ui/react";
import blank from '../images/blank.jpg';

export const Store = ({ avatar = null, storeName = "No name", storeLink = null }) => {
    return (
        <Card maxW='sm' align={{ base: 'center', md: 'start' }} _hover={{ borderWidth: 1, borderColor: '#8677D691' }}>
            <CardBody
                mx={-2}
                mt={-4}
                as='a'
                href={
                    `${storeLink ?
                        '/' + (storeLink.indexOf("merchant") !== -1 ? storeLink.substring(storeLink.indexOf("merchant")) : (storeLink.indexOf("marchant") !== -1 ? storeLink.substring(storeLink.indexOf("marchant")) : "")) :
                        '#'}`
                }
                target={`${storeLink ? '_blank' : ''}`}
            >
                <Box>
                    <Image
                        src={avatar ? (avatar === 'N/A' ? blank : avatar) : blank}
                        alt={`Picture of ${storeName}`}
                        borderRadius='lg'
                        boxSize={'40'}
                        objectFit={'cover'}
                    />
                </Box>
                <Stack spacing={1} >
                    <Box
                        fontSize="14px"
                        fontWeight={600}
                        color="gray.600"
                        pt={2}
                        w={'100%'}
                        isTruncated
                        noOfLines={2}
                    >
                        {window.matchMedia("(max-width: 667px)").matches ? storeName.substring(0, 19) : (window.matchMedia("(max-width: 767px)").matches ? storeName.substring(0, 22) : storeName.substring(0, 23))} <br />
                        {window.matchMedia("(max-width: 667px)").matches ? storeName.substring(19, 38) : (window.matchMedia("(max-width: 767px)").matches ? storeName.substring(22, 43) : storeName.substring(23, 46))}
                    </Box>
                </Stack>
            </CardBody>
        </Card>

    )
}
