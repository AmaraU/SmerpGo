import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Image,
    Divider,
    Stack
} from "@chakra-ui/react"
import {
    FiMenu,
    FiBell,
    FiChevronDown
} from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";
import logo from '../images/logo.svg';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsActivity } from "react-icons/bs";
import { LuBarChart4 } from "react-icons/lu";


const SidebarContent = ({ onClose, linkItems = [], linkItems2 = [], selectionCallBack, ...rest }) => {
    const navigate = useNavigate();
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <div style={{ overflow: 'auto', maxHeight: '100vh' }}>
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Box alignSelf={'center'} as='button' onClick={() => navigate('/')}>
                        <Image src={logo} w={'100px'} />
                    </Box>
                    <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
                </Flex>
                {linkItems.map(link => (
                    <NavItem id={link.id} key={link.name} icon={link.icon} isActive={link.isActive} page={link.page} callbackFn={selectionCallBack}>
                        {link.name}
                    </NavItem>
                ))}
                <Box py={4}>
                    <Divider />
                </Box>
                {linkItems2.map(link => (
                    <NavItem id={link.id} key={link.name} icon={link.icon} isActive={link.isActive} page={link.page} callbackFn={selectionCallBack}>
                        {link.name}
                    </NavItem>
                ))}
            </div>
        </Box>
    )
}

const NavItem = ({ id, icon, isActive, page, callbackFn, children, ...rest }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        callbackFn(id);
        navigate(page);
    }
    return (
        <Box
            onClick={handleClick}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                px="4"
                py={"3"}
                mx="4"
                color={isActive ? "#1C6BFF" : 'black'}
                fontWeight={isActive ? 600 : 'normal'}
                //borderRadius="lg"
                fontSize={14}
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "#C2AFFF66",
                    //color: "white"
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        /* _groupHover={{
                            color: "white"
                        }} */
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

const MobileNav = ({ onOpen, name, title = [], activeMenu = {}, ...rest }) => {
    const navigate = useNavigate();
    const [header, setHeader] = useState("");

    useEffect(() => {
        if (title.length > 0) {
            setHeader(title[0].name);
        }
        else {
            setHeader("");
        }
    }, [title])

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 2.5, md: 4 }}
            height="65px"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "space-between" }}
            {...rest}
        >
            <Text display={{ base: "none", md: "flex" }} pl={1.5} align={"left"} fontSize={"xl"} fontWeight={600}>{header}</Text>
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Stack display={{ base: "block", md: "none" }} alignItems={'center'}>
                <Text fontSize={'19px'} fontWeight={600}>{header}</Text>
            </Stack>
            <HStack spacing={{ base: "0", md: "6" }}>
                <Box alignItems={"center"} zIndex={5}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    name={name}
                                    bg={"gray.700"}
                                    color={"white"}
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">{name}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {sessionStorage.getItem('email') ? sessionStorage.getItem('email') : ""}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                            fontSize={'sm'}
                        >
                            <MenuItem _hover={{ bg: "#5F57FF11" }} onClick={() => navigate("/signin")}>
                                <HStack pl={4} spacing={3}>
                                    <PiSignOut />
                                    <Text>Log out</Text>
                                </HStack>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
        </Flex>
    )
}

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState();
    const [linkItems1, setLinkItems] = useState([
        { id: 1, name: "Dashboard", icon: RxDashboard, isActive: true, page: '/dashboard' },
        { id: 2, name: "User Management", icon: HiOutlineUserGroup, isActive: false, page: '/dashboard/usermgt' },
        { id: 3, name: "Activity Log", icon: BsActivity, isActive: false, page: '/dashboard/activitylog' },
        { id: 4, name: "User Analytics", icon: LuBarChart4, isActive: false, page: '/dashboard/useranalytics' },
        { id: 5, name: "Notifications", icon: FiBell, isActive: false, page: '/dashboard/notifications' },
    ]);
    const [linkItems2, setLinkItems2] = useState([
        { id: 6, name: "Log out", icon: PiSignOut, isActive: false, page: '/signin' },
    ]);
    const [selectedMenu, setSelectedMenu] = useState(linkItems1[0]);

    useEffect(() => {
        if (!sessionStorage.getItem('email')) {
            navigate('/signin');
        }
        const data = location.state;
        setName(sessionStorage.getItem('fname') + ' ' + sessionStorage.getItem('lname'));

        if (selectedMenu.id === 1) {
            navigate(selectedMenu.page)
        }
    }, []);

    useEffect(() => {
        getSelectedMenu();
    }, [linkItems1, linkItems2]);

    const handleMenuSelection = (id) => {
        const linkItems_1 = linkItems1.map(v => v.id === id ? ({ ...v, isActive: true }) : ({ ...v, isActive: false }));
        const linkItems_2 = linkItems2.map(v => v.id === id ? ({ ...v, isActive: true }) : ({ ...v, isActive: false }));
        setLinkItems(linkItems_1);
        setLinkItems2(linkItems_2);
    }

    const getSelectedMenu = () => {
        let selected = linkItems1.filter(e => e.isActive === true);
        if (selected.length === 0) {
            selected = linkItems2.filter(e => e.isActive === true);
        }

        if (selected.length > 0) {
            setSelectedMenu(selected[0]);
        }
        else {
            setSelectedMenu(null);
        }
    }

    return (
        <Box minH="100vh" bg={"#F6F8FA"}>
            <SidebarContent
                onClose={() => onClose}
                linkItems={linkItems1.filter(e => e.id !== 14 && e.id !== 13)}
                linkItems2={linkItems2}
                selectionCallBack={handleMenuSelection}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
            >
                <DrawerContent>
                    <SidebarContent
                        onClose={onClose}
                        linkItems={linkItems1}
                        linkItems2={linkItems2}
                        selectionCallBack={handleMenuSelection}
                    />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} name={name} title={linkItems1.filter(e => e.isActive === true)} activeMenu={handleMenuSelection} />
            <Box ml={{ base: 0, md: 60 }} px={{ base: 3, md: 5 }} py={{ base: 5, md: 5 }}>
                <Outlet context={{ handleMenuSelection }} />
            </Box>
        </Box>
    )
}

export default Dashboard
