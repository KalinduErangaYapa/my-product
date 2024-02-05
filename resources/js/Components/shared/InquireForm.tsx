import { Link, router, useForm } from "@inertiajs/react";
import InputLabel from "../elements/inputs/InputLabel";
import TextInput from "../elements/inputs/TextInput";
import InputError from "../elements/inputs/InputError";
import TextArea from "../elements/inputs/TextArea";
import { PrimaryButton, PrimaryLink } from "../elements/buttons/PrimaryButton";
import { FormEventHandler, Fragment, useState } from "react";
import { Product } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { SecondaryButton } from "../elements/buttons/SecondaryButton";

export default function InquireNow({
    product,
    type,
    info = true,
}: {
    product?: Product;
    type?: string;
    info?: boolean;
}) {
    const { data, setData, post, progress, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        subject: product ? `Inquiry for - ${product.name}` : "",
        message: "",
        type: type,
        product_id: product ? product.id : "",
    });

    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("inquiry.store"), {
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
        <div
            className="relative isolate bg-gray-50 px-6 py-24 sm:py-32 lg:px-8"
            id="inquiry-form"
        >
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width={200}
                        height={200}
                        x="50%"
                        y={-64}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
                    <path
                        d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
                        strokeWidth={0}
                    />
                </svg>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
            </svg>
            <div className="mx-auto container">
                {info == true && (
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                            Inquire Now
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            We help companies and individuals build out their
                            brand guidelines.
                        </p>
                    </div>
                )}
                <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
                    <form
                        onSubmit={submit}
                        className="lg:flex-auto bg-white rounded-xl shadow-xl p-8"
                    >
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    required
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
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
                                />

                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="phone" value="Phone" />

                                <TextInput
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={data.phone}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="subject"
                                    value="Subject"
                                    required
                                />

                                <TextInput
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={data.subject}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.subject}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="message"
                                    value="Your Message"
                                    required
                                />

                                <TextArea
                                    id="message"
                                    name="message"
                                    value={data.message}
                                    className="mt-1 block w-full"
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
                            <PrimaryButton type="submit">
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
                    <div className="lg:w-1/3 lg:flex-none bg-white rounded-xl shadow-xl p-8">
                        <div>
                            <h6 className="font-[800] text-6xl text-green-600 text-center">
                                Whatsapp
                            </h6>
                            <p className="text-lg mt-3 font-semibold leading-[1.3] text-gray-900 text-center">
                                Do you like to talk to us? We are here for you.
                                Just send us a message on Whatsapp. We are on
                                standby.
                            </p>
                        </div>
                        <div className="flex w-full">
                            <a
                                href="#"
                                className="bg-green-600 mx-auto space-x-2 py-2 px-12 rounded-full justify-center flex text-white font-semibold text-lg mt-8 hover:bg-green-700 transition duration-300 ease-in-out"
                            >
                                <img
                                    src="/assets/images/other/whatsapp.png"
                                    className="h-8 w-8 self-center"
                                />
                                <span className="self-center">Chat Now</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <InquirySuccessModel
                open={openSuccessModal}
                setOpen={setOpenSuccessModal}
                closeModal={() => closeModal()}
            />
        </div>
    );
}

function InquirySuccessModel({
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon
                                            className="h-12 w-12 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-[800] leading-6 text-primary-600"
                                        >
                                            We received your inquiry
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-lg text-gray-500">
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
