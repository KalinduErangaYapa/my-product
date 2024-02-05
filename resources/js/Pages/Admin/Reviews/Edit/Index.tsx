import { FormEventHandler, useCallback, useEffect, useState } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Reviews } from "@/types";
import Breadcrumbs from "@/Components/elements/header/BreadCumbs";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";
import { useDropzone } from "react-dropzone";
import { Rating } from "react-simple-star-rating";

export default function CreateReview({
    review,
    products,
    type,
    reviewStatus,
}: {
    review: Reviews;
    products: { label: string; value: string }[];
    type: string;
    reviewStatus: { label: string; value: string }[];
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Reviews",
            hasArrow: true,
            link: route("admin.reviews.index"),
        },
        {
            name: `${type == "create" ? "Create" : "Edit"}`,
            hasArrow: true,
            link: "",
        },
    ];
    const { data, setData, post, progress, errors, reset } = useForm({
        name: review.name == "new review customer" ? "" : review.name,
        company: review.company,
        product_id: review.product_id,
        rate: review.rate ?? 0,
        testimonial: review.testimonial ?? "",
        status: review.status,
        image: review.image,
    });
    const tooltipArray = [
        "Terrible+",
        "Terrible",
        "Bad+",
        "Bad",
        "Average",
        "Average+",
        "Great",
        "Great+",
        "Awesome",
        "Awesome+",
    ];
    const fillColorArray = [
        "#f16a45",
        "#f17a45",
        "#f19745",
        "#f19745",
        "#f1a545",
        "#f1a545",
        "#f1b345",
        "#f1b345",
        "#f1d045",
        "#f1d045",
    ];
    // Catch Rating value
    const handleRating = (rate: number) => {
        setData("rate", rate);
    };
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
            route("admin.reviews.info.update", {
                review: review.id,
            })
        );
    };

    const title = type == "create" ? "Create Review" : "Edit Review";

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
                <div className="sm:col-span-2 col-span-4">
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Customer Name" />
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
                            <InputLabel htmlFor="company" value="Company" />
                            <TextInput
                                id="company"
                                name="company"
                                type="text"
                                value={data.company}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("company", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.company}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="testimonial" value="Message" />
                            <TextArea
                                id="testimonial"
                                name="testimonial"
                                value={data.testimonial}
                                className="mt-1 block w-full"
                                isFocused={true}
                                rows={8}
                                onChange={(e) =>
                                    setData("testimonial", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.testimonial}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-2 col-span-4 lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={reviewStatus}
                                selectedOption={reviewStatus.filter(
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
                            <InputLabel htmlFor="product_id" value="Product" />
                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={products}
                                selectedOption={products.filter((obj: any) => {
                                    return obj.value === data.product_id;
                                })}
                                setData={(e: any) => setData("product_id", e)}
                            />

                            <InputError
                                message={errors.product_id}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="rate" value="Rating" />
                            <div className="mt-1 flex ">
                                <Rating
                                    initialValue={data.rate}
                                    onClick={handleRating}
                                    transition
                                    allowFraction
                                    showTooltip
                                    tooltipArray={tooltipArray}
                                    fillColorArray={fillColorArray}
                                    iconsCount={5}
                                    size={30}
                                    emptyStyle={{ display: "flex" }}
                                    fillStyle={{
                                        display: "-webkit-inline-box",
                                    }}
                                />
                            </div>
                            <InputError
                                message={errors.rate}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            {/* Image */}
                            <InputLabel
                                htmlFor="image"
                                value="Customer Image"
                            />
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
                                        ) : review?.image ? (
                                            <img
                                                src={review.image_url ?? ""}
                                                alt={review.name ?? ""}
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
            </form>
        </Authenticated>
    );
}
