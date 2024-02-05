import { FormEventHandler } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, router, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";

export default function EditBookings({
    booking,
    type,
    bookingStatus,
}: {
    booking: any;
    type: string;
    bookingStatus: { label: string; value: string }[];
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Bookings",
            hasArrow: true,
            link: route("admin.bookings.index"),
        },
        {
            name: "View",
            hasArrow: true,
            link: "",
        },
    ];

    const { data, setData, post, errors, patch } = useForm({
        status: booking?.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(
            route("admin.bookings.update", {
                booking: booking?.id,
            })
        );
    };

    const title = type === "create" ? "Create Booking" : "Edit Booking";
    console.log(data)
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title={title} />
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Booking
                    </h2>
                </div>
            </div>
            <form onSubmit={submit} className="grid grid-cols-3 gap-8">
                <div className="sm:col-span-2 col-span-4">
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <h3 className=" text-xl mb-8 font-medium leading-6 text-gray-900">
                                Booking Details
                            </h3>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-6  sm:grid-cols-6">
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold"> Customer Name:</div>
                                    <div>{booking?.customer_name}</div>
                                </div>
                            </div>
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold"> Customer Email:</div>
                                    <div>{booking?.email}</div>
                                </div>
                            </div>
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold"> Customer Phone Number:</div>
                                    <div>{booking?.phone_number}</div>
                                </div>
                            </div>
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold"> Service Name:</div>
                                    <div>{booking?.product?.name}</div>
                                </div>
                            </div>
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold"> Device Name:</div>
                                    <div>{booking?.device?.name}</div>
                                </div>
                            </div>
                            {/**message */}
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold"> Customer Message:</div>
                                    <div>{booking?.message}</div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-3">
                                <InputLabel htmlFor="status" value="Status:" />
                                <SelectInput
                                    className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm"
                                    options={bookingStatus}
                                    selectedOption={bookingStatus.filter(
                                        (obj: any) => obj.value === data.status
                                    )}
                                    setData={(e: any) => setData("status", e)}
                                />
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <PrimaryButton type="submit">Save</PrimaryButton>
                    </div>
                </div>
            </form>

        </Authenticated>
    )
}
