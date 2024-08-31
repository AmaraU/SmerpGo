import { Box, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { TbCurrencyNaira } from "react-icons/tb";

export const userFields = [
    {
        accessorKey: 'fullName',
        header: 'Full Name',
        size: 100,
        enableColumnActions: false
    },
    {
        accessorKey: 'businessName',
        header: 'Store Name',
        size: 100,
        enableColumnActions: false
    },
    {
        accessorKey: 'emailAddress',
        header: 'Email Address',
        size: 110,
        enableColumnActions: false
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone No',
        size: 100,
        enableColumnActions: false
    },
    {
        accessorFn: (row) => dayjs(new Date(row.lastLogin)),
        accessorKey: 'lastLogin',
        id: 'lastLogin',
        header: 'Last Login',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 100,
        enableColumnActions: false
    },
    {
        accessorFn: (row) => dayjs(new Date(row.createdOn)),
        accessorKey: 'createdOn',
        id: 'createdOn',
        header: 'Joined',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 100,
        enableColumnActions: false
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
        enableColumnActions: false,
        enableColumnFilters: false,
        Cell: ({ cell }) => (
            <Box w={"fit-content"} px={2} py={1} rounded={16} bg={cell.getValue() === "Active" ? "#E8F5E9" : "#FFEBEE"} borderWidth={0.5} borderColor={cell.getValue() === "Active" ? "#43A047" : "#E53935"}>
                {cell.getValue()}
            </Box>
        ),
    },
]

export const userActivityFields = [
    {
        accessorKey: 'actionBy',
        header: 'User',
        size: 120,
        enableColumnActions: false
    },
    {
        accessorKey: 'moduleName',
        header: 'Module',
        size: 120,
        enableColumnActions: false
    },
    {
        accessorFn: (row) => dayjs(new Date(row.actionOn)),
        accessorKey: 'actionOn',
        id: 'actionOn',
        header: 'Action timestamp',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 120,
        enableColumnActions: false
    },
    {
        accessorKey: 'activity',
        header: 'Activity',
        size: 150,
        enableColumnActions: false
    },
]

export const adminActivityFields = [
    {
        accessorKey: 'actionBy',
        header: 'Admin',
        size: 100,
        enableColumnActions: false
    },
    {
        accessorKey: 'moduleName',
        header: 'Module',
        size: 100,
        enableColumnActions: false
    },
    {
        accessorFn: (row) => dayjs(new Date(row.actionOn)),
        accessorKey: 'actionOn',
        id: 'actionOn',
        header: 'Action timestamp',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 100,
        enableColumnActions: false
    },
    {
        accessorKey: 'activity',
        header: 'Activity',
        size: 100,
        enableColumnActions: false
    },
]

export const recentOrderFields = [
    {
        accessorKey: 'salesAmount',
        header: 'Sales Amount',
        enableColumnActions: false,
        Cell: ({ cell }) => (
            <HStack spacing={0}>
                {
                    <Box mt={navigator.userAgent.includes('Safari') ? "-0.91px" : 0} fontSize={"14.35px"}>
                        <TbCurrencyNaira />
                    </Box>
                }
                <Text fontSize={"12px"}>{Intl.NumberFormat('en-us', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(cell.getValue())}</Text>
            </HStack>
        ),
    },
    {
        accessorKey: 'merchant',
        header: 'Store Name',
        enableColumnActions: false,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.createdOn)),
        accessorKey: 'createdOn',
        id: 'createdOn',
        header: 'Joined',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 60,
        enableColumnActions: false
    },
]

export const recentMerchantsFields = [
    {
        accessorKey: 'fullName',
        header: 'Merchant Name',
        size: 100,
        enableColumnActions: false,
    },
    {
        accessorKey: 'businessName',
        header: 'Store Name',
        size: 100,
        enableColumnActions: false,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.createdOn)),
        accessorKey: 'createdOn',
        id: 'createdOn',
        header: 'Joined',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 60,
        enableColumnActions: false
    },
]

export const recentCustomersFields = [
    {
        accessorKey: 'fullName',
        header: 'Customer Name',
        size: 100,
        enableColumnActions: false,
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 100,
        enableColumnActions: false,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.createdOn)),
        accessorKey: 'createdOn',
        id: 'createdOn',
        header: 'Joined',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 60,
        enableColumnActions: false
    },
]

export const notificationFields = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 100,
        enableColumnActions: false
    },
    {
        accessorKey: 'title',
        header: 'Title',
        size: 100,
        enableColumnActions: false
    },
    {
        accessorKey: 'body',
        header: 'Text',
        size: 200,
        enableColumnActions: false
    },
    {
        accessorKey: 'recipient',
        header: 'Recipients',
        size: 120,
        enableColumnActions: false
    },
    {
        accessorFn: (row) => dayjs(new Date(row.createdOn)),
        accessorKey: 'createdOn',
        id: 'createdOn',
        header: 'Timestamp',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 120,
        enableColumnActions: false
    },
    {
        accessorKey: 'row.isSent',
        header: 'Status',
        size: 100,
        enableColumnActions: false,
        enableColumnFilters: false,
        Cell: ({ cell }) => (
            <Box w={"fit-content"} px={2} py={1} rounded={16} bg={cell.getValue() ? "#E8F5E9" : "#FFEBEE"} borderWidth={0.5} borderColor={cell.getValue() ? "#43A047" : "#E53935"}>
                {cell.getValue() ? "Sent" : "Pending"}
            </Box>
        ),
    },
]

