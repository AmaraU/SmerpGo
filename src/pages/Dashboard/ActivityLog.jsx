import { useEffect, useState } from "react";
import Table from "../../components/Table"
import { userActivityFields } from "../../models/data"
import {
    Stack, Text, useToast, Button, Box, FormControl, FormLabel, Input, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { IoCalendarOutline } from "react-icons/io5";
import { getAuditLogFilter } from "../../models/api_endpoints";

dayjs.extend(utc)
dayjs.extend(timezone)

export const ActivityLog = () => {
    const date = dayjs(new Date()).tz("Africa/Lagos");
    const [activityLog, setActivityLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(date.format("YYYY-MM") + "-01");
    const [endDate, setEndDate] = useState(date.format("YYYY-MM") + "-" + date.daysInMonth());
    const { onOpen, onClose, isOpen } = useDisclosure()

    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        getActivityData();
    }, [])

    const getActivityData = async () => {
        try {
            setIsLoading(true);

            const params = {
                startDate,
                endDate,
                token: sessionStorage.getItem('tk')
            }

            const response = await getAuditLogFilter(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsLoading(false);
                    if (data.isSuccess) {
                        let d = data.data;
                        d = d.map(v => ({ ...v, activity: rephraseActivity(v) }))
                        setActivityLog(d);
                        return;
                    }
                    else {
                        setActivityLog([]);
                        return;
                    }
                }
                else {
                    setIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get activity log.`,
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
                    toast({
                        description: `Unable to get activity log${err ? " [Details: " + err + "]" : "."} `,
                        position: "top",
                        status: 'error',
                        duration: 8000,
                        isClosable: true,
                    })
                    return;
                }
            }
        } catch (error) {
            if (error.toString().includes("undefined")) {
                navigate('/signin');
            }
        }
        toast({
            description: `Unable to get activity log.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    const rephraseActivity = (log) => {
        if (log.type.toLowerCase() === "new" || log.type.toLowerCase() === "modify") {
            const prefix = log.type.toLowerCase() === "new" ? "New" : "Modified";
            const suffix = log.type.toLowerCase() === "new" ? "created" : "information";
            switch (log.moduleName) {
                case "Account":
                    return `${prefix} account ${suffix}`;
                case "Sales":
                    return `${prefix} sales ${suffix}`
                case "Authentication":
                    return log.type.toLowerCase() === "new" ? `${prefix} account ${suffix}` : `${prefix} authentication ${suffix}`
                case "Product":
                    return `${prefix} product ${suffix}`
                default:
                    return "";
            }
        }
        else {
            if (log.type.toLowerCase() === "delete") {
                switch (log.moduleName) {
                    case "Account":
                        return `Account deleted`;
                    default:
                        return "";
                }
            }
        }
        return log.currentData.replaceAll('"', "");
    }

    const processFilter = async () => {
        await getActivityData();
        onClose();
    }

    return (
        <>
            <Stack spacing={3}>
                <Stack direction={"row"} justify={"space-between"} alignItems={"center"} position="relative" zIndex="dropdown">
                    <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>User Activity</Text>
                    <Popover
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    >
                        <PopoverTrigger>
                            <Button size={"sm"} leftIcon={<IoCalendarOutline />} bg={"#695ACD"} _hover={{ bg: "#695ACDDD" }} color={"white"} fontWeight={400}>
                                Date Filter
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader fontSize={"sm"} fontWeight={600}>Filter by date range</PopoverHeader>
                            <PopoverBody>
                                <Stack spacing={3}>
                                    <FormControl pt={2}>
                                        <FormLabel fontSize={"xs"}>
                                            Start date
                                        </FormLabel>
                                        <Input rounded={6} value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start date" type="date" size={"sm"}></Input>
                                    </FormControl>
                                    <FormControl pt={2}>
                                        <FormLabel fontSize={"xs"}>
                                            End date
                                        </FormLabel>
                                        <Input rounded={6} value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End date" type="date" size={"sm"}></Input>
                                    </FormControl>
                                </Stack>
                                <Button isDisabled={startDate > endDate} onClick={processFilter} mt={5} mb={2} w={"100%"} size={"sm"} bg={"#695ACD"} _hover={{ bg: "#695ACDDD" }} color={"white"} fontWeight={400}>
                                    Apply
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Stack>

                <Box display={{ base: "none", md: "flex" }}>
                    <Table data={activityLog} columns={userActivityFields} enableTopToolbar={true} isLoading={isLoading} initSortFields={[{ id: 'actionOn', desc: true }]} pgSize={5} fileName="UserActivity" />
                </Box>

                <Box display={{ md: "none" }}>
                    <Table data={activityLog} columns={userActivityFields} enableTopToolbar={true} isLoading={isLoading} initSortFields={[{ id: 'actionOn', desc: true }]} pgSize={5} fileName="UserActivity" enableColumnResizing={true} />
                </Box>
            </Stack>
        </>
    )
}