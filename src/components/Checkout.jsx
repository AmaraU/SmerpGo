import NavBar from './NavBar';
import { Footer } from './Footer';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Stack, IconButton, VStack, Container, Heading, Text, Box, HStack, useColorModeValue, Divider, Button, RadioGroup, Radio, Image, FormControl, FormErrorMessage,
    FormLabel, useToast,
    Input,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoIosCash } from 'react-icons/io';
import kuleanPay from "../images/kulean_logo.svg";
import EmailValidator from "email-validator";
import BottomHero from './BottomHero';
import { submitOrder } from '../models/api_endpoints';

export const Checkout = () => {
    const [cartItemsCount, setCartsItemCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [storeInfo, setStoreInfo] = useState();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("Nigeria");
    const [paymentType, setPaymentType] = useState("1");
    const [phoneNo, setPhoneNo] = useState("");
    const [emailIsError, setEmailIsError] = useState(false);
    const [phoneIsError, setPhoneIsError] = useState(false);
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (!sessionStorage.getItem('merchantId')) {
            navigate("/stores");
            return;
        }

        if (data) {
            setCartsItemCount(data.cartItemsCount);
            setCartItems(data.cartItems);
            setTotal(data.total);
            setStoreInfo(data.storeInfo);
        }
        else {
            navigate(-1);
        }
    }, []);

    useEffect(() => {
        if (email.length > 0 && !EmailValidator.validate(email)) {
            setEmailIsError(true);
        }
        else {
            setEmailIsError(false);
        }
    }, [email]);

    useEffect(() => {
        if (!phoneNumberIsValid()) {
            setPhoneIsError(true);
        }
        else {
            setPhoneIsError(false);
        }
    }, [phoneNo]);

    const phoneNumberIsValid = () => {
        try {
            if (phoneNo.length > 0 && phoneNo.length !== 11) {
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            if (error.toString().includes('length')) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    const placeOrder = async () => {
        try {
            setIsLoading(true);

            const params = {
                merchantCode: sessionStorage.getItem('merchantId'),
                cart: cartItems.map(v => ({ productId: v.id, quantity: v.quantity, unitSellingPrice: v.amount })),
                buyer: {
                    firstName,
                    lastName,
                    phoneNumber: phoneNo,
                    emailAddress: email,
                    buildNo: 0,
                    street: address,
                    area: city,
                    lga: "",
                    state: state,
                    country
                },
                paymentMode: parseInt(paymentType),
                paymentStatus: 0
            };

            const response = await submitOrder(params);
            if (response) {
                const { status, data } = response;
                if (status === "success") {
                    setIsLoading(false);
                    if (data.isSuccess) {
                        toast({
                            description: "Success! Your order has been placed. Please check your email for details about your order. Thank you for choosing SmerpGo.",
                            position: "top",
                            status: 'success',
                            duration: 8000,
                            isClosable: true,
                        });
                        setIsLoading(false);
                        sessionStorage.removeItem('items');
                        navigate(`/merchant/${sessionStorage.getItem('merchantId')}`);
                        return;
                    }
                }
                else {
                    setIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (data[0].error === '""') {
                            navigate("/");
                            return;
                        }

                        if (typeof data[0].error === "string") {
                            err = data[0].error;
                        }
                        else {
                            const msg = JSON.parse(data[0].error);
                            if ("Message" in msg) {
                                err = msg.Message;
                            }
                            else if ("errors" in msg) {
                                err = msg.errors.toString();
                            }
                            else if ("title" in msg) {
                                err = msg.title.toString();
                            }
                        }
                    }

                    toast({
                        description: `Your order could not be placed at this time. Please try again later or contact support team. [Details: ${err}]`,
                        position: "top",
                        status: 'error',
                        duration: 8000,
                        isClosable: true,
                    })

                    return;
                }
            }
        } catch (error) {
            toast({
                description: `Your order could not be placed at this time. Please try again later or contact support team. [Details: ${error.toString()}]`,
                position: "top",
                status: 'error',
                duration: 8000,
                isClosable: true,
            })
            setIsLoading(false);
            return;
        }
        toast({
            description: `Your order could not be placed at this time. Please try again later or contact support team.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })
        setIsLoading(false);
    }

    const processOrder = async (e) => {
        e.preventDefault();
        await placeOrder();
    }

    return (
        <>
            <NavBar storeInfo={data.storeInfo} showSearch={false} cartItems={cartItemsCount} />
            <Container maxW={"3xl"} py={{ base: 8, md: 10 }} pb={{ base: 10, md: 20 }}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    px={{ base: 4, md: 8 }}
                    pt={1}
                    pb={10}
                    as='form'
                    onSubmit={processOrder}
                >
                    <VStack spacing={4} pb={6} align={'left'}>
                        <HStack spacing={1.5} color={'gray.800'}>
                            <IconButton bg={'#F0EDF9'} onClick={() => navigate('/cart', { state: { ...data.storeInfo, itemsCount: data.cartItemsCount, total }, replace: true })} mr={8} h={9} aria-label='Back' icon={<ArrowBackIcon fontSize={16} />} />

                            <Heading fontSize={{ base: 'xl', md: '20px' }}>
                                Check Out
                            </Heading>
                        </HStack>
                    </VStack>

                    <Text color={"#695ACD"} fontSize={{ base: 'md', md: 'md' }} fontWeight={500} pb={5}>Preferred payment method</Text>

                    <RadioGroup onChange={setPaymentType} value={paymentType} >
                        <Stack direction={'row'} justify={'space-between'} pb={4}>
                            <HStack>
                                <Image src={kuleanPay} />
                                <Text fontWeight={500} fontSize={"sm"}>Pay with KuleanPay <Text display={{ base: 'none', md: 'inline' }} as='span' fontSize={'sm'} color={'gray.500'}>(coming soon)</Text></Text>
                            </HStack>

                            <Radio value='0' size={'md'} isDisabled={true}></Radio>
                        </Stack>
                        <Stack direction={'row'} justify={'space-between'}>
                            <HStack>
                                <IoIosCash size={'24px'} color='green' />
                                <Text fontWeight={500} fontSize={"sm"}>Pay on Delivery</Text>
                            </HStack>
                            <Radio value='1' size={'md'}></Radio>
                        </Stack>
                    </RadioGroup>

                    <Box py={6}>
                        <Divider />
                    </Box>

                    <Text color={"#695ACD"} fontSize={{ base: 'md', md: 'md' }} fontWeight={500} pb={5}>Customer Information</Text>
                    <Box>
                        <Stack spacing={4}>
                            <Stack spacing={{ base: 4, md: 4 }} direction={{ base: 'column', md: 'row' }}>
                                <FormControl isRequired>
                                    <FormLabel fontSize={"sm"}>First name</FormLabel>
                                    <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontSize={"sm"}>Last name</FormLabel>
                                    <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </FormControl>
                            </Stack>
                            <Stack spacing={{ base: 4, md: 4 }} direction={{ base: 'column', md: 'row' }}>
                                <FormControl isInvalid={phoneIsError} isRequired>
                                    <FormLabel fontSize={"sm"}>Phone number</FormLabel>
                                    <Input type='text' maxLength={11} pattern='[0-9]*' value={phoneNo} onChange={(e) => setPhoneNo((v) => e.target.validity.valid ? e.target.value : '')} />
                                    {phoneIsError && <FormErrorMessage>Please enter a valid phone number.</FormErrorMessage>}
                                </FormControl>
                                <FormControl isInvalid={emailIsError} isRequired>
                                    <FormLabel fontSize={"sm"}>Email address</FormLabel>
                                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {emailIsError && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                                </FormControl>

                            </Stack>

                        </Stack>

                        <Text color={"#695ACD"} fontSize={{ base: 'md', md: 'md' }} pt={8} fontWeight={500} pb={5}>Shipping Address</Text>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel fontSize={"sm"}>Delivery address</FormLabel>
                                <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </FormControl>
                            <Stack spacing={{ base: 4, md: 4 }} direction={{ base: 'column', md: 'row' }}>
                                <FormControl isRequired>
                                    <FormLabel fontSize={"sm"}>City</FormLabel>
                                    <Input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontSize={"sm"}>State</FormLabel>
                                    <Input type='text' value={state} onChange={(e) => setState(e.target.value)} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontSize={"sm"}>Country</FormLabel>
                                    <Input isDisabled={true} type='text' value={country} />
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box pt={8} pb={6}>
                        <Divider />
                    </Box>
                    <Stack direction={'row'} justify={'space-between'} pb={6}>
                        <Text fontWeight={500} fontSize="lg">Total</Text>
                        <HStack ml={-0.5} spacing={0} color={'#695ACD'}>
                            <Box>
                                <TbCurrencyNaira size={'22px'} />
                            </Box>

                            <Text fontWeight={600} fontSize="lg">
                                {Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(total)}
                            </Text>
                        </HStack>
                    </Stack>
                    <Stack>
                        <Button
                            type='submit'
                            w={'100%'}
                            isLoading={isLoading}
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
                        >
                            Place Order
                        </Button>
                    </Stack>

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
