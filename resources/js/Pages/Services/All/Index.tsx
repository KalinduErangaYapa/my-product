import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Head, Link, usePage } from "@inertiajs/react";

const routes = [
    {
        name: "Our Services",
        hasArrow: true,
        link: route("services.filter"),
    },
];

export default function Service({ services }: any) {
    console.log(services);
    return (
        <>
            <AppLayout>
                <Head>
                    <title>Service</title>
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
                            src="/assets/images/about-us/about.jpg"
                            alt=""
                        />
                        <div
                            className="absolute inset-0 bg-gray-900/70 mix-blend-multiply"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="relative mx-auto container px-6 py-12 sm:py-28 lg:px-0">
                        <h1 className="text-4xl mb-2 font-bold tracking-tight text-white sm:text-5xl lg:text-6xl ">
                            Our Services
                        </h1>
                        <BreadCumbsPublic routes={routes} />
                    </div>
                </div>
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4 md:px-0 grid md:grid-cols-4 gap-6">
                        {services.map((service: any, index: number) => (
                            <div
                                className="bg-gray-50 p-4  top-0 rounded-lg"
                                key={index}
                            >
                                <img
                                    src={service.main_image?.url}
                                    className="aspect-[16/9] w-full rounded-xl bg-gray-100 object-cover sm:aspect-[3/2] lg:aspect-[4/3]"
                                    alt={service.title}
                                />
                                <div className="px-4 py-2">
                                    <h5 className="font-[800] text-lg text-center">
                                        {service.name}
                                    </h5>
                                    <p>{service.introduction}</p>
                                    <div className="flex">
                                        <Link
                                            href={route(
                                                "services.filter.show",
                                                service.slug
                                            )}
                                            className="text-primary text-sm flex space-x-2 ml-auto"
                                        >
                                            <span className="self-center">
                                                Read More
                                            </span>
                                            <ArrowRightIcon className="w-4 h-4 self-center" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
