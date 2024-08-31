import {
    Container,
    Stack,
    Text,
    Box,
    Button,
    Switch,
    HStack
} from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiVipCrownFill } from "react-icons/ri";
import { TbHeartHandshake } from "react-icons/tb";
import { useEffect, useState } from "react";

export default function PricingHero() {
    const [period, setPeriod] = useState("month");
    const [amount, setAmount] = useState(2000);
    const [yearChecked, setYearChecked] = useState(false);

    useEffect(() => {
        if (yearChecked) {
            setPeriod("year");
            setAmount(2000 * 12)
        }
        else {
            setPeriod("month");
            setAmount(2000)
        }
    }, [yearChecked])

    const freeItems = [
        "Free business website",
        "Online transaction charge (TBC)",
        "20 products listings",
        "10 AI Background for Photos with Watermark",
        "50 invoices & receipts",
        "Unlimited Discounts & Expenses",
        "50 sales record",
        "Business Analytics"
    ];

    const proItems = [
        "Free business website",
        "Online transaction charge (TBC)",
        "Unlimited products listings",
        "Unlimited AI Background for Photos",
        "Unlimited invoices & receipts",
        "Unlimited Discounts & Expenses",
        "Unlimited Sales record",
        "Business Analytics"
    ]

    return (
        <Container maxW={"3xl"} pt={16} id="pricing">
            <Stack>
                <Stack spacing={3.5} align={"center"}>
                    <Text fontWeight={500} textAlign={"center"} fontSize={"sm"} color={"#7C5CFC"} w={"100%"}>PRICING PLAN</Text>
                    <Text textAlign={"center"} fontSize={{ base: "26px", md: "32px" }} fontWeight={600} w={"100%"} color={"#040815"}>Smerp Go Plans</Text>
                    <Text textAlign={"center"} w={{ base: "90%", md: "80%" }} fontSize={{ base: "sm", md: "17px" }} color={"#596780"} lineHeight={1.4}>Upgrade to Smerp Go Pro and get the most out of our our game changing features.  Here's the best part - refer a friend, and you'll enjoy 3 months of Pro on us!</Text>
                    <HStack justify={"center"} w={"100%"}>
                        <Text fontSize={"16px"} fontWeight={500}>
                            Yearly
                        </Text>
                        <Switch isChecked={yearChecked} onChange={(e) => setYearChecked(e.target.checked)} colorScheme="purple" />
                    </HStack>
                </Stack>
                <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 7, md: 4 }} pt={6} pb={10}>
                    <Box w={"100%"} rounded={12} bg={"#F3F5F7"} px={6} py={5} spacing={3}>
                        <Stack spacing={3}>
                            <HStack>
                                <TbHeartHandshake size={"21px"} color="#7C5CFC" />
                                <Text textAlign={"start"} fontSize={"22px"} fontWeight={600} color={"#040815"}>Free</Text>
                            </HStack>
                            <Text textAlign={"start"} fontSize={"14px"} color={"#596780"}>Perfect plan to get started</Text>
                        </Stack>
                        <Stack pt={4} spacing={3}>
                            <Stack direction={"row"} alignItems={"center"} ml={-1}>
                                <HStack spacing={0}>
                                    <Box fontSize={{ base: 19, md: 30 }}>
                                        <TbCurrencyNaira />
                                    </Box>
                                    <Text fontSize={{ base: "md", md: '26px' }} fontWeight={700}>
                                        {Intl.NumberFormat('en-us', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(0)}
                                    </Text>
                                </HStack>
                                <Text fontSize={"md"}>/ {period}</Text>
                            </Stack>
                            <Stack spacing={4}>
                                <Text textAlign={"start"} fontSize={"13px"} color={"#1A202C"}>A free plan grants you access to some our cool features.</Text>
                                <Stack spacing={3}>
                                    {
                                        freeItems.map((v, k) =>
                                            <HStack key={k} spacing={3}>
                                                <Box fontSize={"15px"} color={"green.400"}>
                                                    <BsCheckCircleFill />
                                                </Box>
                                                <Text fontSize={"sm"} fontWeight={500}>{v}</Text>
                                            </HStack>
                                        )
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack pt={6}>
                            <Button rounded={26} fontSize={"sm"} variant={"outline"} color={"#7C5CFC"} _hover={{ bg: "#7C5CFC11" }} borderColor={"#7C5CFC"}>Get Your Free Plan</Button>
                        </Stack>
                    </Box>
                    <Box w={"100%"} rounded={12} bg={"#EFEBFE"} px={6} pt={5} spacing={3} pb={7}>
                        <Stack spacing={3}>
                            <Stack direction={"row"} justify={"space-between"}>
                                <HStack>
                                    <RiVipCrownFill size={"21px"} color="#7C5CFC" />
                                    <Text textAlign={"start"} fontSize={"22px"} fontWeight={600} color={"#040815"}>Pro</Text>
                                </HStack>
                                <Button fontWeight={500} size={"xs"} rounded={26} bg={"#010101"} color={"white"}>Popular</Button>
                            </Stack>
                            <Text textAlign={"start"} fontSize={"14px"} color={"#596780"}>Perfect plan for professionals!</Text>
                        </Stack>
                        <Stack pt={4} spacing={3}>
                            <Stack direction={"row"} alignItems={"center"} ml={-1}>
                                <HStack spacing={0}>
                                    <Box fontSize={{ base: 19, md: 30 }}>
                                        <TbCurrencyNaira />
                                    </Box>
                                    <Text fontSize={{ base: "md", md: '26px' }} fontWeight={700}>
                                        {Intl.NumberFormat('en-us', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(amount)}
                                    </Text>
                                </HStack>
                                <Text fontSize={"md"}>/ {period}</Text>
                            </Stack>
                            <Stack spacing={4}>
                                <Text textAlign={"start"} fontSize={"13px"} color={"#1A202C"}>For professional only! Start arranging your expenses with our best templates.</Text>
                                <Stack spacing={3}>
                                    {
                                        proItems.map((v, k) =>
                                            <HStack key={k} spacing={3}>
                                                <Box fontSize={"15px"} color={"green.400"}>
                                                    <BsCheckCircleFill />
                                                </Box>
                                                <Text fontSize={"sm"} fontWeight={500}>{v}</Text>
                                            </HStack>
                                        )
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack pt={{ base: 6, md: "44px" }}>
                            <Button rounded={26} fontSize={"sm"} bg={"#7C5CFC"} color={"white"} _hover={{ bg: "#7C5CFCCF" }}>Get Started</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}