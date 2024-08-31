import { Box } from "@chakra-ui/react";
import HeroHome from "../components/HeroHome";
import NavBarHome from "../components/NavBarHome";
import BottomHero from "../components/BottomHero";
import heroImg from '../images/herobg.png';
import gradientImg2 from '../images/gradient2.png';
import DreamHero from "../components/DreamHero";
import FeaturesHero from "../components/FeaturesHero";
import MarketplaceHero from "../components/MarketplaceHero";
import CommunityHero from "../components/CommunityHero";
import PricingHero from "../components/PricingHero";
import BlogHero from "../components/BlogHero";
import { FooterHome } from "../components/FooterHome";

export const Home = () => {
    return (
        <>
            <NavBarHome />
            <Box bgImage={heroImg} bgSize={"cover"} bgRepeat={"no-repeat"} bgPosition={"center"}>
                <HeroHome />
            </Box>
            <Box display={"none"} bg={"white"} pb={{ base: 10, md: 20 }}>
                <DreamHero />
            </Box>
            <Box bgImage={gradientImg2} bgSize={"cover"} bgRepeat={"no-repeat"} bgPosition={"bottom"}>
                <FeaturesHero />
            </Box>
            <Box bg={"white"} pb={20}>
                <MarketplaceHero />
            </Box>
            <Box bg={"linear-gradient(91deg, rgba(99.60, 76.29, 255, 0.75) 55%, rgba(99.60, 76.29, 255, 0.75) 55%, rgba(99.60, 76.29, 255, 0.28) 100%, rgba(168, 154, 255, 0.98) 100%)"}>
                <CommunityHero />
            </Box>
            <Box bg={"white"}>
                <PricingHero />
            </Box>
            <Box display={"none"} bg={"white"} pb={20}>
                <BlogHero />
            </Box>
            <Box bg={'#F0EDF9'}>
                <BottomHero />
            </Box>

            <Box bg={"#1A202C"}>
                <FooterHome />
            </Box>
        </>
    );
}