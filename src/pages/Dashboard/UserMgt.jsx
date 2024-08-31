import { useEffect, useState } from "react";
import Table from "../../components/Table"
import { userFields } from "../../models/data"
import { Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getActiveUsers, getInactiveUsers } from "../../models/api_endpoints";

const toTitleCase = (txt) => {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase()
}

export const UserMgt = () => {
    const [userData, setUserData] = useState([]);
    const [isActiveUsersLoading, setIsActiveUsersLoading] = useState(false);
    const [isInactiveUsersLoading, setIsInactiveUsersLoading] = useState(false);

    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, [])

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
                        return data.data;
                    }
                    else {
                        return [];
                    }
                }
                else {
                    setIsActiveUsersLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return [];
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get active user data.`,
                                position: "top",
                                status: 'error',
                                duration: 8000,
                                isClosable: true,
                            })
                            return [];
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
                    return [];
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
        return [];
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
                        return data.data;
                    }
                    else {
                        return [];
                    }
                }
                else {
                    setIsInactiveUsersLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (responseCode === 401) {
                            navigate("/signin");
                            return [];
                        }

                        if (data[0].error === '""') {
                            toast({
                                description: `Unable to get inactive user data.`,
                                position: "top",
                                status: 'error',
                                duration: 8000,
                                isClosable: true,
                            })
                            return [];
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
                    return [];
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
        return [];
    }

    const getUsers = async () => {
        let activeUsers = await getActiveUserData();
        let inactiveUsers = await getInactiveUserData();

        if (activeUsers.length > 0) {
            activeUsers = activeUsers.map(v => ({ ...v, fullName: `${toTitleCase(v.firstName)} ${toTitleCase(v.lastName)}`, status: "Active" }))
        }

        if (inactiveUsers.length > 0) {
            inactiveUsers = inactiveUsers.map(v => ({ ...v, fullName: `${toTitleCase(v.firstName)} ${toTitleCase(v.lastName)}`, status: "Inactive" }))
        }

        const users = activeUsers.concat(inactiveUsers);
        setUserData(users);
    }

    return (
        <>
            <Box display={{ base: "none", md: "flex" }}>
                <Table data={userData} columns={userFields} enableTopToolbar={true} isLoading={isActiveUsersLoading || isInactiveUsersLoading} initSortFields={[{ id: 'createdOn', desc: true }]} pgSize={10} fileName="Users" density="compact" enableRowsPerPage={true} noDataText="No data found" />
            </Box>

            <Box display={{ md: "none" }}>
                <Table data={userData} columns={userFields} enableTopToolbar={true} isLoading={isActiveUsersLoading || isInactiveUsersLoading} initSortFields={[{ id: 'createdOn', desc: true }]} pgSize={10} fileName="Users" density="compact" enableRowsPerPage={true} enableColumnResizing={true} noDataText="No data found" />
            </Box>
        </>
    )
}