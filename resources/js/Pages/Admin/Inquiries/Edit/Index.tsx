import { FormEventHandler, useCallback, useEffect, useState } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, Product } from "@/types";
import Breadcrumbs from "@/Components/elements/header/BreadCumbs";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";
import { useDropzone } from "react-dropzone";

export default function CreateInquiry({
    inquiry,
    type,
    inquiryTypes,
    inquiryStatus,
}: {
    inquiry: any;
    type: string;
    inquiryTypes: string;
    inquiryStatus: { label: string; value: string }[];
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Inquiries",
            hasArrow: true,
            link: route("admin.inquiries.index"),
        },
        {
            name: "View",
            hasArrow: true,
            link: "",
        },
    ];
    const { data, setData, patch, errors, reset } = useForm({
        status: inquiry.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(
            route("admin.inquiries.update", {
                inquiry: inquiry.id,
            })
        );
    };

    const title = "Edit Inquiry";
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title={title} />
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {title}
                    </h2>
                </div>
            </div>
            <form onSubmit={submit} className=" grid lg:grid-cols-3 grid-cols-4 gap-8">
                <div className="lg:col-span-3 col-span-4 flex">
                    <PrimaryButton className="ml-auto" type="submit">
                        Save
                    </PrimaryButton>
                </div>
                <div className="sm:col-span-2 col-span-4">
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <h3 className=" text-xl mb-8 font-medium leading-6 text-gray-900">
                                {inquiry?.type == "inquiry"
                                    ? "Inquiry"
                                    : "Quotation"}
                                {" Information"}{" "}
                            </h3>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-6  sm:grid-cols-6">
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold">Name :</div>
                                    <div>{inquiry?.name}</div>
                                </div>
                            </div>

                            <div className="sm:col-span-6 ">
                                <div className="block flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold">Email :</div>
                                    <div>{inquiry?.email}</div>
                                </div>
                            </div>
                            <div className="sm:col-span-6 ">
                                <div className="block flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold">Phone :</div>
                                    <div>{inquiry?.phone}</div>
                                </div>
                            </div>
                            {/* <div className="sm:col-span-6 ">
                                <div className="block flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold">Product :</div>
                                    <div>{inquiry?.product?.main_image?.url}</div>
                                </div>
                            </div> */}
                            <div className="sm:col-span-6">
                                <div className="flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold">Message :</div>
                                    <div>{inquiry?.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-2 col-span-4 lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl p-8 space-y-4">
                            <div>
                                <InputLabel htmlFor="status" value="Status" />

                                <SelectInput
                                    className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                    options={inquiryStatus}
                                    selectedOption={inquiryStatus.filter(
                                        (obj: any) => {
                                            return obj.value === data.status;
                                        }
                                    )}
                                    setData={(e: any) => setData("status", e)}
                                />

                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    {inquiry?.type == "quotation" && (
                        <div className="bg-white rounded-xl p-8 space-y-4">
                            <InputLabel htmlFor="product" value="Product" />
                            <div className="mt-2 grid grid-flow-row justify-center rounded-xl border-2 border-dashed py-2 ">
                                <img
                                    src={inquiry?.product?.main_image?.url}
                                    className="h-[200px] w-[200px] flex overflow-hidden  rounded-xl bg-gray-50"
                                    alt={inquiry?.product.name}
                                />
                                <div className=" mt-3  text-gray-700 text-center">
                                    {"Product Name : " + inquiry?.product.name}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </Authenticated>
    );
}
