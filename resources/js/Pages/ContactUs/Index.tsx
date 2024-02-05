import {
    PrimaryButton,
    PrimaryLink,
} from "@/Components/elements/buttons/PrimaryButton";
import { SecondaryButton } from "@/Components/elements/buttons/SecondaryButton";
import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import TextArea from "@/Components/elements/inputs/TextArea";
import TextInput from "@/Components/elements/inputs/TextInput";
import InquireNow from "@/Components/shared/InquireForm";
import AppLayout from "@/Layouts/AppLayout";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment, useState } from "react";

const routes = [
    {
        name: "About Us",
        hasArrow: true,
        link: route("about-us"),
    },
];

export default function ContactUs() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("contact-us.create"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpenSuccessModal(true);
            },
        });
    };

    function closeModal() {
        setOpenSuccessModal(false);
    }

    return (
        <AppLayout>
            <Head>
                <title>Contact Us</title>
                {/* <meta
                    name="description"
                    content="Connect with Delifina, the industry leader in food exports. Reach out for inquiries, collaborations, and partnerships. Excellence awaits."
                    data-react-helmet="true"
                /> */}

                <meta
                    property="og:title"
                    content="Contact Us"
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
                    content="Brothers Tech Logo"
                    data-react-helmet="true"
                />
            </Head>
            <div className="relative bg-gray-200 bg-[url('/assets/images/page-walls/3.png')] xl:bg-fixed bg-cover bg-no-repeat bg-top py-[120px] lg:px-0 -z-10">
                <div
                    className="absolute inset-0 bg-gray-900/50 mix-blend-multiply"
                    aria-hidden="true"
                />
            </div>
            {/* inquireNow */}
            <div
                className="relative isolate bg-slate-50 sm:pb-0"
                id="inquiry-form"
            >
                <div className="mx-auto container px-6  lg:px-0 pb-24">
                    <div className="grid gap-16 sm:gap-y-20 lg:flex w-full">
                        <form
                            onSubmit={submit}
                            className="lg:flex-auto lg:w-2/3 bg-slate-100 rounded-xl shadow-xl p-8 -mt-[120px]"
                        >
                            <h1 className=" text-slate-800 text-5xl font-[800] font-display">
                                Contact Us
                            </h1>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 mt-8">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Name"
                                        required
                                        className="!text-slate-800 pl-1"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 !text-slate-800 pl-1"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                        required
                                        className="!text-slate-800 pl-1"
                                    />

                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 !text-slate-800 pl-1"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <InputLabel
                                        htmlFor="message"
                                        value="Your Message"
                                        required
                                        className="!text-slate-800 pl-1"
                                    />

                                    <TextArea
                                        id="message"
                                        name="message"
                                        value={data.message}
                                        className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 !text-slate-800 pl-1"
                                        rows={4}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.message}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-10">
                                <PrimaryButton type="submit" className="">
                                    Submit Inquiry
                                </PrimaryButton>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-gray-500">
                                By submitting this form, I agree to the{" "}
                                <Link
                                    href="#"
                                    className="font-semibold text-primary-600"
                                >
                                    privacy&nbsp;policy
                                </Link>
                                .
                            </p>
                        </form>
                        <div className=" lg:w-1/3 lg:flex-none bg-slate-100 rounded-xl shadow-xl p-8 pt-10 md:-mt-[120px]">
                            <div>
                                <h6 className="text-slate-800 text-5xl font-[800] font-display text-center">
                                    Chat Via <br />
                                    Whatsapp.
                                </h6>
                                <p className="text-lg mt-6 font-semibold leading-[1.3] text-slate-700 text-center">
                                    Chat with us quickly <br /> without waiting
                                    for emails.
                                </p>
                            </div>
                            <div className="flex w-full mt-16">
                                <a
                                    href="https://wa.me/+94775499507"
                                    className="bg-green-600 mx-auto space-x-2 py-2 px-12 uppercase rounded-full justify-center flex text-white font-[400] text-lg mt-8 hover:bg-green-700 transition duration-300 ease-in-out"
                                >
                                    <img
                                        src="/assets/images/other/whatsapp.png"
                                        className="h-8 w-8 self-center"
                                    />
                                    <span className="self-center">
                                        Chat Now
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="w-full">
                        <iframe
                            width="100%"
                            height="400"
                            scrolling="no"
                            src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Shop%207A,%20Hatfield%20Square,%201115%20Burnett%20St,%20Hatfield,%20Pretoria,%200028,%20South%20Africa+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        >
                            <a href="https://www.maps.ie/population/">
                                Population calculator map
                            </a>
                        </iframe>
                    </div>
                </div>
                <InquirySuccessModel
                    open={openSuccessModal}
                    setOpen={setOpenSuccessModal}
                    closeModal={() => closeModal()}
                />
            </div>
        </AppLayout>
    );
}

export function InquirySuccessModel({
    open,
    setOpen,
    closeModal,
}: {
    open: boolean;
    setOpen: any;
    closeModal?: any;
}) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#101013] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-200">
                                        <CheckIcon
                                            className="h-12 w-12 text-primary"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-[800] leading-6 text-primary"
                                        >
                                            We received your contact details
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-lg text-gray-400">
                                                Hello there, we have received
                                                your inquiry and we will get
                                                back to you as soon as possible.
                                                Thank you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
                                    <SecondaryButton
                                        type="button"
                                        className="!bg-gray-800 !rounded-2xl"
                                        onClick={() => closeModal()}
                                    >
                                        Close
                                    </SecondaryButton>
                                    <PrimaryLink href={"/services"}>
                                        Check Our Services
                                    </PrimaryLink>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
