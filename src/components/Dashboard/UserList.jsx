import { Box, Text, Stack, InputGroup, InputLeftElement, Input, Divider, Checkbox } from "@chakra-ui/react";
import { PiUser } from "react-icons/pi";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { useEffect } from "react";

export const UserList = ({ alphaList = [], allUsers = [], onSelected, onRemoved, initSelectionIds = [] }) => {
    const [users, setUsers] = useState([]);
    const [usersTmp, setUsersTmp] = useState([]);

    useEffect(() => {
        const d = allUsers.map(v => ({ ...v, selected: initSelectionIds.includes(v.id) ? true : false }));
        setUsers(d);
        setUsersTmp(d);
    }, [allUsers, initSelectionIds])

    const handleSearch = (e) => {
        if (usersTmp.length > 0) {
            setUsers(usersTmp.filter(c => `${c.fullName} ${c.businessName.trim()}`.toLowerCase().includes(e.target.value.toLowerCase())));
        }
    }

    const handleSelection = (v, isSelected) => {
        if (isSelected) {
            setUsers(users.map(e => e.id === v.id ? { ...e, selected: true } : e));
            setUsersTmp(usersTmp.map(e => e.id === v.id ? { ...e, selected: true } : e));
            onSelected(v);
        }
        else {
            setUsers(users.map(e => e.id === v.id ? { ...e, selected: false } : e));
            setUsersTmp(usersTmp.map(e => e.id === v.id ? { ...e, selected: false } : e));
            onRemoved(v);
        }
    }

    const UserFeature = () => {
        return (
            alphaList.map((v, k) =>
                <Stack key={k}>
                    {
                        users.filter(e => e.alpha === v).length > 0 ?
                            <Box pt={4}>
                                <Text pb={2} fontSize={"sm"} color={"gray.500"} fontWeight={600}>{v}</Text>
                                {
                                    users.filter(e => e.alpha === v).map((v, k) =>
                                        <Stack pb={2} direction={"row"} alignItems={"center"} justify={"space-between"} spacing={3}>
                                            <Checkbox isRequired={false} isChecked={v.selected} onChange={(e) => handleSelection(v, e.target.checked)} colorScheme='blue'></Checkbox>
                                            <Stack direction={"row"} justify={"space-between"} w={"100%"}>
                                                <Text fontSize={'13px'}>
                                                    {v.fullName} ({v.businessName.trim()})
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    )
                                }
                            </Box>
                            : <></>
                    }
                </Stack>
            )
        );
    }

    return (
        <>
            <Box ml={"-16px"} mr={"-16px"} pb={0} pt={0}>
                <Divider />
            </Box>
            <InputGroup alignItems={"center"}>
                <InputLeftElement pointerEvents={"none"}>
                    <Search2Icon fontSize={"sm"} ml={"-20px"} color={"blackAlpha.600"} />
                </InputLeftElement>
                <Input isRequired={false} onChange={e => handleSearch(e)} ml={"-14px"} fontSize={"sm"} borderWidth={0} focusBorderColor="white" placeholder="Search" _placeholder={{ fontSize: "sm" }} />
            </InputGroup>
            <Box ml={"-16px"} mr={"-16px"} pt={0}>
                <Divider />
            </Box>
            <div style={{ overflow: 'auto', maxHeight: '32vh' }}>
                {
                    users.length > 0 || allUsers.length > 0
                        ?
                        <UserFeature />
                        :
                        <Stack pt={6} spacing={2}>
                            <Box alignSelf={"center"}>
                                <PiUser size={"30px"} color="#5F57FFBB" />
                            </Box>
                            <Stack align={"center"}>
                                <Text fontWeight={400} fontSize={"sm"} color={"gray"}>
                                    No users available.
                                </Text>
                            </Stack>
                        </Stack>
                }
            </div>
        </>
    );
}