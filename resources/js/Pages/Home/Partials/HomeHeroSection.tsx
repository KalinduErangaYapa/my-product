import { PrimaryLink } from "@/Components/elements/buttons/PrimaryButton";
import {
    ArrowLeftCircleIcon,
    ArrowLeftIcon,
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const HomeHeroSection = ({ heroData, heroProducts }: any) => {
    const [activeSLide, setActiveSLide] = useState(0);
    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType },
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button
                className="bg-white p-4 border text-black shadow-card z-50 absolute right-10 hover:bg-gray-200 duration-300 cursor-pointer"
                onClick={() => onClick()}
            >
                <ArrowLongRightIcon className="w-5 h-5" />
            </button>
        );
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType },
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button
                className="bg-white p-4 border text-black shadow-card z-50 absolute left-10 hover:bg-gray-200 duration-300 cursor-pointer"
                onClick={() => onClick()}
            >
                <ArrowLongLeftIcon className="w-5 h-5" />
            </button>
        );
    };
    return (
        <>
            <div id="heroSection">
                <div>
                    <div className="self-center">
                        {heroData?.length > 0 && (
                            <Carousel
                                responsive={responsive}
                                removeArrowOnDeviceType={[
                                    // "desktop",
                                    "mobile",
                                    "small",
                                    "xsmall",
                                ]}
                                // customButtonGroup={<ButtonGroup />}
                                showDots={false}
                                autoPlay={true}
                                // rewind={true}
                                infinite={true}
                                swipeable={true}
                                draggable={true}
                                ssr={true} // means to render carousel on server-side.
                                autoPlaySpeed={6000}
                                keyBoardControl={true}
                                rewindWithAnimation={false}
                                customRightArrow={<CustomRightArrow />}
                                customLeftArrow={<CustomLeftArrow />}
                                containerClass="carousel-container bg-transparent relative flex h-full !p-0"
                                dotListClass="w-full"
                                itemClass="w-full "
                            >
                                {heroData?.map((slider: any, index: any) => (
                                    <div className="flex relative h-[480px]">
                                        <img
                                            src={slider?.image_url}
                                            alt=""
                                            width={800}
                                            height={800}
                                            className="w-[100%] h-[100%] object-cover mx-auto absolute inset-0"
                                        />
                                        <div className="container self-center mx-auto grid lg:flex h-[100%] px-8  relative">
                                            <div className="order-2 lg:order-1 text-center lg:text-left xl:max-w-2xl self-center">
                                                <h1 className="text-4xl font-display xl:text-6xl font-[700] leading-[1.5] xl:leading-[1.2] tracking-tight text-[#3d3d3d]">
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: slider?.title,
                                                        }}
                                                    />
                                                </h1>
                                                <p className="text-base text-gray-700">
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: slider?.intro,
                                                        }}
                                                    />
                                                </p>
                                                <div className="mt-12 mb-2">
                                                    <Link
                                                        className="bg-gradient-to-br from-gray-500 to-gray-900 py-4 pl-8 pr-16 rounded-full text-white font-[700] relative"
                                                        href={slider?.link}
                                                    >
                                                        <span>Get a Quote</span>
                                                        <span className="bg-gradient-to-br from-red-500 to-red-900 p-6 absolute -right-4 -top-2 rounded-full">
                                                            <ArrowLongRightIcon className="w-5 h-5" />
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default HomeHeroSection;
