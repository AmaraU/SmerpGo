import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack,
    Text,
    IconButton,
    Box,
    HStack,
    FormControl,
    Input,
    Textarea,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useToast,
    Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { UserList } from './UserList';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { sendNotificationAllUsers, sendNotificationToSpecificUsers } from '../../models/api_endpoints';

dayjs.extend(utc)
dayjs.extend(timezone)

export const SendNotification = ({ isOpen, onClose, userData = [], refresh }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bgColorAllUsersBtn, setBgColorAllUsersBtn] = useState("#695ACD");
    const [bgHoverColorAllUsersBtn, setBgHoverColorAllUsersBtn] = useState("#695ACDDD");
    const [foreColorAllUsersBtn, setForeColorAllUsersBtn] = useState("white");
    const [bgColorSelectedUsersBtn, setBgColorSelectedUsersBtn] = useState("gray.100");
    const [foreColorSelectedUsersBtn, setForeColorSelectedUsersBtn] = useState("gray");
    const [bgHoverColorSelectedUsersBtn, setBgHoverColorSelectedUsersBtn] = useState("gray.200");
    const [allUsersBtnIsActive, setAllUsersBtnIsActive] = useState(true);
    const [selectedUsersBtnIsActive, setSelectedUsersBtnIsActive] = useState(false);
    const [usersAdded, setUsersAdded] = useState([]);
    const [usersRemoved, setUsersRemoved] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [type, setType] = useState();

    const navigate = useNavigate();
    const toast = useToast();
    const alphaList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const closeModal = () => {
        reset();
        onClose();
    }

    const handleAllUsersClicked = () => {
        if (!allUsersBtnIsActive) {
            toggleAllUsersBtnState(true);
            toggleSelectedUsersBtnState(false);
        }
    }

    const handleSelectedUsersClicked = () => {
        if (!selectedUsersBtnIsActive) {
            toggleAllUsersBtnState(false);
            toggleSelectedUsersBtnState(true);
        }
    }

    const toggleAllUsersBtnState = (state) => {
        if (state) {
            setBgColorAllUsersBtn("#695ACD");
            setBgHoverColorAllUsersBtn("#695ACDDD");
            setForeColorAllUsersBtn("white");
        }
        else {
            setBgColorAllUsersBtn("gray.100");
            setBgHoverColorAllUsersBtn("gray.200");
            setForeColorAllUsersBtn("gray");
        }
        setAllUsersBtnIsActive(state);
    }

    const toggleSelectedUsersBtnState = (state) => {
        if (state) {
            setBgColorSelectedUsersBtn("#695ACD");
            setBgHoverColorSelectedUsersBtn("#695ACDDD");
            setForeColorSelectedUsersBtn("white");
        }
        else {
            setBgColorSelectedUsersBtn("gray.100");
            setBgHoverColorSelectedUsersBtn("gray.200");
            setForeColorSelectedUsersBtn("gray");
        }
        setSelectedUsersBtnIsActive(state);
    }

    const onUserSelected = (v) => {
        setSelectedUsers([...selectedUsers, v]);
        setUsersAdded([...usersAdded, v]);
        setUsersRemoved(usersRemoved.filter(e => e.id !== v.id));
    }

    const onUserRemoved = (v) => {
        setSelectedUsers(selectedUsers.filter(e => e.id !== v.id));
        setUsersRemoved([...usersRemoved, v]);
        setUsersAdded(usersAdded.filter(e => e.id !== v.id));
    }

    const reset = () => {
        setTitle("");
        setContent("");
        setType(null);
        setSelectedUsers([]);
        setUsersRemoved([]);
        setUsersAdded([]);
        toggleAllUsersBtnState(true);
        toggleSelectedUsersBtnState(false);
    }

    const sendToAllUsers = async () => {
        try {
            setIsLoading(true);

            const params = {
                payload: {
                    actionBy: sessionStorage.getItem('userid'),
                    actionOn: dayjs(new Date()).tz("Africa/Lagos").toISOString(),
                    title,
                    body: content,
                    type: parseInt(type)
                },
                token: sessionStorage.getItem('tk')
            }

            const response = await sendNotificationAllUsers(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsLoading(false);
                    if (data.isSuccess) {
                        toast({
                            description: `Push notification is being sent. Please check the table for actual status.`,
                            position: "top",
                            status: 'success',
                            duration: 4000,
                            isClosable: true,
                        })
                        refresh();
                        closeModal();

                        return;
                    }
                    else {
                        toast({
                            description: `Push notification not sent. Please try again or contact support.`,
                            position: "top",
                            status: 'error',
                            duration: 4000,
                            isClosable: true,
                        })
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
                                description: `Unable to send push notification.`,
                                position: "top",
                                status: 'error',
                                duration: 4000,
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
                        description: `Unable to send push notification${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to send push notification.`,
            position: "top",
            status: 'error',
            duration: 4000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    const sendToSelectedUsers = async () => {
        try {
            setIsLoading(true);

            const params = {
                payload: {
                    actionBy: sessionStorage.getItem('userid'),
                    actionOn: dayjs(new Date()).tz("Africa/Lagos").toISOString(),
                    userId: selectedUsers.map(v => v.id),
                    title,
                    body: content,
                    type: parseInt(type)
                },
                token: sessionStorage.getItem('tk')
            }

            const response = await sendNotificationToSpecificUsers(params);
            if (response) {
                const { status, responseCode, data } = response;
                if (status === "success") {
                    setIsLoading(false);
                    if (data.isSuccess) {
                        toast({
                            description: `Push notification is being sent. Please check the table for actual status.`,
                            position: "top",
                            status: 'success',
                            duration: 4000,
                            isClosable: true,
                        })
                        refresh();
                        closeModal();

                        return;
                    }
                    else {
                        toast({
                            description: `Push notification not sent. Please try again or contact support.`,
                            position: "top",
                            status: 'error',
                            duration: 4000,
                            isClosable: true,
                        })
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
                                description: `Unable to send push notification.`,
                                position: "top",
                                status: 'error',
                                duration: 4000,
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
                        description: `Unable to send push notification${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to send push notification.`,
            position: "top",
            status: 'error',
            duration: 4000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    const processForm = async (e) => {
        e.preventDefault();

        if (allUsersBtnIsActive) {
            await sendToAllUsers();
        }
        else if (selectedUsersBtnIsActive) {
            await sendToSelectedUsers();
        }
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={closeModal}
                size={'sm'}
            >
                <DrawerOverlay />
                <form onSubmit={processForm}>
                    <DrawerContent bg={"white"}>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <div style={{ overflow: 'auto', maxHeight: '100vh' }}>
                                <Stack align={"center"} pt={5} spacing={3}>
                                    <IconButton icon={<IoIosNotificationsOutline color='#695ACD' />} fontSize={'2xl'} isRound={true} bg='#D7D4FF' />
                                    <Text fontSize={{ base: "md", md: "lg" }} fontWeight={500}>Send Push Notification</Text>
                                    <Stack direction={"row"} spacing={0} pt={3}>
                                        <Button onClick={handleAllUsersClicked} bg={bgColorAllUsersBtn} color={foreColorAllUsersBtn} _hover={{ bg: bgHoverColorAllUsersBtn }} roundedTopLeft={8} roundedBottomLeft={8} size={"sm"} fontSize={"sm"} rounded={0} w={"130px"}>
                                            All Users
                                        </Button>
                                        <Button onClick={handleSelectedUsersClicked} bg={bgColorSelectedUsersBtn} color={foreColorSelectedUsersBtn} _hover={{ bg: bgHoverColorSelectedUsersBtn }} roundedTopRight={8} roundedBottomRight={8} size={"sm"} fontSize={"sm"} rounded={0} w={"130px"}>
                                            Selected Users
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Stack spacing={5} pt={8}>
                                    {
                                        selectedUsersBtnIsActive && <FormControl isRequired>
                                            <Box borderWidth={0} rounded={2}>
                                                <Stack>
                                                    <Accordion allowToggle w={"100%"} borderWidth={1} rounded={5}>
                                                        <AccordionItem border={"none"}>
                                                            <AccordionButton>
                                                                <Box fontSize={"sm"} as="span" flex='1' textAlign='left'>
                                                                    {selectedUsers.length === 0 ? "Choose User(s) *" : selectedUsers.length === 1 ? `${selectedUsers.length} user selected` : `${selectedUsers.length} users selected`}
                                                                </Box>
                                                                <AccordionIcon />
                                                            </AccordionButton>
                                                            <AccordionPanel pb={4}>
                                                                <UserList alphaList={alphaList} allUsers={userData} onSelected={onUserSelected} onRemoved={onUserRemoved} initSelectionIds={selectedUsers.length > 0 ? selectedUsers.map(e => e.id) : []} />
                                                            </AccordionPanel>
                                                        </AccordionItem>
                                                    </Accordion>
                                                </Stack>
                                            </Box>
                                        </FormControl>
                                    }

                                    <FormControl isRequired>
                                        <Select value={type} onChange={(e) => setType(e.target.value)} fontSize={"sm"} placeholder='Choose Type *'>
                                            <option value={0}>News</option>
                                            <option value={1}>Update</option>
                                            <option value={2}>Announcement</option>
                                            <option value={3}>Order</option>
                                            <option value={4}>Billing</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} fontSize={"sm"} placeholder='Notification Title *' />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} fontSize={"sm"} placeholder='Notification Content *' />
                                    </FormControl>
                                </Stack>
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <HStack>
                                <Button size={'sm'} rounded={8} variant={'outline'} onClick={closeModal}>Cancel</Button>
                                <Button type='submit' leftIcon={<FiSend />} isLoading={isLoading} isDisabled={(selectedUsersBtnIsActive ? selectedUsers.length === 0 : false) || isLoading} px={8} size={'sm'} rounded={8} bg={'#695ACD'} _hover={{ bg: '#695ACDDD' }} color={'white'}>Send</Button>
                            </HStack>
                        </DrawerFooter>
                    </DrawerContent>
                </form>
            </Drawer>
        </>

    );
}