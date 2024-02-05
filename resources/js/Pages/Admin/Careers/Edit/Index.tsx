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
        name: "Careers",
        hasArrow: true,
        link: route("admin.careers.index"),
    },
    {
        name: "View",
        hasArrow: true,
        link: "",
    },
];

export default function EditCareers({
    career,
}: {
    career: any;
}) {
    const { data, setData, post, progress, errors, reset } = useForm({
        first_name: career.first_name,
        last_name: career.last_name,
        email: career.email,
        phone: career.phone,
        cv: career?.cv,
    });
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title={"View"} />
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {"View"}
                    </h2>
                </div>
            </div>
            <form className=" grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="bg-white grid grid-cols-2 rounded-xl p-8 gap-y-4 gap-x-4">
                        <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="first_name" value="First Name" />

                            <TextInput
                                id="first_name"
                                name="first_name"
                                type="text"
                                disabled
                                value={data.first_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.first_name}
                                className="mt-2"
                            />
                        </div>
                       <div className="col-span-2 md:col-span-1">
                            <InputLabel htmlFor="last_name" value="Last Name" />

                            <TextInput
                                id="last_name"
                                name="last_name"
                                type="text"
                                disabled
                                value={data.last_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.last_name}
                                className="mt-2"
                            />
                        </div>
                         <div className="col-span-2">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                name="email"
                                type="text"
                                disabled
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-8 space-y-4 mt-8">
                        <div>
                            {/* Image */}
                            <InputLabel htmlFor="cv" value="CV" />
                            <div className="mt-2 grid grid-flow-row justify-center rounded-xl border-2 border-dashed px-6 py-2 ">
                                <a href={`/storage/${(data?.cv)}`} target="_blank">{data?.cv}</a>
                            </div>
                            <span className="text-gray-500 text-xs">Please click to preview CV <span className="text-red-500">*</span></span>
                        </div>
                    </div>
                </div>
                <div className="gap-y-6">
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="phone" value="Phone" />

                            <TextInput
                                id="phone"
                                name="phone"
                                type="text"
                                disabled
                                value={data.phone}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Authenticated>
    );
}
