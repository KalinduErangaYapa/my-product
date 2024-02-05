import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    CheckIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    HomeIcon,
    InboxIcon,
    MagnifyingGlassCircleIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { PrimaryLink } from "../../elements/buttons/PrimaryButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import { SecondaryButton } from "../../elements/buttons/SecondaryButton";
import TextInput from "../../elements/inputs/TextInput";
import { router } from "@inertiajs/react";
import PhoneRepairs from "./PhoneRepairs";
import Prices from "./Prices";

const social = [
    {
        name: "Facebook",
        href: "https://web.facebook.com/delifinacompany",
        icon: (props: any) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/delifinafoods/",
        icon: (props: any) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/delifina",
        icon: (props: any) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                fill="currentColor"
                {...props}
            >
                <path
                    fill="transparent"
                    d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                ></path>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                    opacity=".05"
                ></path>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                    opacity=".07"
                ></path>
                <path
                    // fill="#fff"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                ></path>
            </svg>
        ),
    },
    {
        name: "Pinterest",
        href: "http://www.pinterest.com/delifinafoods",
        icon: (props: any) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                fill="currentColor"
                {...props}
            >
                <circle cx="24" cy="24" r="20" fill="transparent"></circle>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.4439087,11.4161377c-8.6323242,0-13.2153931,5.7946167-13.2153931,12.1030884	c0,2.9338379,1.5615234,6.5853882,4.0599976,7.7484131c0.378418,0.1762085,0.581543,0.1000366,0.668457-0.2669067	c0.0668945-0.2784424,0.4038086-1.6369019,0.5553589-2.2684326c0.0484619-0.2015381,0.0246582-0.3746338-0.1384277-0.5731201	c-0.8269653-1.0030518-1.4884644-2.8461304-1.4884644-4.5645752c0-4.4115601,3.3399658-8.6799927,9.0299683-8.6799927	c4.9130859,0,8.3530884,3.3484497,8.3530884,8.1369019c0,5.4099731-2.7322998,9.1584473-6.2869263,9.1584473	c-1.9630737,0-3.4330444-1.6238403-2.9615479-3.6153564c0.5654297-2.3769531,1.6569214-4.9415283,1.6569214-6.6584473	c0-1.5354004-0.8230591-2.8169556-2.5299683-2.8169556c-2.006958,0-3.6184692,2.0753784-3.6184692,4.8569336	c0,1.7700195,0.5984497,2.9684448,0.5984497,2.9684448s-1.9822998,8.3815308-2.3453979,9.9415283	c-0.4019775,1.72229-0.2453003,4.1416016-0.0713501,5.7233887l0,0c0.4511108,0.1768799,0.9024048,0.3537598,1.3687744,0.4981079l0,0	c0.8168945-1.3278198,2.0349731-3.5056763,2.4864502-5.2422485c0.2438354-0.9361572,1.2468872-4.7546387,1.2468872-4.7546387	c0.6515503,1.2438965,2.5561523,2.296936,4.5831299,2.296936c6.0314941,0,10.378418-5.546936,10.378418-12.4400024	C36.7738647,16.3591919,31.3823242,11.4161377,24.4439087,11.4161377z"
                ></path>
            </svg>
        ),
    },
];
const callsToAction = [
    {
        name: "All Products",
        href: route("services.filter"),
        icon: PlayCircleIcon,
    },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const [openSearchModal, setOpenSearchModal] = useState(false);
    function closeModal() {
        setOpenSearchModal(false);
    }
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url, props }: any = usePage();
    return (
        <header className="bg-slate-900 backdrop-blur-[3px] sticky top-0 left-0 right-0 w-full z-50">
            <nav
                className="mx-auto flex container items-center justify-between px-6 py-2 lg:px-0 lg:py-3"
                aria-label="Global"
            >
                <div className="flex xl:hidden order-1 xl:order-2">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden xl:flex xl:gap-x-12 order-4 xl:order-1">
                    <Link
                        href={route("home")}
                        className={` ${
                            url == "/" ? "text-white" : "text-slate-300"
                        } text-sm font-semibold leading-6 hover:text-slate-200 border p-2 rounded-sm`}
                    >
                        <HomeIcon className="w-5 h-5" />
                    </Link>
                    {/* Phone repairs */}
                    <PhoneRepairs />
                    {/* Prices */}
                    <Link
                        href={route("booking")}
                        className={` ${
                            url == "/booking" ? "text-white" : "text-slate-300"
                        } text-sm font-semibold leading-6 hover:text-white self-center`}
                    >
                        Manage Booking
                    </Link>
                    <Link
                        href={route("about-us")}
                        className={` ${
                            url == "/about-us" ? "text-white" : "text-slate-300"
                        } text-sm font-semibold leading-6 hover:text-white self-center`}
                    >
                        About Us
                    </Link>
                    <Link
                        href={route("blogs")}
                        className={` ${
                            url == "/blogs" ? "text-white" : "text-slate-300"
                        } text-sm font-semibold leading-6 hover:text-white self-center`}
                    >
                        Blog
                    </Link>
                    <Link
                        href={route("contact-us")}
                        className={` ${
                            url == "/contact-us"
                                ? "text-white"
                                : "text-slate-300"
                        } text-sm font-semibold leading-6 hover:text-white self-center`}
                    >
                        Contact Us
                    </Link>
                </Popover.Group>
                <div className="flex gap-x-2 xl:gap-x-6 order-4 xl:order-2">
                    {social.map((item: any, index: number) => (
                        <a
                            target="blank"
                            href={item.href}
                            className={`text-sm font-semibold border text-slate-300 border-gray-200 hover:bg-primary rounded-lg p-1 leading-6 hover:text-slate-200 self-center`}
                        >
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </nav>
            <Dialog
                as="div"
                className="xl:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm ">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href={route("home")}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-primary"
                                >
                                    Home
                                </Link>
                                <Link
                                    href={route("services.filter")}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-primary"
                                >
                                    Our Services
                                </Link>
                                <Link
                                    href={route("about-us")}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-primary"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href={route("blogs")}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-primary"
                                >
                                    Blog
                                </Link>
                                <Link
                                    href={route("contact-us")}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-primary"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
