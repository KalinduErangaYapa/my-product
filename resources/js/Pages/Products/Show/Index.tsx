import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import YouMayAlsoLike from "./Particles/YouMayAlsoLike";
import InquireNow from "@/Components/shared/InquireForm";
import Reviews from "./Particles/Reviews";
import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import "react-quill/dist/quill.snow.css";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import Carousel from "react-multi-carousel";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 860 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
        breakpoint: { max: 860, min: 500 },
        items: 1,
        slidersToSlide: 1,
    },
    mobile: {
        // breakpoint: { max: 464, min: 0 },
        breakpoint: { max: 500, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.,
    },
};

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function ProductView({ product }: { product: any }) {
    const routes = [
        {
            name: "Our Services",
            hasArrow: true,
            link: route("services.filter"),
        },
        {
            name: product.name.substring(0, 30),
            hasArrow: true,
            link: "product",
        },
    ];
    const [activeSLide, setActiveSLide] = useState(0);
    const CustomDot = ({ onMove, index, onClick, active }: any) => {
        return (
            <ul className="px-1 h-[40px]">
                <li
                    className={
                        active
                            ? "active mb-4 lg:mb-24 border border-primary px-3"
                            : "inactive mb-4 lg:mb-24 border border-white px-2"
                    }
                    onClick={() => onClick()}
                ></li>
            </ul>
        );
    };

    const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
        const {
            carouselState: { currentSlide, totalItems, slidesToShow },
        } = rest;
        setActiveSLide(currentSlide);
        return <></>;
    };

    return (
        <AppLayout>
            <Head title={`${product.name} - Our Products`} />
            <Head>
                <title>{`${product.name} - Our Products`}</title>
                <meta
                    name="description"
                    content="Explore Delifina's exquisite range of food products, meticulously crafted for an unparalleled culinary experience worldwide."
                    data-react-helmet="true"
                />

                <meta
                    property="og:title"
                    content={`${product.name} - Our Products`}
                    data-react-helmet="true"
                />

                <meta
                    property="og:type"
                    content="website"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image"
                    content={product?.main_image}
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:type"
                    content="image/png"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:width"
                    content="1200"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:height"
                    content="630"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:alt"
                    content="Delifina Logo"
                    data-react-helmet="true"
                />
            </Head>
            <div className="relative pb-[50px] sm:pb-0 mt-[50px] sm:mt-[160px] h-[500px] sm:h-[250px] md:h-[350px]">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full object-cover"
                        // src={product?.main_image?.url ? product?.main_image?.url : ""}
                        src="/assets/images/products/about2.jpeg"
                        alt=""
                    />
                    <div
                        className="absolute inset-0 bg-gray-900/50 mix-blend-multiply"
                        aria-hidden="true"
                    />
                </div>
                <div className="mx-auto container flex justify-center sm:justify-start px-6 py-24 h-[100%] sm:py-32 lg:px-0 relative">
                    <div className="gap-x-6 flex absolute -bottom-[30px] md:-bottom-[90px]">
                        <div className="bg-none flex justify-center mx-auto rounded-xl shadow-cardTwo min-h-[200px]">
                            {/* <img
                                src={product?.main_image?.url ? product?.main_image?.url : ""}
                                className="w-[200px] flex justify-center md:w-[300px] h-z[300px] rounded-xl bg-white"
                                alt=""
                            /> */}
                            <div className="w-[200px] justify-center md:w-[300px] h-z[300px] rounded-xl bg-white">

                                {product?.images?.length > 0 && (
                                    <Carousel
                                        responsive={responsive}
                                        removeArrowOnDeviceType={[
                                            // "desktop",
                                            "mobile",
                                            // "small",
                                            // "xsmall",
                                        ]}
                                        customButtonGroup={<ButtonGroup />}
                                        // showDots={true}
                                        autoPlay={true}
                                        rewind={true}
                                        swipeable={true}
                                        draggable={true}
                                        ssr={true} // means to render carousel on server-side.
                                        autoPlaySpeed={3000}
                                        keyBoardControl={true}
                                        rewindWithAnimation={true}
                                        customDot={<CustomDot />}
                                        // customTransition="all 5"
                                        containerClass="carousel-container bg-transparent relative flex h-full"
                                        dotListClass="w-full"
                                        itemClass="w-full "
                                    >
                                        {product?.images?.map(
                                            (slider: any, index: any) => (
                                                <div className="self-center mx-auto grid lg:flex h-[100%]">
                                                    <img
                                                        src={slider?.url}
                                                        alt=""
                                                        className="w-[200px] flex justify-center md:w-[300px] h-z[300px] rounded-xl bg-white"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </Carousel>
                                )}
                            </div>

                        </div>
                        <div className="">
                            {" "}
                            <h6 className="text-white uppercase text-center sm:text-left">
                                {product.category?.name}
                            </h6>
                            <h1 className="text-3xl mb-2 font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-center sm:text-left">
                                {product.name.substring(0, 30)}
                                {product?.name?.length > 30 && "..."}
                            </h1>
                            <BreadCumbsPublic routes={routes} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="mx-auto container sm:px-6 py-10 md:py-32 lg:px-0">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        {/* Product */}
                        <div className="">
                            {/* Product info */}
                            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                <div className="mt-6">
                                    <div
                                        className="htmlData ql-editor"
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Inquiry */}
                <Inquiry product={product.id} type="quotation" />
            </div>
        </AppLayout>
    );
}
