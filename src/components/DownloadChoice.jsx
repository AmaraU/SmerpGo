import { Image, Stack, Box, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Center } from "@chakra-ui/react";
import { useRef } from "react";
import gplayImg from '../images/gplay_dark.png';
import appStoreImg from '../images/appstore_dark.png';
import { APP_STORE_URL, PLAY_STORE_URL } from "../config";


export default function DownloadChoice({ isOpen, onClose }) {
    const cancelRef = useRef();

    return (
        <>
            <AlertDialog
                motionPreset='slideInRight'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent rounded={17}>
                    <AlertDialogHeader pt={8} alignSelf={'center'}>Download SmerpGo</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Center>
                            <Stack pb={8} spacing={4} direction={'row'}>
                                <Box as='a' href={PLAY_STORE_URL} target="_blank">
                                    <Image src={gplayImg} w={{ base: '131px', md: '166px' }} />
                                </Box>
                                <Box as='a' href={APP_STORE_URL} target="_blank">
                                    <Image src={appStoreImg} w={{ base: '120px', md: '150px' }} />
                                </Box>
                            </Stack>
                        </Center>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}