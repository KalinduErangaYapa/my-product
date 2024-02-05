import { FormEventHandler, useCallback, useEffect, useState } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { HomeHero } from "@/types";
import Breadcrumbs from "@/Components/elements/header/BreadCumbs";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";
import { useDropzone } from "react-dropzone";

export default function CreateHomeHero({
    homeHero,
    type,
    homeHeroStatus,
}: {
    homeHero: HomeHero;
    type: string;
    homeHeroStatus: { label: string; value: string }[];
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Home Heros",
            hasArrow: true,
            link: route("admin.home-heros.index"),
        },
        {
            name: `${type == "create" ? "Create" : "Edit"}`,
            hasArrow: true,
            link: "",
        },
    ];
    const { data, setData, post, progress, errors, reset } = useForm({
        title: homeHero.title,
        sub_title: homeHero.sub_title,
        intro: homeHero.intro,
        link: homeHero.link ?? "/",
        color: homeHero.color ?? "#000000",
        status: homeHero.status,
        image: homeHero.image,
        mobile_image: homeHero.mobile_image,
    });
    const [canCleanImage, setCanCleanImage] = useState(false);
    const [canCleanMobileImage, setCanCleanMobileImage] = useState(false);
    const [images, setImages] = useState([]);
    const [mobileImages, setMobileImages] = useState([]);
    const {
        getRootProps: getRootDesktopProps,
        getInputProps: getInputDesktopProps,
    } = useDropzone({
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
    });

    const {
        getRootProps: getRootMobileProps,
        getInputProps: getInputMobileProps,
    } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles: any) => {
            setMobileImages(
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
            setCanCleanMobileImage(true);
            setData(
                "mobile_image",
                acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )[0]
            );
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
    const mobileThumb = mobileImages.map((file: any) => (
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
    const removeMobile = (file: any) => {
        const newMobileImages = [...mobileImages];
        newMobileImages.splice(file, 1);
        setMobileImages(newMobileImages);
        setCanCleanMobileImage(false);
    };

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => {
            images.forEach((file: any) => URL.revokeObjectURL(file.preview)),
                mobileImages.forEach((file: any) =>
                    URL.revokeObjectURL(file.preview)
                );
        };
    }, [images, mobileImages]);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            route("admin.home-heros.info.update", {
                home_hero: homeHero.id,
            })
        );
    };

    const title = type == "create" ? "Create Home Hero" : "Edit Home Hero";

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
            <form
                onSubmit={submit}
                className=" grid lg:grid-cols-3 grid-cols-4 gap-8"
            >
                <div className="lg:col-span-3 col-span-4 flex">
                    <PrimaryButton className="ml-auto" type="submit">
                        Save & Submit
                    </PrimaryButton>
                </div>
                <div className="sm:col-span-2 col-span-4 space-y-6">
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
                        {/* <div>
                            <InputLabel htmlFor="sub_title" value="Sub Title" />

                            <TextInput
                                id="sub_title"
                                name="sub_title"
                                type="text"
                                value={data.sub_title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("sub_title", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.sub_title}
                                className="mt-2"
                            />
                        </div> */}
                        <div>
                            <InputLabel htmlFor="intro" value="Introduction" />

                            <TextArea
                                id="intro"
                                name="intro"
                                value={data.intro}
                                className="mt-1 block w-full"
                                isFocused={true}
                                rows={5}
                                onChange={(e) =>
                                    setData("intro", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.intro}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            {/* Image */}
                            <InputLabel
                                htmlFor="background_image"
                                value="Background Image"
                            />
                            <div className="mt-2 grid justify-center rounded-xl border-2 border-dashed px-6 py-2 w-full ">
                                <div className="relative flex items-center h-full w-full min-h-[200px] ">
                                    <div
                                        {...getRootDesktopProps({
                                            className: "dropzone",
                                        })}
                                        className=" object-cover h-full w-full min-h-[200px] cursor-pointer flex rounded-xl bg-slate-200"
                                    >
                                        <input
                                            type="file"
                                            {...getInputDesktopProps()}
                                        />
                                        {images.length > 0 ? (
                                            thumb
                                        ) : homeHero?.image ? (
                                            <img
                                                src={homeHero.image_url ?? ""}
                                                alt={homeHero.title ?? ""}
                                                className="h-full w-full min-h-[200px] flex overflow-hidden  rounded-xl bg-gray-50"
                                            />
                                        ) : (
                                            <span className="mx-auto  left-4 right-4 absolute self-center grid text-center text-gray-900">
                                                Upload Image
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
                                <InputError message={errors?.image} />
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
                                options={homeHeroStatus}
                                selectedOption={homeHeroStatus.filter(
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
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="link" value="Redirect Link" />
                            <TextInput
                                id="link"
                                name="link"
                                type="text"
                                value={data.link}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("link", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.link}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {/* <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="color"
                                value="Background Color"
                            />
                            <div className="flex items-center ">
                                <TextInput
                                    id="color"
                                    name="color"
                                    type="color"
                                    value={data.color}
                                    className="mt-1 block w-1/5 h-10 mr-1 cursor-pointer rounded-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("color", e.target.value)
                                    }
                                />
                                <TextInput
                                    id="color"
                                    name="color"
                                    type="text"
                                    value={data.color}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("color", e.target.value)
                                    }
                                />
                            </div>
                            <InputError
                                message={errors.color}
                                className="mt-2"
                            />
                        </div>
                    </div> */}
                    {/* <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="item_image"
                                value="Item Image"
                            />
                            <div className="mt-2 grid grid-flow-row justify-center rounded-xl border-2 border-dashed px-6 py-2 ">
                                <div className="relative flex items-center h-full ">
                                    <div
                                        {...getRootMobileProps({
                                            className: "dropzone",
                                        })}
                                        className="min-h-[200px] object-cover h-full w-full cursor-pointer flex rounded-xl bg-slate-200"
                                    >
                                        <input
                                            type="file"
                                            {...getInputMobileProps()}
                                        />
                                        {mobileImages.length > 0 ? (
                                            mobileThumb
                                        ) : homeHero?.mobile_image ? (
                                            <img
                                                src={
                                                    homeHero.mobile_image_url ??
                                                    ""
                                                }
                                                alt={homeHero.title ?? ""}
                                                className="h-[200px] w-full flex overflow-hidden  rounded-xl bg-gray-50"
                                            />
                                        ) : (
                                            <span className="mx-auto  left-4 right-4 absolute self-center grid text-center text-gray-900">
                                                Upload Image
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
                                {canCleanMobileImage && (
                                    <button
                                        className="z-10 mx-auto mt-2 w-[70px] rounded bg-gray-300 py-1 px-2 text-sm text-gray-700 hover:bg-gray-500 hover:text-gray-900"
                                        type="button"
                                        onClick={() => removeMobile(0)}
                                    >
                                        Clean
                                    </button>
                                )}
                                {canCleanMobileImage ? null : (
                                    <div className="ml-3 mt-1 text-xs font-light text-gray-500 text-center">
                                        {" "}
                                        Drag and drop or click to replace
                                    </div>
                                )}
                                <InputError message={errors?.image} />
                            </div>
                        </div>
                    </div> */}
                </div>
            </form>
        </Authenticated>
    );
}
