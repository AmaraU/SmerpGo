import {
    Box,
    Text,
    Stack,
    Button,
    SimpleGrid,
    HStack,
    Select
} from "@chakra-ui/react";
import { Product } from "./Product";
import { useEffect, useState } from "react";

export const Products = ({ collection = null, categories = null, products = null, addToCart = null, updateCart = null }) => {
    const [prod, setProd] = useState(products);
    const [categ, setCateg] = useState(categories);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const screenWidth = window.screen.availWidth;

    useEffect(() => {
        handleCategory(selectedCategory);
    }, [products]);

    const handleCategory = (category) => {
        setSelectedCategory(category);
        setCateg(categ.map(c => (c.name === category ? { ...c, isSelected: true } : { ...c, isSelected: false })));

        if (category === 'All')
            setProd(products);
        else
            setProd(products.filter(c => c.productCategory === category));
    }

    return (
        <Box>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 4 }} justify={'space-between'} display={{ base: "none", md: "flex" }}>
                <Text fontSize={'sm'} fontWeight={600} pt={0.5}>{selectedCategory} Products ({prod.length})</Text>
                <div style={{ overflow: 'auto', height: '30px' }}>
                    <Stack w={'max-content'} direction={'row'} mt={{ base: 0, md: 0 }}>
                        {
                            categ.length > 0 ? categ.map((c, k) => c.isSelected ? <Button key={k} fontWeight={400} size={'xs'} borderColor={'#695ACD'} borderWidth={0.5} borderRadius='full' color={'gray.800'} bg='#F9F8FD' _hover={{ bg: '#F0EDF9' }} onClick={() => handleCategory(c.name)}>
                                {c.name}
                            </Button> : <Button key={k} onClick={() => handleCategory(c.name)} fontWeight={400} size={'xs'} color={'gray.800'} _hover={{ bg: '#F0EDF9' }} bg={'white'}>
                                {c.name}
                            </Button>
                            ) : ''
                        }
                    </Stack>
                </div>
                <Stack direction={"row"} fontSize={"xs"} pt={"2.8px"} spacing={1.5}>
                    <Text fontSize={"xs"} fontWeight={500}>Sort by: </Text>
                    <Select fontWeight={500} size={"xs"} variant='unstyled' w={"70px"}>
                        <option value={"1"}>Latest</option>
                    </Select>
                </Stack>
            </Stack>

            <Stack spacing={4} display={{ md: "none" }}>
                <HStack justify={'space-between'} mb={3}>
                    <Text fontSize={'sm'} fontWeight={600} pt={0.5}>{selectedCategory} Products ({prod.length})</Text>
                    <Stack direction={"row"} fontSize={"xs"} pt={"2.8px"} spacing={1.5}>
                        <Text fontSize={"xs"} fontWeight={500}>Sort by: </Text>
                        <Select fontWeight={500} size={"xs"} variant='unstyled' w={"70px"}>
                            <option value={"1"}>Latest</option>
                        </Select>
                    </Stack>
                </HStack>
                <div style={{ overflow: 'auto', height: '30px' }}>
                    <Stack w={'max-content'} direction={'row'}>
                        {
                            categ.length > 0 ? categ.map((c, k) => c.isSelected ? <Button key={k} fontWeight={400} size={'xs'} borderColor={'#695ACD'} borderWidth={0.5} borderRadius='full' color={'gray.800'} bg='#F9F8FD' _hover={{ bg: '#F0EDF9' }} onClick={() => handleCategory(c.name)}>
                                {c.name}
                            </Button> : <Button key={k} onClick={() => handleCategory(c.name)} fontWeight={400} size={'xs'} color={'gray.800'} _hover={{ bg: '#F0EDF9' }} bg={'white'}>
                                {c.name}
                            </Button>
                            ) : ''
                        }
                    </Stack>
                </div>
            </Stack>

            <SimpleGrid columns={{ base: 2, md: screenWidth < 1600 ? 4 : 5 }} gap={4} pt={5} spacingY={9} >
                {
                    prod.length > 0 ? prod.map((p, k) => <Product {...p} addToCart={addToCart} updateCart={updateCart} key={k} />) : ''
                }
            </SimpleGrid>
        </Box>
    )
}