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
        name: "Categories",
        hasArrow: true,
        link: route("admin.categories.index"),
    },
    {
        name: "Edit",
        hasArrow: true,
        link: "",
    },
];

export default function CreateProduct({
    category,
    type,
    categoryStatus,
    parentCategories,
}: {
    category: Category;
    type: string;
    categoryStatus: { label: string; value: string }[];
    parentCategories: { label: string; value: string }[];
}) {
    const { data, setData, post, progress, errors, reset } = useForm({
        name: category.name,
        slug: category.slug == "draft" ? "" : category.slug,
        description: category.description,
        status: category.status,
        // parent_id: category.parent_id,
        image: "",
    });
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
                "image",
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

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () =>
            images.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, [images]);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            route("admin.categories.info.update", {
                category: category.id,
            })
        );
    };

    const title = type == "create" ? "Create Category" : "Edit category";

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
            <form onSubmit={submit} className=" grid grid-cols-3 gap-8">
                <div className="col-span-3 flex">
                    <PrimaryButton className="ml-auto" type="submit">
                        Save & Submit
                    </PrimaryButton>
                </div>
                <div className="col-span-2">
                    <div className="bg-white rounded-xl p-8 space-y-4">
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
                                htmlFor="description"
                                value="Description"
                            />

                            <TextArea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                isFocused={true}
                                rows={8}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-8 space-y-4 mt-8">
                        <div>
                            {/* Image */}
                            <InputLabel htmlFor="image" value="Image" />
                            <div className="mt-2 grid grid-flow-row justify-center rounded-xl border-2 border-dashed px-6 py-2 ">
                                <div className="relative flex items-center h-full ">
                                    <div
                                        {...getRootProps({
                                            className: "dropzone",
                                        })}
                                        className="min-h-[100px] object-cover h-full w-full cursor-pointer flex rounded-xl bg-slate-200"
                                    >
                                        <input
                                            type="file"
                                            {...getInputProps()}
                                        />
                                        {images.length > 0 ? (
                                            thumb
                                        ) : (
                                            <img
                                                src={category.image_url}
                                                className="h-[auto] w-full flex overflow-hidden  rounded-xl bg-gray-50"
                                            />
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
                                <InputError message={errors?.image} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" space-y-6">
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="status" value="Status" />

                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={categoryStatus}
                                selectedOption={categoryStatus.filter(
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
                    {/* <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="parent_id"
                                value="Parent Category"
                            />

                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={parentCategories}
                                selectedOption={parentCategories.filter(
                                    (obj: any) => {
                                        return obj.value === data.parent_id;
                                    }
                                )}
                                setData={(e: any) => setData("parent_id", e)}
                            />

                            <InputError
                                message={errors.parent_id}
                                className="mt-2"
                            />
                        </div>
                    </div> */}
                    <div className="bg-white rounded-xl p-8 space-y-4">
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
                    </div>
                </div>
            </form>
        </Authenticated>
    );
}
