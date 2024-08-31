import React from 'react';
import NavBar from '../components/NavBar';
import { Products } from '../components/Products';
import { Footer } from '../components/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Spinner } from '@chakra-ui/spinner';
import { Center, Box, Stack, Text, HStack } from '@chakra-ui/layout';
import { Avatar, Select, useToast } from '@chakra-ui/react';
import BottomHero from '../components/BottomHero';
import { getAllProducts, getCollectionProducts, getStoreCollections, getStoreList } from '../models/api_endpoints';

export const Store = () => {
    const [isLoadingCat, setIsLoadingCat] = useState(false);
    const [isLoadingProd, setIsLoadingProd] = useState(false);
    const [isLoadingColl, setIsLoadingColl] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsAll, setProductsAll] = useState([]);
    const [storeInfo, setStoreInfo] = useState();
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [collections, setCollections] = useState([]);
    const [cartItemsCount, setCartsItemCount] = useState(0);
    const [isLoadingStores, setIsLoadingStores] = useState(false);
    const [resetSearchTxt, setResetSearchTxt] = useState(false);
    const [stores, setStores] = useState([]);
    const { storeId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const getCollections = async () => {
        try {
            setIsLoadingColl(true);

            const unclassified = {
                collectionId: -1,
                merchantCode: storeId,
                name: "All",
                description: "All products",
                avatar: null,
                items: 0,
                collectionUrl: null
            }

            const params = {
                merchantCode: storeId
            }

            const response = await getStoreCollections(params); //axios.post(getAPIEndpoint('store-collections'), params);
            if (response) {
                const { status, data } = response; //response.data;
                if (status === "success") {
                    setIsLoadingColl(false);
                    if (data.isSuccess) {
                        let d = data.data;
                        d = [unclassified, ...d];
                        const idx1 = d[0].collectionId;
                        setCollections(d.map(v => ({ ...v, isSelected: v.collectionId === idx1 ? true : false })));
                        //await getProducts(data.data[0]);
                        await getProductsUnclassified();
                        return;
                    }
                    else {
                        setCollections([{ ...unclassified, isSelected: true }]);
                        await getProductsUnclassified();
                        return;
                    }
                }
                else {
                    setIsLoadingColl(false);
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
                    //LOG ERROR

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

        setIsLoadingColl(false);
    }

    const getProducts = async (col) => {
        try {
            setIsLoadingProd(true);

            const params = {
                merchantCode: storeId,
                collectionId: col.collectionId
            }

            const response = await getCollectionProducts(params); //axios.post(getAPIEndpoint('collection-products'), params);
            if (response) {
                const { status, data } = response; //response.data;
                if (status === "success") {
                    setIsLoadingProd(false);
                    if (data.isSuccess) {
                        const d = data.data.products;
                        setProducts(d);
                        setProductsAll(d);

                        let categ = [...new Set(d.map(v => v.productCategory))];
                        categ = categ.map(v => ({ id: categ.indexOf(v) + 1, name: v, description: v, isSelected: false }));
                        categ.splice(0, 0, { id: 0, name: "All", description: "All", isSelected: true });
                        setCategories(categ);

                        return;
                    }
                    else {
                        setProducts([]);
                        setProductsAll([]);
                        setCategories([]);
                        return;
                    }
                }
                else {
                    setIsLoadingProd(false);
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
                    //LOG ERROR

                    return;
                }
            }
        } catch (error) {
            //console.log(error)
            navigate('/');
        }
        toast({
            description: `Unable to get products.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoadingProd(false);
    }

    const getProductsUnclassified = async () => {
        try {
            setIsLoadingProd(true);

            const params = {
                merchantCode: storeId
            }

            const response = await getAllProducts(params); //axios.post(getAPIEndpoint('products-all'), params);
            if (response) {
                const { status, data } = response; //response.data;
                if (status === "success") {
                    setIsLoadingProd(false);
                    if (data.isSuccess) {
                        const d = data.data.inStock;
                        setProducts(d);
                        setProductsAll(d);

                        let categ = [...new Set(d.map(v => v.productCategory))];
                        categ = categ.map(v => ({ id: categ.indexOf(v) + 1, name: v, description: v, isSelected: false }));
                        categ.splice(0, 0, { id: 0, name: "All", description: "All", isSelected: true });

                        setCategories(categ);

                        return;
                    }
                    else {
                        setProducts([]);
                        setProductsAll([]);
                        return;
                    }
                }
                else {
                    setIsLoadingProd(false);
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
                        description: `Unable to get all products${err ? " [Details: " + err + "]" : "."} `,
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
            description: `Unable to get all products.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoadingProd(false);
    }

    const getStores = async () => {
        try {
            setIsLoadingStores(true);
            const response = await getStoreList(); //axios.post(getAPIEndpoint('store-list'), null);
            if (response) {
                const { status, data } = response; //response.data;
                if (status === "success") {
                    setIsLoadingStores(false);
                    if (data.isSuccess) {
                        let d = data.data;
                        d = d.map(v => ({ ...v, businessName: v.storeName, id: v.storeLink.split("/").pop() }))
                        setStores(d);
                        setStoreInfo(d.filter(e => e.id === storeId)[0]);
                        return;
                    }
                    else {
                        setStores([]);
                        return;
                    }
                }
                else {
                    setIsLoadingStores(false);
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

        setIsLoadingStores(false);
    }

    useEffect(() => {
        if (storeId) {
            sessionStorage.setItem('merchantId', storeId);
        }
        else {
            navigate('/stores');
            return;
        }

        getStores();
        getCollections();
        getItemsCount();
    }, []);

    const handleSearch = (txt) => {
        setResetSearchTxt(false);

        const d = productsAll.filter(p => p.productName.toLowerCase().includes(txt.toLowerCase()));
        setProducts(d.length > 0 ? d : (txt ? [] : productsAll));
    }

    const addToCart = (id, item, amount, img, quantity, quantityInStock) => {
        let items = [];
        if (!sessionStorage.getItem('items')) {
            items.push({
                id,
                item,
                amount,
                img,
                quantity,
                quantityInStock
            });
            setCartsItemCount(items.length);
            sessionStorage.setItem('items', JSON.stringify(items));
        }
        else {
            items = JSON.parse(sessionStorage.getItem('items'));
            items.push({
                id,
                item,
                amount,
                img,
                quantity,
                quantityInStock
            });
            setCartsItemCount(items.length);
            sessionStorage.setItem('items', JSON.stringify(items));
        }
    }

    const updateCartQty = (id, qty) => {
        if (sessionStorage.getItem('items')) {
            const items = JSON.parse(sessionStorage.getItem('items'));
            const filter = items.filter(e => e.id === id);
            if (filter.length > 0) {
                const itemsNew = items.map(v => v.id === id ? ({ ...v, quantity: qty }) : ({ ...v }));
                sessionStorage.setItem('items', JSON.stringify(itemsNew));
            }
        }
    }

    const getItemsCount = () => {
        if (sessionStorage.getItem('items')) {
            const items = JSON.parse(sessionStorage.getItem('items'));
            setCartsItemCount(items.length);
        }
        else {
            setCartsItemCount(0);
        }
    }

    const handleCollection = async (d, isMobile = false) => {
        let d_ = d;
        if (isMobile) {
            d_ = JSON.parse(d);
        }

        setResetSearchTxt(true);

        setSelectedCollection(d_);
        setCollections(collections.map(c => (c.collectionId === d_.collectionId ? { ...c, isSelected: true } : { ...c, isSelected: false })));

        if (d_.collectionId === -1) {
            await getProductsUnclassified();
        }
        else {
            await getProducts(d_);
        }
    }

    return (
        <>
            <NavBar storeInfo={storeInfo} handleSearch={handleSearch} cartItems={cartItemsCount} resetSearchText={resetSearchTxt} />
            <Stack direction={{ base: "column", md: "row" }} spacing={"5%"} mx={{ base: 4, md: 10 }} pt={{ base: 3, md: 6 }} >
                <Stack spacing={6} display={{ base: "none", md: "flex" }}>
                    <HStack spacing={1}>
                        <Text fontSize={"sm"} fontWeight={600}>Collections</Text>
                        <Text fontSize={"sm"} fontWeight={600}>({collections.length})</Text>
                    </HStack>
                    {
                        isLoadingColl ? <Spinner color='#695ACD' /> :
                            <Stack spacing={2}>
                                {
                                    collections.map((v, k) =>
                                        <>
                                            {
                                                !v.isSelected &&
                                                <Box pl={0} pr={2} py={2} rounded={30} _hover={{ bg: "#F9F8FD" }}>
                                                    <HStack ml={2} key={k} cursor={"pointer"} onClick={() => handleCollection(v)}>
                                                        <Avatar size={"sm"} src={v.avatar} name={v.name} bg='gray.600' color={"white"} />
                                                        <Text fontWeight={500} color={"gray.600"} fontSize={"sm"}>{v.name}</Text>
                                                    </HStack>
                                                </Box>
                                            }
                                            {
                                                v.isSelected && <Box pl={0} pr={2} py={2} rounded={30} bg={"#F9F8FD"} borderWidth={1} borderColor={"#695ACD99"}>
                                                    <HStack ml={2} key={k} cursor={"pointer"} onClick={() => handleCollection(v)}>
                                                        <Avatar size={"sm"} src={v.avatar} name={v.name} bg='gray.600' color={"white"} />
                                                        <Text fontWeight={500} color={"gray.600"} fontSize={"sm"}>{v.name}</Text>
                                                    </HStack>
                                                </Box>
                                            }
                                        </>
                                    )
                                }
                            </Stack>
                    }
                </Stack>
                <Stack direction={"row"} spacing={6} display={{ md: "none" }} pb={5}>
                    <HStack spacing={4} justify={"space-between"}>
                        <HStack spacing={1}>
                            <Text fontSize={"sm"} fontWeight={600}>Collections</Text>
                            <Text fontSize={"sm"} fontWeight={600}>({collections.length})</Text>
                        </HStack>
                        <Stack w={"100%"}>
                            {
                                isLoadingColl ? <Spinner color='#695ACD' /> :
                                    <Select rounded={10} size={"sm"} spacing={2} onChange={(e) => handleCollection(e.target.value, true)}>
                                        {
                                            collections.map((v, k) => <option key={k} value={JSON.stringify(v)}>{v.name}</option>)
                                        }
                                    </Select>
                            }
                        </Stack>
                    </HStack>

                </Stack>
                <Stack w={"100%"}>
                    {
                        isLoadingCat || isLoadingProd ?
                            <Center><Spinner color='#695ACD' size={'xl'} /></Center> :
                            <Products collection={selectedCollection} categories={categories} products={products} addToCart={addToCart} updateCart={updateCartQty} />
                    }
                </Stack>
            </Stack>
            <Box bg={'#F0EDF9'} mt={20}>
                <BottomHero />
            </Box>
            <Box bg={"#1A202C"}>
                <Footer />
            </Box>
        </>
    );
}
