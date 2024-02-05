import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

const routes = [
    {
        name: "Terms & Conditions",
        hasArrow: true,
        link: route("terms-and-conditions"),
    },
];

export default function TearmsAndConditions() {
    return (
        <AppLayout>
            <Head title="Terms & Conditions" />
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
                        Terms & Conditions
                    </h1>
                    <BreadCumbsPublic routes={routes} />
                </div>
            </div>
            <div className="bg-white">
                <div className="bg-white container mx-auto px-4 md:px-0 py-16 w-full">
                    <h2 className="text-4xl md:text-5xl font-[800] md:text-center">
                        Our terms and conditions
                    </h2>
                    <div className="w-full gap-x-5">
                        <div className="w-full">
                            <div className="relative mt-4 text-justify">
                                {/* <div className="w-full md:w-1/2 flex justify-center mx-auto">
                                    <img
                                        src="/assets/images/terms/terms.jpg"
                                        className="object-cover w-full h-[auto] rounded-xl"
                                        alt=""
                                    />
                                </div> */}
                                <div className="rounded-lg w-full">
                                    <p className="text-gray-800 text-md md:text-lg font-[600] mb-2">
                                        Welcome to Delifina! These terms and
                                        conditions outline the rules and
                                        regulations for the use of our website.
                                    </p>
                                    <p className="text-gray-800 text-md md:text-lg font-[600] mb-5">
                                        By accessing this website, we assume you
                                        accept these terms and conditions. Do
                                        not continue to use Delifina if you do
                                        not agree to all the terms and
                                        conditions stated on this page.
                                    </p>
                                    <h3 className="text-gray-900 font-bold text-2xl mb-2">
                                        Use of Content
                                    </h3>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        The content provided on Delifina,
                                        including text, images, videos, and
                                        other materials, is for informational
                                        purposes only. You may use this content
                                        for personal, non-commercial use only.
                                        Reproduction, distribution,
                                        modification, or other unauthorized use
                                        of our content is prohibited.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        Product Information
                                    </h1>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        We strive to provide accurate and
                                        up-to-date information about our spices
                                        and products. However, we do not warrant
                                        the accuracy, completeness, or
                                        reliability of any product descriptions,
                                        pricing, availability, or other
                                        information provided on our website.
                                        Prices and availability are subject to
                                        change without notice.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        Ordering and Payment
                                    </h1>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        When placing an order through Delifina,
                                        you agree to provide accurate and
                                        complete information for processing and
                                        delivery. All orders are subject to
                                        acceptance and availability. We reserve
                                        the right to cancel or refuse any order
                                        at our discretion. Payment information
                                        is processed securely, and we do not
                                        store credit card details.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        Shipping and Returns
                                    </h1>
                                    <p className="mb-5 font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        Please review our Shipping and Returns
                                        Policy for information regarding
                                        shipping fees, delivery times, and our
                                        return and refund process.
                                    </p>
                                </div>
                                <div className="mt-5 rounded-lg w-full">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        Intellectual Property
                                    </h1>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        All content on Delifina , including but
                                        not limited to logos, trademarks,
                                        product names, and images, are the
                                        intellectual property of Delifina and
                                        its licensors. Unauthorized use of our
                                        intellectual property is prohibited.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        Third-Party Links
                                    </h1>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        Our website may contain links to
                                        third-party websites for your
                                        convenience. Delifina is not responsible
                                        for the content or practices of these
                                        third-party sites. Linking to these
                                        sites does not imply endorsement.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        Limitation of Liability
                                    </h1>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        To the maximum extent permitted by
                                        applicable law, Delifina and its
                                        affiliates shall not be liable for any
                                        direct, indirect, incidental,
                                        consequential, or special damages
                                        arising from your use of or inability to
                                        use our website or products.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h1 className="text-gray-900 font-bold text-2xl">
                                        Changes to Terms
                                    </h1>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        We reserve the right to modify, update,
                                        or replace these terms and conditions at
                                        any time without notice. It is your
                                        responsibility to review these terms
                                        periodically for changes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
