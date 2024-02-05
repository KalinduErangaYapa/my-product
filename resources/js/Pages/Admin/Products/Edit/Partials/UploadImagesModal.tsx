import Modal from "@/Components/elements/other/Modal";
import { Product } from "@/types";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useCallback, useEffect } from "react";
// import { useState } from "react";
import { useDropzone } from "react-dropzone";
import useState from "react-usestateref";

export default function uploadImagesModal({
    show,
    closeModal,
    product,
}: {
    show: boolean;
    closeModal: any;
    product: Product;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages, imageRef] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        // accept: {
        //     "image/*": [],
        // },
        onDrop: (acceptedFiles: any) => {
            setImages(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
            setData(
                "images",
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const { data, setData, post, processing, progress, errors, reset } =
        useForm({
            images: [],
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.services.images.upload", { product: product.id }), {
            onSuccess: () => {
                closeModal(false);
                reset();
                removeAll(0);
            },
        });
    };

    const thumb = images.map((file: any, i: number) => (
        <div key={file.name} className="relative ">
            <div className=" flex flex-wrap justify-center">
                <img
                    alt={file.name}
                    src={file.preview}
                    width={100}
                    height={100}
                    className="h-[auto] w-[200px] overflow-hidden rounded-lg bg-gray-100 object-cover"
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
            <div className="absolute right-0 top-0  text-right ">
                <div className="relative inline-block text-left">
                    <button
                        onClick={() => remove(i)}
                        className={
                            "inline-flex  w-full justify-center rounded-full bg-red-300 p-1 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-red-500"
                        }
                    >
                        <XMarkIcon className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </div>
    ));

    /**
     * Clean selected file
     * @param file
     */
    const remove = (file: any) => {
        const newFiles = [...images]; // make a var for the new array
        newFiles.splice(file, 1); // remove the file from the array
        setImages(newFiles); // update the state
        setData({ images: newFiles });
    };
    const removeAll = useCallback(
        (file: any) => {
            const newFiles = [...images]; // make a var for the new array
            newFiles.splice(file); // remove the file from the array
            setImages(newFiles); // update the state
            setData({ images: newFiles });
        },
        [images, setImages]
    );
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () =>
            images.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, [images]);
    return (
        <Modal show={show} onClose={closeModal}>
            <form onSubmit={submit} className="p-8">
                <h6 className="font-[800]">Upload Images</h6>
                <div className="grid grid-cols-3 group col-span-6 mt-6 rounded-lg border-2 border-dashed border-gray-500 p-3 ">
                    <div className="col-span-2">
                        {isLoading ? (
                            <div className="flex min-h-[180px] w-[250px] cursor-pointer items-center justify-center gap-y-2 self-center rounded-lg border border-dashed border-gray-200 bg-slate-100 hover:bg-blue-100">
                                <div>
                                    <div className="flex items-center justify-center">
                                        {/* <LoadingSpinner /> */}
                                    </div>
                                    <div className="text-md flex items-center justify-center font-semibold text-gray-500">
                                        Uploading...
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                {...getRootProps({
                                    className: "dropzone",
                                })}
                                className="flex min-h-[180px] w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-200 bg-slate-100 hover:bg-blue-100"
                            >
                                <input {...getInputProps()} />
                                <div className="absolute flex flex-col items-center justify-center px-2 py-5 text-center ">
                                    <svg
                                        aria-hidden="true"
                                        className="mb-3 h-10 w-10 text-gray-400 group-hover:animate-bounce"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        ></path>
                                    </svg>

                                    <span>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload images
                                            </span>
                                            <br /> or
                                            <br /> drag and drop images here
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            (MAX. 20 Mb)
                                        </p>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center mt-4 px-4">
                        <div className="self-center">
                            <button
                                type="submit"
                                className="bg-gray-900 py-3 px-12 rounded-xl text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {progress && (
                <div className="px-8 bg-gray-200">
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                                width: `${progress.percentage}%`,
                            }}
                        >
                            {" "}
                            {progress.percentage}%
                        </div>
                    </div>
                </div>
            )}
            <div className="py-8 px-4">
                <div className="w-full justify-center">
                    {thumb.length > 0 && (
                        <div className="flex min-h-[180px] w-full items-center justify-center rounded-lg ">
                            <div className="flex flex-wrap items-center justify-center gap-3 p-2">
                                {thumb}
                            </div>
                        </div>
                    )}
                    {thumb.length > 0 &&
                        (isLoading ? (
                            <div className="flex items-center justify-center">
                                {/* <LoadingSpinner /> */}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-x-3">
                                <button
                                    className="z-10  mt-2 flex  w-[100px] justify-center rounded bg-gray-300 px-2 py-1 text-sm text-gray-700 hover:bg-gray-500 hover:text-gray-900"
                                    type="button"
                                    onClick={() => removeAll(0)}
                                >
                                    Clear All
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </Modal>
    );
}
