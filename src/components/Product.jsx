import {
    Box,
    HStack,
    Image,
    Text,
    Stack,
    Card,
    CardBody,
    Button,
    Center,
} from "@chakra-ui/react";
import { TbCurrencyNaira } from 'react-icons/tb';
import { BsBasket } from 'react-icons/bs';
import blank from '../images/blank.jpg';
import { PiSealCheckFill } from 'react-icons/pi';
import { useEffect, useState } from "react";
import { QuantityField } from "./QuantityField";

export const Product = ({ id, productCategory, productImage = null, productName = "No name", sellingPrice = 0, quantity = 0, addToCart = null, updateCart = null }) => {
    const [inCart, setInCart] = useState(false);
    const [qty, setQuantity] = useState(1);
    const screenWidth = window.screen.availWidth;

    useEffect(() => {
        cartStatus();
    }, [])

    const processCart = () => {
        addToCart(id, productName, sellingPrice, productImage, qty, quantity);
        cartStatus();
    }

    const cartStatus = () => {
        if (sessionStorage.getItem('items')) {
            const items = JSON.parse(sessionStorage.getItem('items'));
            const filter = items.filter(e => e.id === id);
            if (filter.length > 0) {
                setInCart(true);
                setQuantity(filter[0].quantity);
            }
            else {
                setInCart(false);
                setQuantity(1);
            }
        }
    }

    const handleQuantity = (index, amount, value) => {
        setQuantity(value);
        if (inCart) {
            updateCart(index, value);
        }
    }

    return (
        <Card maxW='sm' align={{ base: 'center', md: 'center' }}>
            <CardBody mx={-2} mt={-4}>
                <Center>
                    <Image
                        src={productImage ? productImage : blank}
                        alt={`Picture of ${productName}`}
                        borderRadius='lg'
                        boxSize={screenWidth <= 1280 ? "170px" : 48}
                        objectFit={'scale-down'}
                    />
                </Center>
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
                        <Center>
                            {window.matchMedia("(max-width: 667px)").matches ? productName.substring(0, 23) : (window.matchMedia("(max-width: 767px)").matches ? productName.substring(0, 23) : productName.substring(0, 30))} <br />
                            {window.matchMedia("(max-width: 667px)").matches ? productName.substring(23, 46) : (window.matchMedia("(max-width: 767px)").matches ? productName.substring(23, 46) : productName.substring(30, 59))}
                        </Center>
                    </Box>
                    <Center>
                        <HStack ml={-0.5} spacing={0} color="black" alignItems={"center"}>
                            <Box fontSize={'16.5px'} mt={navigator.userAgent.includes('Safari') ? "1px" : 0}>
                                <TbCurrencyNaira />
                            </Box>
                            <Text fontWeight={600} fontSize="14px">
                                {Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sellingPrice)}
                            </Text>
                        </HStack>
                    </Center>

                    {
                        sessionStorage.getItem(productName) || inCart ?
                            <Center>
                                <Box w={'97%'} as={Button} isDisabled={true} mt={3} rightIcon={<PiSealCheckFill size={'18px'} color="#666666" />} bg={'#F0EDF9'} fontWeight={500} fontSize={'13px'} size={'sm'} rounded={12}>Added to cart
                                </Box>
                            </Center> :
                            <Center>
                                <Button w={'97%'} mt={3} isDisabled={quantity <= 0} leftIcon={<BsBasket size={'14px'} />} bg={'#F0EDF9'} fontWeight={500} fontSize={'13px'} size={'sm'} rounded={12} onClick={processCart}>{quantity > 0 ? "Add to cart" : "Out of stock"}</Button>
                            </Center>
                    }
                    <Center>
                        <Box w={'90%'}>
                            <QuantityField index={id} defaultVal={JSON.parse(sessionStorage.getItem('items')) ? (JSON.parse(sessionStorage.getItem('items')).filter(e => e.id === id).length > 0 ? JSON.parse(sessionStorage.getItem('items')).filter(e => e.id === id)[0].quantity : 1) : 1} amount={sellingPrice} onChanged={handleQuantity} isCart={false} maxQty={quantity} />
                        </Box>
                    </Center>
                </Stack>
            </CardBody>
        </Card>
    )
}
