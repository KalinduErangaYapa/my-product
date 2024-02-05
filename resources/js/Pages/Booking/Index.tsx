import {
    PrimaryButton,
    PrimaryLink,
} from "@/Components/elements/buttons/PrimaryButton";
import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment, useRef, useState } from "react";
import useStateRef from "react-usestateref";
import { router } from "@inertiajs/react";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import TextInput from "@/Components/elements/inputs/TextInput";
import InputError from "@/Components/elements/inputs/InputError";
import TextArea from "@/Components/elements/inputs/TextArea";
import Service from "../Services/All/Index";
import { SecondaryButton } from "@/Components/elements/buttons/SecondaryButton";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";

const routes = [
    {
        name: "Booking",
        hasArrow: true,
        link: route("booking"),
    },
];

export default function Booking({
    services,
    service,
    devices,
    device,
    prices,
    price,
    step,
}: any) {
    const [activeTab, setActiveTab, activeTabC] = useStateRef(step);
    const [activeService, setActiveServiceValue, ActiveServiceValueC] =
        useStateRef(service);
    const [serviceId, setServiceId] = useStateRef(null);

    const [activeDevice, setActiveDeviceValue, ActiveDeviceValueC] =
        useStateRef(device);

    const [activePrice, setActivePriceValue, ActivePriceValueC] =
        useStateRef(price);

    function setActiveService(value: any) {
        setActiveServiceValue(value);
        setUrl();
    }

    function setActiveDevice(value: any) {
        setActiveDeviceValue(value);
        setUrl();
    }

    function setActivePrice(value: any) {
        setActivePriceValue(value);
        setUrl();
    }

    function setActiveStep(step: any) {
        setActiveTab(step);
        setUrl();
    }

    function setUrl() {
        router.visit(route("booking"), {
            method: "get",
            data: {
                service: ActiveServiceValueC.current,
                device: ActiveDeviceValueC.current,
                step: activeTabC.current,
                price: ActivePriceValueC.current,
            },
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Booking</title>
                    <meta
                        name="description"
                        content="Learn about Brothers Tech"
                        data-react-helmet="true"
                    />

                    <meta
                        property="og:title"
                        content="Booking"
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
                    {/* <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover"
                            src="/assets/images/page-walls/1.png"
                            alt="About page banner"
                        />
                        <div
                            className="absolute inset-0 bg-gray-900/70 mix-blend-multiply"
                            aria-hidden="true"
                        />
                    </div> */}
                    <div className="relative mx-auto container px-6 py-12 sm:py-12 lg:px-0">
                        <h1 className="text-4xl mb-2 font-bold tracking-tight text-gray-700 sm:text-5xl lg:text-6xl">
                            Booking
                        </h1>
                        <span>
                            Book the service quickly here and get repaired your
                            device quickly and saftly .
                        </span>
                    </div>
                </div>
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4 lg:px-0">
                        {/* Booking */}
                        <div className="">
                            <div className="bg-gray-200 grid grid-cols-4 w-full h-4 rounded-xl ">
                                <div className="bg-primary rounded-l-xl" />
                                <div
                                    className={`${
                                        activeTabC.current > 1
                                            ? "bg-primary"
                                            : "border-r border-gray-300"
                                    }`}
                                />
                                <div
                                    className={`${
                                        activeTabC.current > 2
                                            ? "bg-primary"
                                            : "border-r border-gray-300"
                                    }`}
                                />
                                <div
                                    className={`${
                                        activeTabC.current > 3
                                            ? "bg-primary"
                                            : "border-r border-gray-300"
                                    } rounded-r-xl`}
                                />
                            </div>
                            <div className="grid grid-cols-4 text-center text-sm font-[600] text-gray-600 uppercase mt-2">
                                <div>
                                    <p>Services</p>
                                </div>
                                <div>
                                    <p>Devices</p>
                                </div>
                                <div>
                                    <p>Repair</p>
                                </div>
                                <div>
                                    <p>Finalize</p>
                                </div>
                            </div>
                        </div>
                        {/* content */}
                        <div className="mt-8">
                            {/* Services */}
                            <section
                                className={`${
                                    activeTabC.current != 1 && "hidden"
                                }`}
                            >
                                <Services
                                    services={services}
                                    setActiveTab={setActiveStep}
                                    activeService={ActiveServiceValueC.current}
                                    setActiveService={setActiveService}
                                    setServiceId={setServiceId}
                                />
                            </section>
                            {/*  */}
                            <section
                                className={`${
                                    activeTabC.current != 2 && "hidden"
                                }`}
                            >
                                <Devices
                                    setActiveTab={setActiveStep}
                                    devices={devices}
                                    activeDevice={ActiveDeviceValueC.current}
                                    setActiveDevice={setActiveDevice}
                                />
                            </section>
                            {/*  */}
                            <section
                                className={`${
                                    activeTabC.current != 3 && "hidden"
                                }`}
                            >
                                <Repair
                                    setActiveTab={setActiveStep}
                                    prices={prices}
                                    activePrice={ActivePriceValueC.current}
                                    setActivePrice={setActivePrice}
                                />
                            </section>
                            {/*  */}
                            <section
                                className={`${
                                    activeTabC.current != 4 && "hidden"
                                }`}
                            >
                                <Finalize
                                    setActiveTab={setActiveStep}
                                    serviceId={serviceId}
                                    ActiveDeviceValueC={ActiveDeviceValueC}
                                    ActivePriceValueC={ActivePriceValueC}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

function Services({
    setActiveTab,
    services,
    activeService,
    setActiveService,
    setServiceId,
}: any) {
    console.log(services);
    return (
        <div>
            <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-[700] text-xl">
                    Please select the service.
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {services.map((service: any, index: number) => (
                        <button
                            onClick={() => {
                                setActiveService(service.slug);
                                setServiceId(service.id);
                            }}
                            key={index}
                            className={` ${
                                activeService == service.slug
                                    ? "bg-white border-primary text-primary"
                                    : "bg-white hover:bg-slate-200 border-transparent hover:text-primary "
                            } item h-[120px] md:h-[140px] border-2 rounded-xl  p-2 flex duration-300 ease-in-out cursor-pointer`}
                        >
                            <div className="self-center h-full justify-center w-full ">
                                <div className="h-[40%] mx-auto mt-2">
                                    <img
                                        src={service.icon_url}
                                        className="w-[auto] h-full object-cover mx-auto"
                                        alt=""
                                    />
                                </div>
                                <p className="text-center leading-[1.1] text-sm mt-2 md:h-[30%] font-[800]">
                                    {service.name}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex mt-2">
                <PrimaryButton
                    onClick={() => setActiveTab(2)}
                    disabled={activeService == null ? true : false}
                    className={`px-10 ml-auto`}
                >
                    Next
                </PrimaryButton>
            </div>
        </div>
    );
}

function Devices({
    setActiveTab,
    devices,
    activeDevice,
    setActiveDevice,
}: any) {
    return (
        <>
            <div className="bg-gray-50 p-6 rounded-xl min-h-[400px]">
                <h3 className="font-[700] text-xl">
                    Please select the Device.
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {devices.map((device: any, index: number) => (
                        <button
                            onClick={() => setActiveDevice(device.id)}
                            key={index}
                            className={` ${
                                activeDevice == device.id
                                    ? "bg-primary border-primary text-white"
                                    : "bg-white hover:bg-primary border-transparent hover:text-white "
                            } item border-2 rounded-xl  p-2 flex duration-300 ease-in-out cursor-pointer`}
                        >
                            <div className="self-center h-full justify-center w-full ">
                                <p className="text-center leading-[1.1] text-sm font-[800]">
                                    {device.name}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex mt-2 justify-end space-x-2">
                <PrimaryButton
                    onClick={() => setActiveTab(1)}
                    className="px-10 bg-slate-800"
                >
                    Back
                </PrimaryButton>
                <PrimaryButton
                    onClick={() => setActiveTab(3)}
                    disabled={activeDevice == null ? true : false}
                    className="px-10"
                >
                    Next
                </PrimaryButton>
            </div>
        </>
    );
}

function Repair({ setActiveTab, prices, activePrice, setActivePrice }: any) {
    return (
        <>
            <div className="bg-gray-50 p-6 rounded-xl min-h-[400px]">
                <h3 className="font-[700] text-xl">
                    What you want to get done?
                </h3>
                <div className="grid lg:grid-cols-3 gap-4 mt-8">
                    {prices.map((price: any, index: number) => (
                        <button
                            onClick={() => setActivePrice(price.id)}
                            key={index}
                            className={` ${
                                activePrice == price.id
                                    ? "bg-primary border-primary text-white"
                                    : "bg-white hover:bg-primary border-transparent hover:text-white text-slate-600 "
                            } item border-2 rounded-xl p-4  lg:p-2 flex duration-300 ease-in-out cursor-pointer`}
                        >
                            <div className="self-center h-full justify-center w-full ">
                                <p className="text-center leading-[1.1] text-sm font-[800] flex justify-between">
                                    <span>{price.repair.name}</span>
                                    <span>ZAR {price.price}</span>
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex mt-2 justify-end space-x-2">
                <PrimaryButton
                    onClick={() => setActiveTab(2)}
                    className="px-10 bg-slate-800"
                >
                    Back
                </PrimaryButton>
                <PrimaryButton
                    onClick={() => setActiveTab(4)}
                    className="px-10"
                    disabled={activePrice == null ? true : false}
                >
                    Next
                </PrimaryButton>
            </div>
        </>
    );
}

function Finalize({
    setActiveTab,
    ActiveDeviceValueC,
    serviceId,
    ActivePriceValueC,
}: any) {
    const { data, setData, post, processing, errors, reset, get, patch } =
        useForm({
            customer_name: "",
            email: "",
            phone_number: "",
            message: "",
            device_id: "",
            price_id: "",
            service_id: "",
        });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = {
            device_id: ActiveDeviceValueC.current,
            price_id: ActivePriceValueC.current,
            service_id: serviceId,
        };

        Object.assign(data, formData);

        post(route("booking.store"), {
            onSuccess: () => {
                reset();
                setActiveTab(1);
                setOpenSuccessModal(true);
            },
        });
    };
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    function closeModal() {
        setOpenSuccessModal(false);
    }

    return (
        <>
            <div className="bg-gray-50 p-6 rounded-xl min:h-[400px]">
                <h3 className="font-[700] text-xl">Your Details.</h3>
                {/*  */}
                <form
                    onSubmit={submit}
                    className="grid lg:grid-cols-4 gap-4 mt-8"
                >
                    {/* Name */}
                    <div>
                        <InputLabel
                            htmlFor="customer_name"
                            value="Your Name"
                            required
                            className="!text-slate-800 pl-1"
                        />

                        <TextInput
                            id="customer_name"
                            name="customer_name"
                            type="text"
                            value={data.customer_name}
                            className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 !text-slate-800 pl-1"
                            onChange={(e) =>
                                setData("customer_name", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.customer_name}
                            className="mt-2"
                        />
                    </div>
                    {/* Email */}
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
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    {/* Phone Number */}
                    <div>
                        <InputLabel
                            htmlFor="phone_number"
                            value="Phone Number"
                            required
                            className="!text-slate-800 pl-1"
                        />

                        <TextInput
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            value={data.phone_number}
                            className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 !text-slate-800 pl-1"
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.phone_number}
                            className="mt-2"
                        />
                    </div>
                    {/* Message */}
                    <div className="lg:col-span-3">
                        <InputLabel
                            htmlFor="message"
                            value="Messsage"
                            required
                            className="!text-slate-800 pl-1"
                        />

                        <TextArea
                            id="message"
                            name="message"
                            value={data.message}
                            rows={4}
                            className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 !text-slate-800 pl-1"
                            onChange={(e) => setData("message", e.target.value)}
                        />

                        <InputError message={errors.message} className="mt-2" />
                    </div>
                </form>
            </div>
            <div className="flex mt-4 justify-end space-x-2">
                <PrimaryButton
                    onClick={() => setActiveTab(3)}
                    className="px-10 bg-slate-800"
                >
                    Back
                </PrimaryButton>
                <PrimaryButton className="px-10" type="submit" onClick={submit}>
                    Submit
                </PrimaryButton>
                <BookingSuccessModel
                    open={openSuccessModal}
                    setOpen={setOpenSuccessModal}
                    closeModal={() => closeModal()}
                />
            </div>
        </>
    );
}

export function BookingSuccessModel({
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
                                            We received your booking details
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-lg text-gray-400">
                                                Hello there, we have received
                                                your booking details and we will
                                                get back to you as soon as
                                                possible. Thank you.
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
