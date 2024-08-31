import { Box, Select, Spinner, Stack, Text } from "@chakra-ui/react"
import { SimplePie } from "../Charts"

export const PieCard = ({ dataActive = [], dataInactive = [], isLoading = false }) => {
    const data = [
        { name: 'Active users', value: dataActive.length },
        { name: 'Inactive users', value: dataInactive.length },
    ];

    return (
        <>
            <Box h={"310px"} bg={"white"} px={4} py={3} rounded={15} borderWidth={1} borderColor={"#A89AFF"}>
                <Stack justify={"space-between"} direction={"row"} pb={3} alignItems={"center"}>
                    <Text fontSize={"sm"} color={"gray.600"}>Active vs Inactive Users</Text>
                    <Select size={"xs"} rounded={5} w={"30%"}>
                        <option value={"1"}>All</option>
                    </Select>
                </Stack>
                {
                    dataActive.length === 0 && dataInactive.length === 0 ? <Text fontSize={"sm"} pt={16} align={"center"} color={"gray.600"}>No data found.</Text> :
                        isLoading ? <Spinner /> : <SimplePie data={data} dataTooltipLabel="Test" dataCurrency={""} xHeight={70} title="Test" />
                }

            </Box>
        </>
    )
}