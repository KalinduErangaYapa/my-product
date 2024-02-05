import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import MasterTable, {
    TableBody,
    TableTd,
} from "@/Components/elements/tables/masterTable";
import { PrimaryLink } from "@/Components/elements/buttons/PrimaryButton";
import { PencilIcon } from "@heroicons/react/20/solid";
import ConfirmButton from "@/Components/elements/buttons/ConfirmButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function Bookings({
    auth,
    bookings,
    filters,
}: {
    auth: PageProps;
    bookings: any;
    filters: any;
}) {
    const user: any = auth.user;
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
    ];

    const tableColumns = [
        {
            label: "",
            sortField: "",
            sortable: false,
        },
        {
            label: "Customer Name",
            sortField: "customer_name",
            sortable: true,
        },
        {
            label: "Email",
            sortField: "email",
            sortable: true,
        },
        //phone_number
        {
            label: "Phone Number",
            sortField: "phone_number",
            sortable: true,
        },
        //service_name
        {
            label: "Service Name",
            sortField: "service_id",
            sortable: true,
        },
        //device_name
        {
            label: "Device Name",
            sortField: "device_id",
            sortable: true,
        },
        //status
        {
            label: "Status",
            sortField: "status",
            sortable: true,
        },
        {
            label: "Created At",
            sortField: "created_at",
            sortable: true,
        },
        // {
        //     label: "Updated At",
        //     sortField: "updated_at",
        //     sortable: true,
        // }

    ];

    const search = {
        placeholder: "Search Here",
    };

    //createLink
    // const createLink = {
    //     url: route("admin.bookings.create"),
    //     label: "Create",
    // };

    console.log(bookings)
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Bookings" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Bookings
                    </h2>
                </div>
            </div>
            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.bookings.index")}
                    search={search}
                    // createLink={createLink}
                    links={bookings.meta.links}
                >
                    {bookings.data.map((booking: any, index: number) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.bookings.edit", {
                                            booking: booking.id,
                                        })}
                                    >
                                        <EyeIcon className="w-3 h-3 mr-2" />{" "}
                                        {"View"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.bookings.destroy", {
                                            booking: booking.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={booking.id + "" + index}
                        >
                            <TableTd>{booking?.customer_name}</TableTd>
                            <TableTd>{booking?.email}</TableTd>
                            <TableTd>{booking?.phone_number}</TableTd>
                            <TableTd>{booking?.product?.name}</TableTd>
                            <TableTd>{booking?.device?.name}</TableTd>
                            <TableTd>{booking?.status}</TableTd>
                            <TableTd>{booking?.created_at_human}</TableTd>
                            {/* <TableTd>{booking.updated_at_human}</TableTd> */}

                        </TableBody>
                    ))}

                </MasterTable>
            </div>
        </Authenticated>
    )
}
