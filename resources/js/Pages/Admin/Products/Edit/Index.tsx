import { FormEventHandler, useCallback, useEffect, useState } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Product } from "@/types";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";
import UploadImagesModal from "./Partials/UploadImagesModal";
import DeviceModal from "./Partials/Devices";
import {
    ArrowDownCircleIcon,
    ArrowRightCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import "react-quill/dist/quill.snow.css";
import Quill from "react-quill";
import { useDropzone } from "react-dropzone";
import Checkbox from "@/Components/elements/inputs/Checkbox";

export default function CreateProduct({
    product,
    type,
    productStatus,
    repairTypes,
    featuredData,
}: {
    product: Product;
    type: string;
    repairTypes: any;
    productStatus: { label: string; value: string }[];
    featuredData: { label: string; value: string }[];
}) {

    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Services",
            hasArrow: true,
            link: route("admin.services.index"),
        },
        {
            name: type == "create" ? "Create" : "Edit",
            hasArrow: true,
            link: "",
        },
    ];

    const [showImageModal, setShowImageModal] = useState(false);
    const [showDeviceModal, setShowDeviceModal] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
    const [openIndex, setOpenIndex] = useState(-1);

    const { data, setData, patch, processing, errors, reset, progress, post } =
        useForm({
            name: product.name,
            page_title: product.page_title,
            introduction: product.introduction,
            slug: product.slug == "draft" ? "" : product.slug,
            description: product.description,
            status: product.status,
            category_id: product.category_id,
            brand_id: product.brand_id,
            base_price: product.base_price,
            cut_off_price: product.cut_off_price,
            base_stock: product.base_stock,
            collections: product.collection_ids,
            is_featured: product.is_featured,
            icon: product.icon,
            repairTypes: repairTypes,
        });

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    // editor formats
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "icon",
        "color",
    ];

    const [canCleanImage, setCanCleanImage] = useState(false);
    const [images, setImages] = useState([]);
    const onDrop = useCallback(
        (acceptedFiles: any) => {
            setImages(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
            setCanCleanImage(true);
            setData(
                "icon",
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )[0]
            );
        },
        [setImages, setData]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [],
        },
    });
    const thumb = images.map((file: any) => (
        <div key={file.name}>
            <div>
                <img
                    alt={file.name}
                    src={file.preview}
                    width={300}
                    height={300}
                    className="h-[200px] w-full overflow-hidden object-contain rounded-xl bg-gray-700"
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    const remove = (file: any) => {
        const newImages = [...images];
        newImages.splice(file, 1);
        setImages(newImages);
        setCanCleanImage(false);
    };

    function handleChange(e: any) {
        const key = e.target.name;
        const value = e.target.value;
        const device = e.target.getAttribute("data-device");
        const repair = e.target.getAttribute("data-repair");

        let repairTypes = data.repairTypes;
        if (key == "status") {
            console.log();
            repairTypes[device]["repairs"][repair][key] =
                repairTypes[device]["repairs"][repair][key] == "active"
                    ? "inactive"
                    : "active";
        } else {
            repairTypes[device]["repairs"][repair][key] = value;
        }
        setData("repairTypes", repairTypes);
    }

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () =>
            images.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, [images]);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.services.updateProduct", { product: product.id }), {
            data: { ...data, icon: selectedIcon },
            onSuccess: () => {
                reset();
            },
        });
    };

    const title = type == "create" ? "Create Service" : "Edit Service";
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title={title} />
            <form
                onSubmit={submit}
                className=" grid grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
                <div className="col-span-3 flex justify-between sticky top-[105px] bg-slate-100 z-10 p-4">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {title}
                    </h2>
                    <PrimaryButton className="ml-auto" type="submit">
                        Save & Submit
                    </PrimaryButton>
                </div>
                <div className="col-span-2 space-y-6 mt-4 lg:mt-0">
                    <div className="bg-white shadow-card rounded-xl p-8 space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
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
                                htmlFor="page_title"
                                value="Page Title"
                            />

                            <TextInput
                                id="page_title"
                                name="page_title"
                                type="text"
                                value={data.page_title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("page_title", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.page_title}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Introduction" />

                            <TextArea
                                id="introduction"
                                name="introduction"
                                value={data.introduction}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("introduction", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.introduction}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <Quill
                                theme="snow"
                                style={{
                                    height: "300px",
                                    marginBottom: "70px",
                                }}
                                modules={modules}
                                value={data.description}
                                formats={formats}
                                onChange={(e:any) => setData("description", e)}
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {/* images */}
                    <div className="bg-white shadow-card rounded-xl p-8 space-y-6">
                        <div className="flex justify-between">
                            <h6 className="font-[800]">Images</h6>
                            <button
                                type="button"
                                onClick={() => setShowImageModal(true)}
                                className="bg-gray-800 rounded-xl py-2 px-8 text-white"
                            >
                                Upload
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-x-2 gap-y-5 rounded-md">
                            {product.images?.map((image: any, index: any) => (
                                <div key={index} className="relative ">
                                    <div className=" col-span-1 flex justify-center rounded-md border border-gray-300">
                                        <img
                                            src={image.url}
                                            alt="product_image"
                                            width={150}
                                            height={150}
                                            className="rounded-md "
                                        />
                                    </div>
                                    <div className="absolute right-0 top-[-5px] text-right ">
                                        <div className="relative  inline-block text-left">
                                            <Link
                                                href={route(
                                                    "admin.services.images.delete",
                                                    { image: image.id }
                                                )}
                                                preserveState={true}
                                                method="delete"
                                                as="button"
                                                type="button"
                                                className={
                                                    "inline-flex  w-full justify-center rounded-full bg-red-300 p-1 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-red-500"
                                                }
                                            >
                                                <XMarkIcon className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* devices */}
                    {type == "edit" && (
                        <div className="bg-white shadow-card rounded-xl p-8 space-y-6">
                            <div className="flex justify-between">
                                <h6 className="font-[800]">Devices</h6>
                                <button
                                    type="button"
                                    onClick={() => setShowDeviceModal(true)}
                                    className="bg-gray-800 rounded-xl py-2 px-8 text-white"
                                >
                                    Create a device
                                </button>
                            </div>
                            <div className="space-y-5">
                                {data.repairTypes?.map(
                                    (device: any, dIndex: number) => (
                                        <div key={dIndex}>
                                            <div
                                                className="flex justify-between w-full bg-gray-100 cursor-pointer rounded-lg px-2 py-3 mt-2"
                                                onClick={() =>
                                                    setOpenIndex(dIndex)
                                                }
                                            >
                                                <h6 className="text-l font-semibold">
                                                    {device.name}
                                                </h6>
                                                <span>
                                                    {openIndex === dIndex && (
                                                        <ArrowDownCircleIcon className="w-6 h-6 " />
                                                    )}
                                                    {openIndex !== dIndex && (
                                                        <ArrowRightCircleIcon className="w-6 h-6 " />
                                                    )}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                {/* Delete Button */}
                                                {/* {openIndex === index && (
                                            <ConfirmButton
                                                className="ml-10 py-1 "
                                                url={route(
                                                    "admin.services.deleteDevice",
                                                    {
                                                        device: device.id,
                                                        product: product.id,
                                                    }
                                                )}
                                                label="Delete"
                                            />
                                        )} */}
                                                {openIndex === dIndex && (
                                                    <div className="mt-8">
                                                        <table className="min-w-full divide-y divide-gray-200 shadow">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Repair
                                                                        Type
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Price
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Can
                                                                        Display?
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {device.repairs.map(
                                                                    (
                                                                        repairType: any,
                                                                        rIndex: number
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                repairType.id
                                                                            }
                                                                        >
                                                                            <td className="py-2 pl-2">
                                                                                {
                                                                                    repairType.name
                                                                                }
                                                                            </td>
                                                                            <td className="px-6 py-2">
                                                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                                                                        ZAR
                                                                                    </span>
                                                                                    <input
                                                                                        id={`device${dIndex}repair${rIndex}price`}
                                                                                        name={`price`}
                                                                                        data-device={
                                                                                            dIndex
                                                                                        }
                                                                                        data-repair={
                                                                                            rIndex
                                                                                        }
                                                                                        type="text"
                                                                                        value={
                                                                                            repairType.price
                                                                                        }
                                                                                        onChange={
                                                                                            handleChange
                                                                                        }
                                                                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                                        placeholder="www.example.com"
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                            <td className="flex py-3">
                                                                                <Checkbox
                                                                                    id={`device${dIndex}repair${rIndex}status`}
                                                                                    name={`status`}
                                                                                    data-device={
                                                                                        dIndex
                                                                                    }
                                                                                    data-repair={
                                                                                        rIndex
                                                                                    }
                                                                                    checked={
                                                                                        repairType.status ==
                                                                                        "active"
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    className="w-8 h-8 mx-auto self-center"
                                                                                    onChange={
                                                                                        handleChange
                                                                                    }
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-6">
                    <div className="bg-white shadow-card rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={productStatus}
                                selectedOption={productStatus.filter(
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
                    {/* <div className="bg-white shadow-card rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="category_id"
                                value="Category"
                            />

                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={categories}
                                selectedOption={categories.filter(
                                    (obj: any) => {
                                        return obj.value === data.category_id;
                                    }
                                )}
                                setData={(e: any) => setData("category_id", e)}
                            />

                            <InputError
                                message={errors.category_id}
                                className="mt-2"
                            />
                        </div>
                    </div> */}

                    {/* <div className="bg-white shadow-card rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="is_featured"
                                value="Is Featured"
                            />

                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={featuredData}
                                selectedOption={featuredData?.filter(
                                    (obj: any) => {
                                        return obj.value === data.is_featured;
                                    }
                                )}
                                setData={(e: any) => setData("is_featured", e)}
                            />

                            <InputError
                                message={errors.is_featured}
                                className="mt-2"
                            />
                        </div>
                    </div> */}

                    {/* <div className="bg-white shadow-card rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="slug" value="Handler" />

                            <TextInput
                                id="slug"
                                name="slug"
                                type="text"
                                value={data.slug}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.slug}
                                className="mt-2"
                            />
                        </div>
                    </div> */}
                    {/*icons */}
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="image" value="Icon" />
                            <div className="mt-2 grid grid-flow-row justify-center rounded-xl border-2 border-dashed px-6 py-2 ">
                                <div className="relative flex items-center h-full ">
                                    <div
                                        {...getRootProps({
                                            className: "dropzone",
                                        })}
                                        className="min-h-[200px] object-cover h-full w-full cursor-pointer flex rounded-xl bg-slate-200"
                                    >
                                        <input
                                            type="file"
                                            {...getInputProps()}
                                        />
                                        {images.length > 0 ? (
                                            thumb
                                        ) : product?.icon ? (
                                            <img
                                                src={product.icon_url}
                                                alt={product.name ?? ""}
                                                className="h-[200px] w-full flex overflow-hidden  rounded-xl bg-gray-50"
                                            />
                                        ) : (
                                            <span className="mx-auto  left-4 right-4 absolute self-center grid text-center text-gray-900">
                                                Upload Icon
                                            </span>
                                        )}
                                    </div>
                                    {progress && (
                                        <progress
                                            value={progress.percentage}
                                            className="h-2 bg-emerald-500 absolute top-0 left-0"
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>
                                {canCleanImage && (
                                    <button
                                        className="z-10 mx-auto mt-2 w-[70px] rounded bg-gray-300 py-1 px-2 text-sm text-gray-700 hover:bg-gray-500 hover:text-gray-900"
                                        type="button"
                                        onClick={() => remove(0)}
                                    >
                                        Clean
                                    </button>
                                )}
                                {canCleanImage ? null : (
                                    <div className="ml-3 mt-1 text-xs font-light text-gray-500 text-center">
                                        {" "}
                                        Drag and drop or click to replace
                                    </div>
                                )}
                                <InputError message={errors?.icon} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* images model */}
            <UploadImagesModal
                show={showImageModal}
                closeModal={setShowImageModal}
                product={product}
            />
            {/**Devcice */}
            <DeviceModal
                show={showDeviceModal}
                closeModal={setShowDeviceModal}
                product={product}
                productStatus={productStatus}
            />
        </Authenticated>
    );
}
