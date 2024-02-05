import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

const routes = [
    {
        name: "About Us",
        hasArrow: true,
        link: route("about-us"),
    },
];

export default function AboutUs() {
    return (
        <>
            <AppLayout>
                <Head>
                    <title>About Us</title>
                    <meta
                        name="description"
                        content="Learn about Brothers Tech"
                        data-react-helmet="true"
                    />

                    <meta
                        property="og:title"
                        content="About Us"
                        data-react-helmet="true"
                    />

                    <meta
                        property="og:type"
                        content="website"
                        data-react-helmet="true"
                    />

                    <meta
                        property="og:image"
                        content="/assets/images/meta.png"
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
                </Head>
                <div className="relative bg-gray-200">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover"
                            src="/assets/images/page-walls/1.png"
                            alt="About page banner"
                        />
                        <div
                            className="absolute inset-0 bg-gray-900/70 mix-blend-multiply"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="relative mx-auto container px-6 py-12 sm:py-28 lg:px-0">
                        <h1 className="text-4xl mb-2 font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            About Us
                        </h1>
                        <BreadCumbsPublic routes={routes} />
                    </div>
                </div>
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4 md:px-0">
                        <h5 className="mb-8 text-justify">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim. Donec
                            pede justo, fringilla vel, aliquet nec, vulputate
                            eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                            venenatis vitae, justo.Nullam dictum felis eu pede
                            mollis pretium. Integer tincidunt. Cras dapibus.
                        </h5>
                        <h2 className="text-4xl md:text-3xl font-[800] md:text-left">
                            Our Vision
                        </h2>
                        <div className="md:flex mt-4 md:space-x-8">
                            <div className="w-full md:w-2/5">
                                <img
                                    src="/assets/images/about-us/v1.jpg"
                                    className="object-cover w-full h-[auto] rounded-xl"
                                    alt=""
                                />
                            </div>
                            <div className="w-full md:w-3/5 text-justify">
                                <h6 className="font-[800] text-gray-700 text-2xl leading-[1.1] mt-2 md:mt-0">
                                    Lorem ipsum dolor sit amet, consectetuer
                                    adipiscing elit. Aenean commodo ligula
                                </h6>
                                <p className="mt-4">
                                    Lorem ipsum dolor sit amet, consectetuer
                                    adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque
                                    penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis,
                                    ultricies nec, pellentesque eu, pretium
                                    quis, sem. Nulla consequat massa quis enim.
                                    Donec pede justo, fringilla vel, aliquet
                                    nec, vulputate eget, arcu. In enim justo,
                                    rhoncus ut, imperdiet a, venenatis vitae,
                                    justo. Nullam dictum felis eu pede mollis
                                    pretium. Integer tincidunt. Cras dapibus.
                                    Vivamus elementum semper nisi. Aenean
                                    vulputate eleifend tellus. Aenean leo
                                    ligula, porttitor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4 md:px-0 text-justify">
                        <h2 className="text-4xl md:text-4xl font-[800] md:text-left">
                            Our Mission
                        </h2>
                        <h6 className="font-[800] text-gray-700 text-xl md:text-2xl leading-[1.1] mt-2 md:mt-0">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                        </h6>
                        <div className="md:flex mt-4 md:space-x-8">
                            <div className="w-full md:w-3/5">
                                <p className="">
                                    Lorem ipsum dolor sit amet, consectetuer
                                    adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque
                                    penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis,
                                    ultricies nec, pellentesque eu, pretium
                                    quis, sem. Nulla consequat massa quis enim.
                                    Donec pede justo, fringilla vel, aliquet
                                    nec, vulputate eget, arcu. In enim justo,
                                    rhoncus ut, imperdiet a, venenatis vitae,
                                    justo. Nullam dictum felis eu pede mollis
                                    pretium. Integer tincidunt. Cras dapibus.
                                    Vivamus elementum semper nisi. Aenean
                                    vulputate eleifend tellus. Aenean leo
                                    ligula, porttitor eu, consequat vitae,
                                    eleifend ac, enim. Aliquam lorem ante,
                                    dapibus in, viverra quis, feugiat a, tellus.
                                </p>
                            </div>
                            <div className="md:w-2/5">
                                <img
                                    src="/assets/images/about-us/m1.jpeg"
                                    className="object-cover w-full h-[auto] rounded-xl mt-4 md:mt-0"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Inquiry />
            </AppLayout>
        </>
    );
}
