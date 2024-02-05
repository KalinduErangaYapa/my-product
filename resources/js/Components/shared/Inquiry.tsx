import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import TextArea from "@/Components/elements/inputs/TextArea";
import TextInput from "@/Components/elements/inputs/TextInput";
import { InquirySuccessModel } from "@/Pages/ContactUs/Index";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Link, useForm, usePage } from "@inertiajs/react";
import { spawn } from "child_process";
import { FormEventHandler, useState } from "react";

export default function Inquiry({
    product,
    type,
}: {
    product?: any;
    type?: any;
}) {
    const { flash }: any = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
        product_id: product ?? "",
        type: type ?? "inquiry",
    });
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("inquiry.store"), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
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
            // className={`relative isolate overflow-hidden py-8 sm:py-24 bg-[#0B0B0E]`}
        >
            {/* <div className="container mx-auto text-center px-4 sm:px-0">
                <div className="bg-[#101013] sm:w-3/5 mx-auto rounded-xl p-8">
                    <h2 className="text-center text-[#D2D2D2] text-5xl font-[800] font-display">
                        Inquire Now
                    </h2>
                    <form
                        onSubmit={submit}
                        className="grid grid-cols-2 text-left mt-8 gap-6"
                    >
                        <div className="col-span-2 md:col-span-1">
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="!text-[#B7B7B7] pl-1"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-[#242424] !rounded-2xl !border-[#242424] text-gray-100"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <InputLabel
                                htmlFor="name"
                                value="Name"
                                className="!text-[#B7B7B7] pl-1"
                            />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-[#242424] !rounded-2xl !border-[#242424] text-gray-100"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-2">
                            <InputLabel
                                htmlFor="message"
                                value="Message"
                                className="!text-[#B7B7B7] pl-1"
                            />

                            <TextArea
                                id="message"
                                name="message"
                                value={data.message}
                                className="mt-1 block w-full bg-[#242424] !rounded-2xl !border-[#242424] text-gray-100"
                                autoComplete="message"
                                rows={8}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.message}
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-2 md:flex mt-4 gap-x-4">
                            <PrimaryButton
                                className="w-[180px] flex mb-2 md:mb-0"
                                type="submit"
                                disabled={processing}
                            >
                                <span className="mx-auto">Submit Now</span>
                            </PrimaryButton>
                            <h1 className="text-[#B7B7B7] text-sm self-center">
                                By submitting inquiry you will be agreed to our
                                {` `}
                                <Link
                                    className="text-blue-400 text-sm"
                                    href="/"
                                >
                                    Privacy and policies.
                                </Link>
                            </h1>
                        </div>
                    </form>
                </div>
            </div>
            <InquirySuccessModel
                open={openSuccessModal}
                setOpen={setOpenSuccessModal}
                closeModal={() => closeModal()}
            /> */}
        </div>
    );
}
