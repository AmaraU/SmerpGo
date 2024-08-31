import { Stack, Text, useToast, SimpleGrid, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { AggCard } from "../../components/Dashboard/AggCard";
import { PieCard } from "../../components/Dashboard/PieCard";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getActiveUsers, getAllUsers, getDashboardOverview, getInactiveUsers } from "../../models/api_endpoints";

dayjs.extend(utc)
dayjs.extend(timezone)

export const Overview = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [userData, setUserData] = useState([]);
    const [newUserData, setNewUserData] = useState([]);
    const [activeUserData, setActiveUserData] = useState([]);
    const [inactiveUserData, setInactiveuserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [isActiveUsersLoading, setIsActiveUsersLoading] = useState(false);
    const [isInactiveUsersLoading, setIsInactiveUsersLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
        getActiveUserData();
        getInactiveUserData();
        getDashboardData();
    }, [])


    const getDashboardData = async () => {
        try {
            setIsLoading(true);
            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getDashboardOverview(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsLoading(false);
                    if (data.isSuccess) {
                        setDashboardData(data.data);
                        return;
                    }
                    else {
                        setDashboardData(null);
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
                                description: `Unable to get user data.`,
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
                        description: `Unable to get dashboard data${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get dashboard data.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    const getUserData = async () => {
        try {
            setIsUsersLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getAllUsers(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsUsersLoading(false);
                    if (data.isSuccess) {
                        const users = data.data;
                        const newUsers = users.filter(e => (new Date(e.createdOn)).getMonth() === dayjs(new Date()).tz("Africa/Lagos").month());
                        setUserData(users);
                        setNewUserData(newUsers);
                        return;
                    }
                    else {
                        setUserData([]);
                        setNewUserData([]);
                        return;
                    }
                }
                else {
                    setIsUsersLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get user data.`,
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
                        description: `Unable to get user data${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get user data.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsUsersLoading(false);
    }

    const getActiveUserData = async () => {
        try {
            setIsActiveUsersLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getActiveUsers(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsActiveUsersLoading(false);
                    if (data.isSuccess) {
                        setActiveUserData(data.data);
                        return;
                    }
                    else {
                        setActiveUserData([]);
                        return;
                    }
                }
                else {
                    setIsActiveUsersLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get active user data.`,
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
                        description: `Unable to get active user data${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get active user data.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsActiveUsersLoading(false);
    }

    const getInactiveUserData = async () => {
        try {
            setIsInactiveUsersLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getInactiveUsers(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsInactiveUsersLoading(false);
                    if (data.isSuccess) {
                        setInactiveuserData(data.data);
                        return;
                    }
                    else {
                        setInactiveuserData([]);
                        return;
                    }
                }
                else {
                    setIsInactiveUsersLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get inactive user data.`,
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
                        description: `Unable to get inactive user data${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get inactive user data.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsInactiveUsersLoading(false);
    }

    return (
        <>
            <Stack spacing={4} display={{ base: "none", md: "flex" }}>
                <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>Users</Text>
                <SimpleGrid templateColumns={"1fr 300px"} spacing={5}>
                    <Grid h={0} gridTemplateColumns={"1fr 1fr 1fr"} gap={5}>
                        <GridItem>
                            <AggCard isLoading={isUsersLoading} value={userData.length} label="Total users" />
                        </GridItem>
                        <GridItem>
                            <AggCard isLoading={isUsersLoading} value={newUserData.length} label="New users" />
                        </GridItem>
                        <GridItem>
                            <AggCard label="Active subscription" />
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Stack spacing={4} pt={4}>
                                <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>All User Sales</Text>
                                <Grid h={0} gridTemplateColumns={"1fr 1fr 1fr"} gap={5}>
                                    <GridItem>
                                        <AggCard value={dashboardData ? dashboardData.todaySale.amount : 0} isLoading={isLoading} label="Today's sales" bgColor="#F0EDF9" hasDecimal={true} showCurrency={true} />
                                    </GridItem>
                                    <GridItem>
                                        <AggCard value={dashboardData ? dashboardData.currentMonthSale.amount : 0} isLoading={isLoading} label="Month's sales" bgColor="#FFEBEE" hasDecimal={true} showCurrency={true} />
                                    </GridItem>
                                    <GridItem>
                                        <AggCard value={dashboardData ? dashboardData.merchant.overAllMerchant : 0} isLoading={isLoading} label="Number of merchants" bgColor="#E8F5E9" hasDecimal={false} showCurrency={false} />
                                    </GridItem>
                                </Grid>
                            </Stack>
                        </GridItem>
                    </Grid>
                    <Stack spacing={5}>
                        <PieCard dataActive={activeUserData} dataInactive={inactiveUserData} isLoading={isActiveUsersLoading || isInactiveUsersLoading} />
                    </Stack>
                </SimpleGrid>
            </Stack>

            <Stack spacing={4} display={{ md: "none" }}>
                <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.700"} align={"center"}>Users</Text>
                <SimpleGrid columns={2} spacing={5} pt={4}>
                    <AggCard isLoading={isUsersLoading} value={userData.length} label="Total users" />
                    <AggCard isLoading={isUsersLoading} value={newUserData.length} label="New users" />
                </SimpleGrid>
                <SimpleGrid columns={1} spacing={5} pt={5}>
                    <AggCard label="Active subscription" />
                    <PieCard dataActive={activeUserData} dataInactive={inactiveUserData} isLoading={isActiveUsersLoading || isInactiveUsersLoading} />
                </SimpleGrid>
            </Stack>

            <Stack spacing={4} pt={10} display={{ md: "none" }}>
                <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.700"} align={"center"}>All User Sales</Text>
                <SimpleGrid columns={1} spacing={5} pt={4}>
                    <AggCard value={dashboardData ? dashboardData.todaySale.amount : 0} isLoading={isLoading} label="Today's sales" bgColor="#F0EDF9" hasDecimal={true} showCurrency={true} />
                    <AggCard value={dashboardData ? dashboardData.currentMonthSale.amount : 0} isLoading={isLoading} label="Month's sales" bgColor="#FFEBEE" hasDecimal={true} showCurrency={true} />
                    <AggCard value={dashboardData ? dashboardData.merchant.overAllMerchant : 0} isLoading={isLoading} label="Number of merchants" bgColor="#E8F5E9" hasDecimal={false} showCurrency={false} />
                </SimpleGrid>
            </Stack>

            <Stack spacing={4} pt={10} pb={10}>
                <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.700"} align={{ base: "center", md: "start" }}>All User Orders</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    <AggCard value={dashboardData ? dashboardData.todayOrder.amount : 0} isLoading={isLoading} label="Today's orders" hasDecimal={true} showCurrency={true} />
                    <AggCard value={dashboardData ? dashboardData.currentMonthOrder.amount : 0} isLoading={isLoading} label="Month's orders" hasDecimal={true} showCurrency={true} />
                </SimpleGrid>
            </Stack>
        </>
    );
}