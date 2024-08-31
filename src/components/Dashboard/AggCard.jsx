import { Box, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { LuBarChart4 } from "react-icons/lu";
import { TbCurrencyNaira } from "react-icons/tb";

export const AggCard = ({ bgColor = "white", label = "", value = 0, hasDecimal = false, showCurrency = false, isLoading = false }) => {
    return (
        <>
            <Box bg={bgColor} px={4} py={3} rounded={15} borderWidth={0.5} borderColor={"#A89AFF"}>
                <Stack spacing={9}>
                    <HStack direction={"row"} justify={"space-between"}>
                        <Text fontSize={"sm"} color={"gray.600"}>{label}</Text>
                        <Box color={"gray.600"}>
                            <LuBarChart4 />
                        </Box>
                    </HStack>
                    <Stack>
                        {isLoading ? <Spinner /> :
                            <HStack spacing={0}>
                                {
                                    showCurrency &&
                                    <Box fontSize={{ base: 19, md: 22 }}>
                                        <TbCurrencyNaira />
                                    </Box>
                                }
                                <Text fontSize={{ base: "md", md: '18px' }} fontWeight={700}>{Intl.NumberFormat('en-us', {
                                    minimumFractionDigits: hasDecimal ? 2 : 0,
                                    maximumFractionDigits: hasDecimal ? 2 : 0,
                                }).format(value)}</Text>
                            </HStack>
                        }
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}
