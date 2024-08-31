import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Image,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    FormErrorMessage,
    useToast,
    Text
} from '@chakra-ui/react';
import logo from "../images/logo_white.png";
import sideImg from "../images/login_img.jpeg";
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon, LockIcon, EmailIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_AUTH_ERR_MSG } from '../config';
import EmailValidator from "email-validator";
import { authenticate } from '../models/api_endpoints';

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState("");
    const [btnText, setBtnText] = useState("Sign in");
    const [emailIsError, setEmailIsError] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    useEffect(() => {
        if (email.length > 0 && !EmailValidator.validate(email)) {
            setEmailIsError(true);
        }
        else {
            setEmailIsError(false);
        }
    }, [email]);

    const login = async () => {
        try {
            setIsloading(true);
            const params = {
                username: email,
                password
            }

            const response = await authenticate(params);
            if (response) {
                const { status, data } = response;
                if (status === "success") {
                    setIsloading(false);
                    if (data.isSuccess) {
                        //alert("Logged in!");
                        sessionStorage.setItem("tk", data.data.token);
                        sessionStorage.setItem("fname", data.data.firstName);
                        sessionStorage.setItem("lname", data.data.lastName);
                        sessionStorage.setItem("email", data.data.email);
                        sessionStorage.setItem("avatar", data.data.avatar);
                        sessionStorage.setItem("userid", data.data.userId);
                        navigate("/dashboard");
                    }
                    else {
                        toast({
                            description: `${DEFAULT_AUTH_ERR_MSG} [Details: ${data.message}]"`,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    return;
                }
                else {
                    setIsloading(false);
                    let err = "";
                    if (status === "error") {
                        if (data[0].error === '""') {
                            toast({
                                description: DEFAULT_AUTH_ERR_MSG,
                                position: "top",
                                status: 'error',
                                duration: 8000,
                                isClosable: true,
                            })
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
                    if (err.toLowerCase().includes("invalid")) {
                        toast({
                            description: `Email address or password is incorrect.`,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                        return;
                    }
                    toast({
                        description: `${DEFAULT_AUTH_ERR_MSG} ${err ? " [Details: " + err + "]" : "."}`,
                        position: "top",
                        status: 'error',
                        duration: 8000,
                        isClosable: true,
                    })
                    return;
                }
            }
        } catch (error) {
            //console.log(error)
        }
        toast({
            description: DEFAULT_AUTH_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }


    const processForm = async (e) => {
        e.preventDefault();
        await login();
    }

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex display={{ base: 'none', md: 'flex' }} flex={{ base: 1, '2xl': 1 }} bgImage={sideImg} bgSize={"cover"}>
                <Stack p={8} as='button' onClick={() => navigate('/')}>
                    <Image src={logo} w={"200px"} />
                </Stack>
            </Flex>
            <Flex p={8} flex={{ base: 0.8, md: 1 }} pt={0} align={'center'} justify={'center'}>
                <Stack spacing={8}>
                    <Stack align={'start'} pb={2}>
                        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight={600}>Sign in</Text>
                        <Text fontSize={{ base: '16px', md: '17px' }} color={'gray.600'}>Let's get you into your SmerpGo account</Text>
                    </Stack>
                    <Stack spacing={5} w={{ base: 'xs', md: 'md' }} maxW={'md'} as='form' onSubmit={processForm}>
                        <FormControl isInvalid={emailIsError} isRequired>
                            <FormLabel>Email address</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <EmailIcon color='gray.300' />
                                </InputLeftElement>
                                <Input type='email' placeholder='name@email.com' _placeholder={{ fontSize: "sm" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </InputGroup>
                            {emailIsError && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <LockIcon color='gray.300' />
                                </InputLeftElement>
                                <Input placeholder='enter your password' _placeholder={{ fontSize: "sm" }} type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack pt={4}>
                            <Button disabled={isLoading}
                                isLoading={isLoading}
                                rounded={8}
                                py={6}
                                type="submit"
                                size="md"
                                bg={'#695ACD'}
                                color={'white'}
                                _hover={{
                                    bg: '#695ACDCC',
                                }}>
                                {btnText}
                            </Button>
                        </Stack>
                        <Stack pt={1} justify={'center'} spacing={1}>
                            <Button
                                onClick={() => navigate("/")}
                                leftIcon={<ArrowBackIcon />}
                                variant={"link"}
                                fontWeight={500}
                                size="md"
                                color={'#695ACD'}>
                                Back home
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Flex>
        </Stack>
    );
}