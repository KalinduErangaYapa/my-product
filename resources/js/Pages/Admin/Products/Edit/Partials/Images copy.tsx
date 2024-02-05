import { Product } from "@/types";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useCallback, useEffect } from "react";
// import { useState } from "react";
import { useDropzone } from "react-dropzone";
import useState from "react-usestateref";

export default function Images({ product }: { product: Product }) {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages, imageRef] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles: any) => {
            setImages(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    console.log(product)
    const { data, setData, patch, processing, errors, reset } = useForm({
        images: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(
            route("admin.products.update", {
                product: product.id,
            })
        );
    };

    const thumb = images.map((file: any, i: number) => (
        <div key={file.name} className="relative ">
            <div className=" flex justify-center">
                <img
                    alt={file.name}
                    src={file.preview}
                    width={100}
                    height={100}
                    className="h-[200px] w-[200px] overflow-hidden rounded-lg bg-gray-100"
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
        // mutate();
    };
    const removeAll = useCallback(
        (file: any) => {
            const newFiles = [...images]; // make a var for the new array
            newFiles.splice(file); // remove the file from the array
            setImages(newFiles); // update the state
            // mutate();
        },
        [images, setImages]
    );
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () =>
            images.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, [images]);
    return (
        <div className="bg-white shadow-card rounded-xl p-8 space-y-6">
            {" "}
            <form onSubmit={submit}>
                {/* // onSubmit={handleSubmit(onSubmit)}> */}
                <div className="grid grid-cols-3 gap-4 divide-gray-200">
                    <div className="col-span-3 rounded-md bg-white shadow">
                        <div className="rounded-md bg-white p-5 pt-8">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Vehicle Images
                                </h3>
                            </div>
                            <div className="mt-6 grid grid-cols-6 gap-x-4 gap-y-6 ">
                                <div className="col-span-6 ">
                                    <div className="flex  flex-wrap sm:justify-between">
                                        <label
                                            htmlFor="title"
                                            className=" flex items-center text-sm font-medium text-gray-700"
                                        >
                                            Vehicle Image Gallery
                                        </label>
                                    </div>
                                    {/* {data?.vehicleImage.length > 0 && ( */}
                                    <div className="grid grid-cols-5 gap-x-2 gap-y-5 rounded-md border border-dashed p-5">
                                        {/* {data?.vehicleImage?.map(
                                                    (
                                                        vehicleImage: any,
                                                        index: any
                                                    ) => ( */}
                                        <div
                                            // key={index}
                                            className="relative "
                                        >
                                            <div className=" col-span-1 flex justify-center rounded-md border border-gray-300">
                                                <img
                                                    src={"vehicleImage?.image"}
                                                    alt="product_image"
                                                    width={150}
                                                    height={150}
                                                    className="rounded-md "
                                                />
                                            </div>
                                            <div className="absolute right-0 top-[-5px] text-right ">
                                                <div className="relative  inline-block text-left">
                                                    <button
                                                        // onClick={() =>
                                                        //     remove(
                                                        //         i
                                                        //     )
                                                        // }
                                                        className={
                                                            "inline-flex  w-full justify-center rounded-full bg-red-300 p-1 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-red-500"
                                                        }
                                                    >
                                                        <XMarkIcon className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* )
                                                )} */}
                                    </div>
                                    {/* )} */}
                                </div>
                                <div className="group col-span-6 mt-6 flex w-full justify-start space-x-2 rounded-lg border-2 border-dashed border-gray-500 p-3 ">
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
                                            className="flex min-h-[180px] w-[250px] cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-200 bg-slate-100 hover:bg-blue-100"
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
                                                            Click to upload
                                                            images
                                                        </span>
                                                        <br /> or
                                                        <br /> drag and drop
                                                        images here
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        (MAX. 20 Mb)
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="w-full justify-center rounded-lg border border-dashed border-gray-200">
                                        {thumb.length === 0 && (
                                            <div className="flex flex-1 flex-wrap items-center justify-center p-2">
                                                <div className="flex h-full w-full flex-col items-center  justify-center text-center">
                                                    <img
                                                        className="mx-auto w-32"
                                                        src={"noItem"}
                                                        alt="no data"
                                                        width={100}
                                                        height={100}
                                                    />
                                                    <span className="text-small text-gray-500">
                                                        No Waiting Upload Images
                                                    </span>
                                                </div>
                                            </div>
                                        )}
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
                                                        onClick={() =>
                                                            removeAll(0)
                                                        }
                                                    >
                                                        Clear All
                                                    </button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 rounded-b-md border-t bg-gray-50 p-5">
                            {/* {isLoading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <div className="flex h-[50px] justify-end">
                                        <PrimaryButton
                                            onClick={buttonHandler}
                                            type="button"
                                            name="Update"
                                            access="WRITE"
                                        />
                                        <PrimaryButton
                                            onClick={buttonHandler}
                                            type="button"
                                            name="Update & Exit"
                                            access="WRITE"
                                        />
                                    </div>
                                )} */}
                            Buttons
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
