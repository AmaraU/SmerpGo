import React from 'react';
import { Flex, FormControl, FormLabel, Input, Stack, Text, Box, Image } from '@chakra-ui/react';
import imag from '../images/delete.png';


export const DeleteAccount = () => {
    return (
        <div>

        <Flex w={'60%'} maxW={'600px'} minW={'350px'} mt={'50px'} mb={'25px'} ml={'auto'} mr={'auto'} justifyContent={'space-between'} gap={'12px'} flexDir={{base: 'column', md: 'row'}}>
            <Box flex={'30%'}>
                <Image src={imag} width={{base: '50%', md: '100%'}} height={'auto'} />
            </Box>
            <Stack flex={'70%'}>
                <Text fontSize={'20px'} fontWeight={500} mb={'22px'}>Delete Account</Text>
                <Text fontSize={'14px'} color={'rgb(89, 103, 128)'} mb={'20px'}>Log in here to <b>delete your account.</b> Enter your User ID we will send you a confirmation code to delete your account.</Text>
                
                <form action="">
                    <FormControl isRequired mb={'25px'}>
                        <FormLabel fontSize={'16px'} fontWeight={500} mb={'5px'}>User ID:</FormLabel>
                        <Input type='text' placeholder='User ID' _placeholder={{ fontSize: "12px", color: '#CCCCCC' }} padding={'6px 12px'} fontSize={'12px'} color={'#CCCCCC'}  />
                    </FormControl>
                    <button style={{backgroundColor: 'rgb(124, 92, 252)', color: '#FFF', padding: '6px 10px', borderRadius: '6px'}} _hover={{backgroundColor: '#695ACE'}}>Next</button>
                </form>
            </Stack>
        </Flex>
        </div>
    );
}
