import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import AppLayout from "@/Layouts/AppLayout";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const routes = [
    {
        name: "FAQ",
        hasArrow: true,
        link: route("privacy-and-policy"),
    },
];

export default function FAQ(faqs: any) {
    const [currentOpen, setCurrentOpen] = useState<number>();
    function setCurrentOpenIndex(index: number) {
        if (currentOpen == index) {
            setCurrentOpen(undefined);
        } else {
            setCurrentOpen(index);
        }
    }
    return (
        <AppLayout>
            <Head title="FAQ" />
            <Head>
                <title>FAQ</title>
                <meta
                    name="description"
                    content="Get answers to common queries about Delifina's products and practices. Explore our FAQ section for valuable insights into our commitment to excellence."
                    data-react-helmet="true"
                />

                <meta
                    property="og:title"
                    content="FAQ"
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

                <meta
                    property="og:image:alt"
                    content="Delifina Logo"
                    data-react-helmet="true"
                />
            </Head>
            <div className="relative bg-gray-200 mt-[160px]">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full object-cover"
                        src="/assets/images/about-us/about.jpg"
                        alt=""
                    />
                    <div
                        className="absolute inset-0 bg-gray-900/40 mix-blend-multiply"
                        aria-hidden="true"
                    />
                </div>
                <div className="relative mx-auto container px-6 py-12 sm:py-28 lg:px-0">
                    <h1 className="text-4xl mb-2 font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Freequently Asked Questions
                    </h1>
                    <BreadCumbsPublic routes={routes} />
                </div>
            </div>
            <div className="bg-white">
                <div className="bg-white container mx-auto px-4 md:px-0 py-16 w-full">
                    <h2 className="text-4xl md:text-5xl font-[800] md:text-left">
                        Here is the answers for mostly asking questions by users
                    </h2>
                    <div className="w-full gap-x-5">
                        <div className="w-full">
                            <div className="relative mt-4">
                                <div className="rounded-lg w-full py-12">
                                    {faqs &&
                                        faqs?.faqs?.map((faq: any, index: any) => (
                                            <div
                                                key={index}
                                                className="mb-5"
                                            >
                                                <button
                                                    type="button"
                                                    className="text-gray-700 border border-gray-300 text-left rounded-lg text-lg w-full font-medium bg-none px-4 py-5 flex justify-between items-center"
                                                    onClick={() =>
                                                        setCurrentOpenIndex(
                                                            index
                                                        )
                                                    }
                                                >
                                                    {faq?.question}
                                                    {currentOpen == index ? (
                                                        <ArrowUpIcon className="h-5 w-5" />
                                                    ) : (
                                                        <ArrowDownIcon className="w-5 h-5" />
                                                    )}
                                                </button>
                                                <section
                                                    className={
                                                        (currentOpen == index
                                                            ? " block "
                                                            : " hidden ") +
                                                        " flex w-full rounded-md bg-gray-100 text-gray-700 p-8 duration-300 ease-in-out"
                                                    }
                                                >
                                                    {faq?.answer}
                                                </section>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
