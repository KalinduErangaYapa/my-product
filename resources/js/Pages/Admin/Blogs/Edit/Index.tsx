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
import "react-quill/dist/quill.snow.css";
import Quill from "react-quill";

export default function CreateProduct({
    blog,
    type,
    blogStatus,
    parentCategories,
}: {
    blog: any;
    type: string;
    blogStatus: { label: string; value: string }[];
    parentCategories: { label: string; value: string }[];
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Blogs",
            hasArrow: true,
            link: route("admin.blogs.index"),
        },
        {
            name: type == "create" ? "Create" : "Edit",
            hasArrow: true,
            link: "",
        },
    ];

    const { data, setData, post, progress, errors, reset } = useForm({
        title: type == 'edit' ? blog.title : "",
        description: type == 'edit' ? blog.description : "",
        status: type == 'edit' ? blog.status : "",
        image: "",
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
            route("admin.blog.updateBlog", {
                blog: blog.id,
            })
        );
    };

    const title = type == "create" ? "Create Blog" : "Edit Blog";

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
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                value={data.title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.title}
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
                                onChange={(e) => setData("description", e)}
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
                                            // {}
                                            <img
                                                src={blog?.image_url}
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
                                options={blogStatus}
                                selectedOption={blogStatus.filter(
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
                </div>
            </form>
        </Authenticated>
    );
}
