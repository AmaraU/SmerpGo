import { Footer } from '../components/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/spinner';
import { Center, Box } from '@chakra-ui/layout';
import NavBarStorelist from '../components/NavBarStorelist';
import { HeroStores } from '../components/HeroStores';
import { Stores } from '../components/Stores';
import { useToast } from '@chakra-ui/react';
import BottomHero from '../components/BottomHero';
import { getStoreList } from '../models/api_endpoints';

export const StoreList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [storesAll, setStoresAll] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    const getStores = async () => {
        try {
            setIsLoading(true);
            const response = await getStoreList();
            if (response) {
                const { status, data } = response;
                if (status === "success") {
                    setIsLoading(false);
                    if (data.isSuccess) {
                        setStores(data.data);
                        setStoresAll(data.data);
                        return;
                    }
                    else {
                        setStores([]);
                        setStoresAll([]);
                    }
                }
                else {
                    setIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (data[0].error === '""') {
                            navigate("/");
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
                        description: `Unable to get stores${err ? " [Details: " + err + "]" : "."} `,
                        position: "top",
                        status: 'error',
                        duration: 8000,
                        isClosable: true,
                    })
                    return;
                }
            }
        } catch (error) {
            //console.log(error)
            navigate('/');
        }
        toast({
            description: `Unable to get stores.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    useEffect(() => {
        getStores();
    }, []);

    const handleSearch = (txt) => {
        const d = storesAll.filter(s => s.storeName.toLowerCase().includes(txt.toLowerCase()));
        setStores(d.length > 0 ? d : (txt ? [] : storesAll));
    }

    return (
        <>
            <NavBarStorelist handleSearch={handleSearch} />
            <HeroStores />
            {
                isLoading ?
                    <Center><Spinner color='#695ACD' size={'xl'} /></Center> :
                    <Stores stores={stores} />
            }
            <Box bg={'#F0EDF9'} mt={20}>
                <BottomHero />
            </Box>
            <Box bg={"#1A202C"}>
                <Footer />
            </Box>
        </>
    );
}
