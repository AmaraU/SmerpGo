import { useEffect, useState } from "react";
import Table from "../../components/Table"
import { notificationFields } from "../../models/data"
import {
    Stack, Text, useToast, Button, Box,
    useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getAllNotifications } from "../../models/api_endpoints";
import { FiSend } from "react-icons/fi";
import { SendNotification } from "../../components/Dashboard/SendNotification";
import { getActiveUsers } from '../../models/api_endpoints';

dayjs.extend(utc)
dayjs.extend(timezone)

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [users, setUsers] = useState([]);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('userid')) {
            navigate('/signin');
        }
        getUsers();
        getNotifications();
    }, [])

    const getUsers = async () => {
        try {
            setIsLoadingUsers(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getActiveUsers(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsLoadingUsers(false);
                    if (data.isSuccess) {
                        const d = data.data.map(v => ({ ...v, fullName: `${v.firstName.trim()} ${v.lastName.trim()}`, alpha: v.firstName.substring(0, 1).toUpperCase() }));
                        setUsers(d);
                        return;
                    }
                    else {
                        setUsers([]);
                        return;
                    }
                }
                else {
                    setIsLoadingUsers(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return;
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to fetch users.`,
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
                        description: `Unable to fetch users${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to fetch users.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoadingUsers(false);
    }

    const getNotifications = async () => {
        try {
            setIsLoading(true);

            const params = {
                token: sessionStorage.getItem('tk')
            }

            const response = await getAllNotifications(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsLoading(false);
                    if (data.isSuccess) {
                        setNotifications(data.data);
                        return;
                    }
                    else {
                        setNotifications([]);
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
                                description: `Unable to fetch push notifications.`,
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
                        description: `Unable to fetch push notifications${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to fetch push notifications.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    return (
        <>
            <Stack spacing={3}>
                <Stack direction={"row"} justify={"space-between"} alignItems={"center"}>
                    <Text fontWeight={500} fontSize={{ base: 'md', md: 'lg' }} color={"gray.600"}>Push Notifications</Text>
                    <Button size={"sm"} leftIcon={<FiSend />} bg={"#695ACD"} _hover={{ bg: "#695ACDDD" }} color={"white"} fontWeight={400} onClick={onOpen}>
                        Send Notification
                    </Button>
                </Stack>

                <Box display={{ base: "none", md: "flex" }}>
                    <Table data={notifications} columns={notificationFields} showHideColumns={{ id: false }} enableTopToolbar={true} isLoading={isLoading} pgSize={5} fileName="Notifications" noDataText="No push notifications found" initSortFields={[{ id: 'createdOn', desc: true }]} enableColumnResizing={false} />
                </Box>

                <Box display={{ md: "none" }}>
                    <Table data={notifications} columns={notificationFields} showHideColumns={{ id: false }} enableTopToolbar={true} isLoading={isLoading} pgSize={5} fileName="Notifications" noDataText="No push notifications found" initSortFields={[{ id: 'createdOn', desc: true }]} enableColumnResizing={true} />
                </Box>
            </Stack>
            <SendNotification isOpen={isOpen} onClose={onClose} refresh={getNotifications} userData={users} />
        </>
    )
}