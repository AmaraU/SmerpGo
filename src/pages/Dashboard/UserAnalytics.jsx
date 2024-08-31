import { useEffect, useState } from "react";
import Table from "../../components/Table"
import { recentCustomersFields, recentMerchantsFields, recentOrderFields } from "../../models/data"
import { SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getTopCustomers, getTopMerchants, getTopOrders, getTopSales } from "../../models/api_endpoints";

export const UserAnalytics = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [recentMerchants, setRecentMerchants] = useState([]);
    const [recentCustomers, setRecentCustomers] = useState([]);
    const [recentOrdersIsLoading, setRecentOrdersIsLoading] = useState(false);
    const [recentSalesIsLoading, setRecentSalesIsLoading] = useState(false);
    const [recentMerchantsIsLoading, setRecentMerchantsIsLoading] = useState(false);
    const [recentCustomersIsLoading, setRecentCustomersIsLoading] = useState(false);

    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        getRecentOrders();
        getRecentSales();
        getRecentMerchants();
        getRecentCustomers();
    }, []);

    const getRecentOrders = async () => {
        try {
            setRecentOrdersIsLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getTopOrders(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setRecentOrdersIsLoading(false);
                    if (data.isSuccess) {
                        setRecentOrders(data.data);
                        return;
                    }
                    else {
                        setRecentOrders([]);
                        return;
                    }
                }
                else {
                    setRecentOrdersIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get recent orders.`,
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
                        description: `Unable to get recent orders${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get recent orders.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setRecentOrdersIsLoading(false);
    }

    const getRecentSales = async () => {
        try {
            setRecentSalesIsLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getTopSales(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setRecentSalesIsLoading(false);
                    if (data.isSuccess) {
                        setRecentSales(data.data);
                        return;
                    }
                    else {
                        setRecentSales([]);
                        return;
                    }
                }
                else {
                    setRecentSalesIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get recent sales.`,
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
                        description: `Unable to get recent sales${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get recent sales.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setRecentSalesIsLoading(false);
    }

    const getRecentMerchants = async () => {
        try {
            setRecentMerchantsIsLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getTopMerchants(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setRecentMerchantsIsLoading(false);
                    if (data.isSuccess) {
                        setRecentMerchants(data.data);
                        return;
                    }
                    else {
                        setRecentMerchants([]);
                        return;
                    }
                }
                else {
                    setRecentMerchantsIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get recent merchants.`,
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
                        description: `Unable to get recent merchants${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get recent merchants.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setRecentMerchantsIsLoading(false);
    }

    const getRecentCustomers = async () => {
        try {
            setRecentCustomersIsLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getTopCustomers(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setRecentCustomersIsLoading(false);
                    if (data.isSuccess) {
                        setRecentCustomers(data.data);
                        return;
                    }
                    else {
                        setRecentCustomers([]);
                        return;
                    }
                }
                else {
                    setRecentCustomersIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get recent customers.`,
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
                        description: `Unable to get recent customers${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get recent customers.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setRecentCustomersIsLoading(false);
    }

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={3}>
                    <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>Recent Sales</Text>
                    <Table data={recentOrders} columns={recentOrderFields} enableTopToolbar={true} isLoading={recentOrdersIsLoading} initSortFields={[{ id: 'salesAmount', desc: true }]} pgSize={5} fileName="RecentOrders" showHideColumns={{ "createdOn": false }} noDataText="No data found" />
                </Stack>

                <Stack spacing={3}>
                    <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>Recent Orders</Text>
                    <Table data={recentSales} columns={recentOrderFields} enableTopToolbar={true} isLoading={recentSalesIsLoading} initSortFields={[{ id: 'salesAmount', desc: true }]} pgSize={5} fileName="RecentSales" showHideColumns={{ "createdOn": false }} noDataText="No data found" />
                </Stack>

                <Stack spacing={3}>
                    <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>Recent Merchants</Text>
                    <Table data={recentMerchants} columns={recentMerchantsFields} enableTopToolbar={true} isLoading={recentMerchantsIsLoading} initSortFields={[{ id: 'createdOn', desc: true }]} pgSize={5} fileName="RecentMerchants" showHideColumns={{ "createdOn": false }} noDataText="No data found" />
                </Stack>

                <Stack spacing={3}>
                    <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>Recent Customers</Text>
                    <Table data={recentCustomers} columns={recentCustomersFields} enableTopToolbar={true} isLoading={recentCustomersIsLoading} initSortFields={[{ id: 'createdOn', desc: true }]} pgSize={5} fileName="RecentCustomers" showHideColumns={{ "createdOn": false }} noDataText="No data found" />
                </Stack>
            </SimpleGrid>
        </>
    )
}