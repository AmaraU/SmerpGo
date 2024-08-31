import NavBar from './NavBar';
import { Footer } from './Footer';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QuantityField } from './QuantityField';
import { Stack, IconButton, VStack, Container, Heading, Text, Box, HStack, useColorModeValue, Avatar, Divider, Button } from '@chakra-ui/react';
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons';
import { TbCurrencyNaira } from 'react-icons/tb';
import BottomHero from './BottomHero';

export const Cart = () => {
    const [cartItemsCount, setCartsItemCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const storeInfo = location.state;
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionStorage.getItem('merchantId')) {
            navigate("/stores");
            return;
        }

        if (storeInfo) {
            setCartsItemCount(storeInfo.itemsCount);
            if (storeInfo.itemsCount > 0) {
                setCartItems(JSON.parse(sessionStorage.getItem('items')));
            }
            window.history.replaceState(null, '');
        }
        else {
            navigate(`/merchant/${sessionStorage.getItem('merchantId')}`);
        }
    }, []);

    useEffect(() => {
        getTotal();
    }, [cartItems])


    const handleQuantity = (id, amount, qty) => {
        if (sessionStorage.getItem('items')) {
            const items = JSON.parse(sessionStorage.getItem('items'));
            const filter = items.filter(e => e.id === id);
            if (filter.length > 0) {
                const itemsNew = items.map(v => v.id === id ? ({ ...v, quantity: qty }) : ({ ...v }));
                sessionStorage.setItem('items', JSON.stringify(itemsNew));
                setCartItems(itemsNew);
            }
        }
    }

    const getTotal = () => {
        const total = cartItems.map(v => v.amount * v.quantity).reduce((v, t) => v + t, 0);
        setTotal(total);
    }

    const handleDelete = (id) => {
        const cartItemsNew = cartItems.filter(e => e.id !== id);
        setCartItems(cartItemsNew);
        setCartsItemCount(cartItemsNew.length);
        sessionStorage.setItem('items', JSON.stringify(cartItemsNew));

        const total = cartItemsNew.map(v => v.amount * v.quantity).reduce((v, t) => v + t, 0);
        setTotal(total);
    }

    return (
        <>
            <NavBar storeInfo={storeInfo} showSearch={false} cartItems={cartItemsCount} />
            <Container maxW={"3xl"} py={{ base: 8, md: 10 }} pb={{ base: 10, md: 20 }}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    px={{ base: 4, md: 8 }}
                    pt={1}
                    pb={10}
                >
                    <VStack spacing={4} pb={8} align={'left'}>
                        <HStack spacing={1.5} color={'gray.800'}>
                            <IconButton bg={'#F0EDF9'} onClick={() => navigate(`/merchant/${sessionStorage.getItem('merchantId')}`)} mr={8} h={9} aria-label='Back' icon={<ArrowBackIcon fontSize={16} />} />

                            <Heading fontSize={{ base: 'xl', md: '20px' }}>
                                Your Cart Items ({cartItemsCount})
                            </Heading>
                        </HStack>
                        {
                            cartItemsCount > 0 ?
                                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'sm' }}>
                                    Below are the item(s) in your cart. Increase (or decrease) the quantity of a product and then proceed to checkout.
                                </Text> :
                                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                                    There are no items in your cart.
                                </Text>
                        }

                    </VStack>
                    {
                        cartItems.map((v, k) =>
                            <>
                                <Stack key={k} direction={'row'} justify={'space-between'}>
                                    <HStack spacing={2} w={'80%'}>
                                        <Avatar
                                            _hover={{ cursor: 'pointer' }}
                                            color="white"
                                            name={cartItems[k].item}
                                            bg="#16456d"
                                            size="md"
                                            src={cartItems[k].img}
                                        />
                                        <VStack
                                            alignItems="flex-start"
                                            spacing="1px"
                                            ml="2"
                                        >
                                            <Text fontSize="15px" fontWeight={600}>{cartItems[k].item.length > 35 ? cartItems[k].item.substring(0, 35) + '...' : cartItems[k].item} </Text>
                                            <HStack ml={-0.5} spacing={0} color="#3E3ABE">
                                                <Box>
                                                    <TbCurrencyNaira size={'20px'} />
                                                </Box>

                                                <Text fontWeight={600} fontSize={{ base: "md", md: "md" }}>
                                                    {Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cartItems[k].amount)}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                    <>
                                        <Button display={{ base: 'none', md: 'flex' }} w={'20%'} fontSize={'xs'} variant={'link'} onClick={() => handleDelete(cartItems[k].id)}>Remove item</Button>
                                        <IconButton onClick={() => handleDelete(cartItems[k].id)} variant={'outline'} size={'md'} display={{ md: 'none' }} colorScheme={'red'} icon={<DeleteIcon />} />
                                        <Box display={{ base: 'none', md: 'flex' }} w={'30%'}>
                                            <QuantityField index={cartItems[k].id} defaultVal={cartItems[k].quantity} amount={cartItems[k].amount} onChanged={handleQuantity} maxQty={cartItems[k].quantityInStock} />
                                        </Box>
                                    </>
                                </Stack>
                                <Box w={'40%'} ml={'65px'} display={{ md: 'none' }}>
                                    <QuantityField index={cartItems[k].id} defaultVal={cartItems[k].quantity} amount={cartItems[k].amount} onChanged={handleQuantity} maxQty={cartItems[k].quantityInStock} isCart={false} />
                                </Box>
                                <Box py={{ base: 4, md: 5 }}>
                                    <Divider />
                                </Box>
                            </>
                        )
                    }
                    <Stack direction={'row'} justify={'space-between'} pb={8}>
                        <Text fontWeight={400} fontSize="md">Total</Text>
                        <HStack ml={-0.5} spacing={0}>
                            <Box>
                                <TbCurrencyNaira size={'20px'} />
                            </Box>

                            <Text fontWeight={600} fontSize="md">
                                {Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(total)}
                            </Text>
                        </HStack>
                    </Stack>
                    <Button
                        w={'100%'}
                        isDisabled={cartItemsCount === 0}
                        rounded={14}
                        fontSize={{ base: 'md', md: 'md' }}
                        fontWeight={400}
                        color={"white"}
                        bg={"#695ACD"}
                        _hover={{
                            bg: "#7867EC"
                        }}
                        py={6}
                        onClick={() => navigate('/checkout', { state: { cartItems, cartItemsCount, total, storeInfo } })}
                    >
                        Check out
                    </Button>

                </Box>
            </Container>

            <Box bg={'#F0EDF9'} mt={20}>
                <BottomHero />
            </Box>
            <Box bg={"#1A202C"}>
                <Footer />
            </Box>
        </>
    );
}
