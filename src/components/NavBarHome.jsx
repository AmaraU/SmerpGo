import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    HStack,
    Image,
    SimpleGrid
} from "@chakra-ui/react";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';
import { IoIosArrowDown } from "react-icons/io";
import { HashLink } from "react-router-hash-link";
import DownloadChoice from "./DownloadChoice";

export default function NavBarHome() {
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpenDownload, onOpen: onOpenDownload, onClose: onCloseDownload } = useDisclosure();

    return (
        <Box bg={"#FFFFFF"} id="home">
            <Flex
                minH={"60px"}
                py={{ base: 2, md: 3 }}
                pl={{ base: 2, md: 16 }}
                pr={{ base: 2, md: 12 }}
                align={"center"}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        bg={"#0B081C"}
                        _focus={{ bg: "#0B081C" }}
                        icon={
                            isOpen ? <CloseIcon color={"#FFFFFF"} w={3} h={3} /> : <HamburgerIcon color={"#FFFFFF"} w={5} h={5} />
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                    <Link to='/'>
                        <Text
                            textAlign={useBreakpointValue({ base: "center", md: "left" })}
                            fontFamily={"heading"}
                            pt={{ base: 0, md: 0 }}
                            color={useColorModeValue("gray.800", "white")}
                            ml={{ base: -10, md: 0 }}
                        >
                            <Image src={logo} w={{ base: '90%', md: '90%' }} />
                        </Text>
                    </Link>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 2 }}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={4}
                >
                    <Stack display={{ base: "none", md: "block" }} mr={2}>
                        <DesktopNav />
                    </Stack>
                    <Button
                        display={{ base: "none", md: "flex" }}
                        variant={"outline"}
                        rounded={20}
                        fontSize={{ base: "sm", md: "sm" }}
                        fontWeight={500}
                        borderColor={"linear-gradient(91deg, rgba(99.60, 76.29, 255, 0.85) 65%, rgba(99.60, 76.29, 255, 0.58) 100%, rgba(168, 154, 255, 0.98) 100%)"}
                        color={"rgba(99.60, 76.29, 255, 0.90)"}
                        _hover={{
                            bg: "rgba(99.60, 76.29, 255, 0.06)"
                        }}
                        px={{ base: 3, md: 6 }}
                        as={"a"}
                        href="/stores"
                        target="_blank"
                    >
                        Marketplace
                    </Button>
                    <Button

                        rounded={20}
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight={500}
                        bg={"linear-gradient(91deg, rgba(99.60, 76.29, 255, 0.85) 65%, rgba(99.60, 76.29, 255, 0.58) 100%, rgba(168, 154, 255, 0.98) 100%)"}
                        color={"#FFFFFF"}
                        _hover={{
                            bg: "linear-gradient(120deg, rgba(99.60, 76.29, 255, 0.85) 15%, rgba(99.60, 76.29, 255, 0.58) 100%, rgba(168, 154, 255, 0.98) 80%)"
                        }}
                        px={{ base: 3, md: 6 }}
                        onClick={onOpenDownload}
                    >
                        Download SmerpGo
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
            <DownloadChoice isOpen={isOpenDownload} onClose={onCloseDownload} />
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = "#343434";
    const linkHoverColor = '#7C5CFC';
    const popoverContentBgColor = "#2B2C35";

    return (
        <Stack direction={"row"} spacing={6}>
            {NAV_ITEMS.map(navItem => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <HashLink smooth to={navItem.href ?? "#"}>
                                <HStack spacing={1}>
                                    <Box
                                        py={2}
                                        pl={2}
                                        fontSize={"15px"}
                                        fontWeight={500}
                                        color={linkColor}
                                        _hover={{
                                            textDecoration: "none",
                                            color: linkHoverColor
                                        }}
                                    >
                                        {navItem.label}
                                    </Box>
                                    {navItem.children && <IoIosArrowDown color={linkColor} />}
                                </HStack>
                            </HashLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={6}
                                rounded={"xl"}
                                w={"600px"}
                            >
                                <Stack spacing={4}>
                                    <Link to={navItem.uri}><Text color={"#BFAEE7"} fontWeight={500} >{navItem.label}</Text></Link>
                                    <SimpleGrid columns={2} columnGap={8} rowGap={6}>
                                        {navItem.children.map(child => (
                                            <Stack direction={"row"} spacing={child.icon ? 3 : 0}>
                                                <Box pt={0.5} color={"#BFAEE7"}>
                                                    {child.icon}
                                                </Box>
                                                <HashLink smooth to={child.href}>
                                                    <Stack>
                                                        <Text color={"#FFFFFF"} fontSize={"sm"} fontWeight={600}>
                                                            {child.label}
                                                        </Text>
                                                        <Text color={"#FFFFFFCC"} fontSize={"xs"}>
                                                            {child.desc}
                                                        </Text>
                                                    </Stack>
                                                </HashLink>
                                            </Stack>
                                        ))}
                                    </SimpleGrid>
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box >
            ))}
        </Stack >
    )
}

const MobileNav = () => {
    return (
        <>
            <Stack
                bg={"#2B2C35"}
                p={4}
                display={{ md: "none" }}
            >
                {NAV_ITEMS.map(navItem => (
                    <MobileNavItem key={navItem.label} {...navItem} />
                ))}

                <Button
                    variant={"outline"}
                    mt={4}
                    rounded={20}
                    fontSize={{ base: "sm", md: "sm" }}
                    fontWeight={500}
                    borderColor={"linear-gradient(91deg, rgba(99.60, 76.29, 255, 0.85) 65%, rgba(99.60, 76.29, 255, 0.58) 100%, rgba(168, 154, 255, 0.98) 100%)"}
                    color={"rgba(99.60, 76.29, 255, 0.90)"}
                    _hover={{
                        bg: "rgba(99.60, 76.29, 255, 0.06)"
                    }}
                    px={{ base: 3, md: 6 }}
                    bg={"white"}
                    as={"a"}
                    href="/stores"
                    target="_blank"
                >
                    Marketplace
                </Button>
            </Stack>
        </>


    )
}

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none"
                }}
            >
                <HashLink smooth to={href ?? "#"}>
                    <Text
                        fontWeight={600}
                        color={"#FFFFFF"}
                        fontSize={"sm"}
                    >
                        {label}
                    </Text>
                </HashLink>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                        color={"#FFFFFF"}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
                <Stack
                    mt={-3}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map(child => (
                            <HashLink smooth to={child.href}>
                                <Box key={child.label} py={2}>
                                    <Text fontSize={"sm"} color={"#FFFFFFCC"}>{child.label}</Text>
                                </Box>
                            </HashLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

const NAV_ITEMS = [
    {
        label: "Features",
        href: "#features",
    },
    {
        label: "Community",
        href: "#community",
    },
    {
        label: "Pricing",
        href: "#pricing",
    },
]