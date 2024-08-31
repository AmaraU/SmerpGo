import {
    Text,
    Container,
    SimpleGrid
} from "@chakra-ui/react";
import { Store } from "./Store";

export const Stores = ({ stores = [] }) => {
    return (
        <Container maxW={'5xl'}>
            <Text fontSize={'sm'} fontWeight={600} pt={0.5}>All Stores ({stores.filter(o => o.storeName.toLowerCase() !== 'store name').length})</Text>
            <SimpleGrid columns={{ base: 2, md: 5 }} gap={4} pt={7} spacingY={9} >
                {
                    stores.length > 0 ? stores.filter(o => o.storeName.toLowerCase() !== 'store name').map((s, k) => <Store {...s} key={k} />) : ''
                }
            </SimpleGrid>
        </Container>
    )
}