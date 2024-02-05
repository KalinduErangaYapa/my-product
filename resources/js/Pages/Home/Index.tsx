import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import HomeHeroSection from "./Partials/HomeHeroSection";
import AboutUs from "./Partials/about-us";
import Brands from "./Partials/Brands";
import Inquiry from "../../Components/shared/Inquiry";
import DefaultServices from "./Partials/service-types";
import Devices from "./Partials/devices";
import WhyUs from "./Partials/WhyUs";
import OurQualities from "./Partials/OurQualities";
import Pricing from "./Partials/Pricing";
import Map from "./Partials/Map";
import BlogSection from "./Partials/BlogSection";
import WhyUsTwo from "./Partials/WhyUsTwo";
import WhyBrothersTech from "./Partials/WhyBrothersTech";
import Review from "./Partials/Review";

export default function Home({
    homeHero,
    heroProducts,
    blogs,
    featuredServices,
}: {
    homeHero: any;
    heroProducts: any;
    blogs: any;
    featuredServices: any;
}) {
    return (
        <AppLayout>
            <Head>
                <title>We fix your mobile</title>
            </Head>
            {/* Home Hero */}
            {homeHero && (
                <HomeHeroSection
                    heroData={homeHero}
                    heroProducts={heroProducts}
                />
            )}
            <Devices featuredServices={featuredServices} />
            {/* Why Us */}
            <WhyBrothersTech />
            {/* <WhyUs /> */}
            {/* Our Qualities */}
            <OurQualities />
            {/* WHy Us */}
            <WhyUsTwo />
            {/* Pricing */}
            <Pricing featuredServices={featuredServices} />
            {/* Brands */}
            <Brands />
            {/* Map */}
            <Map />
            {/* Blog */}
            <BlogSection blogs={blogs} />
            {/**Review */}
            <Review />
        </AppLayout>
    );
}
