import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

const routes = [
    {
        name: "Privacy & Policy",
        hasArrow: true,
        link: route("privacy-and-policy"),
    },
];

export default function PrivacyAndPolicy() {
    return (
        <AppLayout>
            <Head title="Privacy & Policy" />
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
                        Privacy & Policy
                    </h1>
                    <BreadCumbsPublic routes={routes} />
                </div>
            </div>
            <div className="bg-white">
                <div className="bg-white container mx-auto px-4 md:px-0 py-16 w-full">
                    <h2 className="text-4xl md:text-5xl font-[800] md:text-center">
                        PRIVACY POLICY
                    </h2>
                    <div className="w-full gap-x-5">
                        <div className="w-full">
                            <div className="relative mt-4 text-justify">
                                {/* <div className="w-full md:w-1/2 flex justify-center mx-auto">
                                    <img
                                        src="/assets/images/privacy/privacy2.jpg"
                                        className="object-cover w-full h-[auto] rounded-xl mb-2"
                                        alt=""
                                    />
                                </div> */}
                                <div className="rounded-lg w-full">
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                        Aenean commodo ligula eget dolor. Aenean massa.
                                        Cum sociis natoque penatibus et magnis dis parturient montes,
                                        nascetur ridiculus mus. Donec quam felis,
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h2 className="text-gray-900 font-bold text-2xl">
                                        Lorem ipsum dolor sit amet
                                    </h2>
                                    <p className="font-[600] mb-2 group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                        Aenean commodo ligula eget dolor. Aenean massa.
                                        Cum sociis natoque penatibus et magnis dis parturient montes,
                                        nascetur ridiculus mus. Donec quam felis,
                                    </p>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Lorem
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                        Aenean commodo ligula eget dolor. Aenean massa.
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Demographic information
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        How We Use Your Information
                                    </span>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h2 className="text-gray-900 font-bold text-2xl">
                                        We use the collected information for the
                                        following purposes:
                                    </h2>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Process and fulfill orders
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Improve our products and services
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Respond to your inquiries and provide
                                        customer support
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Send promotional emails and updates
                                        about our products
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Analyze website usage and improve user
                                        experience
                                    </span>
                                    <span className="font-[600] block group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Data Security
                                    </span>
                                    <p className="font-[600] mt-2 mb-2 group-hover:underline text-gray-800 w-full text-md md:text-lg">
                                        We are committed to ensuring that your
                                        information is secure. We implement
                                        appropriate technical and organizational
                                        measures to safeguard your data from
                                        unauthorized access, disclosure,
                                        alteration, or destruction.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h2 className="text-gray-900 font-bold text-2xl">
                                        Sharing of Information
                                    </h2>
                                    <p className="font-[600] mb-2 group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        We may share your personal information
                                        with third parties in the following
                                        circumstances:
                                    </p>
                                    <p className="font-[600] mb-2 group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Service providers that assist us with
                                        order processing, payment processing,
                                        and website operations
                                    </p>
                                    <p className="font-[600] mb-2 group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Legal authorities when required by law
                                        or to protect our rights, privacy,
                                        safety, or property Business partners
                                        for joint marketing efforts (only with
                                        your consent) Cookies and Tracking
                                        Technologies
                                    </p>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        Our website may use cookies and similar
                                        technologies to enhance the user
                                        experience and analyze website traffic.
                                        You can control the use of cookies
                                        through your browser settings.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h2 className="text-gray-900 font-bold text-2xl">
                                        Your Rights
                                    </h2>
                                    <p className="font-[600] mb-2 group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        You have the right to:
                                    </p>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg">
                                        Access and request a copy of your
                                        personal information
                                    </p>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg">
                                        Correct or update your personal
                                        information
                                    </p>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg">
                                        Withdraw your consent for certain data
                                        processing activities
                                    </p>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg">
                                        Request deletion of your personal
                                        information, subject to legal
                                        requirements
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h2 className="text-gray-900 font-bold text-2xl">
                                        Changes to This Privacy Policy
                                    </h2>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg">
                                        We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any updates will be posted on this page.
                                    </p>
                                </div>
                                <div className="my-5 rounded-lg w-full">
                                    <h2 className="text-gray-900 font-bold text-2xl">
                                        Contact Us
                                    </h2>
                                    <p className="font-[600] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-0">
                                        If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at (www.delifilna.com).
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
