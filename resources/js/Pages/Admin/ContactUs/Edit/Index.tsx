import { FormEventHandler, useCallback, useEffect, useState } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, Product } from "@/types";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";
import { useDropzone } from "react-dropzone";
import SelectMultiInput from "@/Components/elements/inputs/SelectMultiInput";

const bRoutes = [
    {
        name: "Dashboard",
        hasArrow: true,
        link: route("admin.dashboard"),
    },
    {
        name: "Contact Us",
        hasArrow: true,
        link: route("admin.contact-us.index"),
    },
    {
        name: "View",
        hasArrow: true,
        link: "",
    },
];

export default function EditCareers({
    contactUs,
}: {
    contactUs: any;
    }) {
    const { data, setData, errors } = useForm({
        name: contactUs?.name,
        email: contactUs?.email,
        message: contactUs?.message,
    });
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title={"View"} />
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Contact Us
                    </h2>
                </div>
            </div>
            <form className=" grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="bg-white grid grid-cols-2 rounded-xl p-8 gap-y-4 gap-x-4">
                        <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                type="text"
                                disabled
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                            />
                        </div>
                       <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                name="email"
                                type="text"
                                disabled
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                            />
                        </div>
                         <div className="col-span-2">
                            <InputLabel htmlFor="message" value="Message" />
                            <TextArea
                                id="message"
                                name="message"
                                value={data.message}
                                disabled
                                className="mt-1 block w-full"
                                isFocused={true}
                                rows={8}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Authenticated>
    );
}
