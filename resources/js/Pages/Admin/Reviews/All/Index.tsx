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
import { Rating } from "react-simple-star-rating";

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

export default function Reviews({
    auth,
    reviews,
    filters,
    reviewStatus,
}: {
    auth: PageProps;
    reviews: any;
    filters: any;
    reviewStatus: any;
}) {
    const user: any = auth.user;
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
    ];

    const tableColumns = [
        {
            label: "",
            sortField: "",
            sortable: false,
        },
        {
            label: "ID",
            sortField: "id",
            sortable: true,
        },
        {
            label: "Image",
            sortField: "image",
            sortable: true,
        },
        {
            label: "Name",
            sortField: "name",
            sortable: true,
        },
        {
            label: "Rating",
            sortField: "rate",
            sortable: true,
        },
        {
            label: "Status",
            sortField: "status",
            sortable: true,
        },
        {
            label: "Created AT",
            sortField: "created_at",
            sortable: true,
        },
    ];

    const createLink = {
        url: route("admin.reviews.create"),
        label: "Create",
    };

    const importLink = {
        url: route("admin.reviews.create"),
        label: "Import",
    };

    const exportLink = {
        url: route("admin.reviews.create"),
        label: "Export",
    };

    const search = {
        placeholder: "Search Here",
    };

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Categories" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Reviews
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.reviews.index")}
                    createLink={createLink}
                    importLink={importLink}
                    exportLink={exportLink}
                    search={search}
                    links={reviews.meta.links}
                >
                    {reviews.data.map((review: any) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.reviews.edit", {
                                            review: review.id,
                                        })}
                                    >
                                        <PencilIcon className="w-3 h-3 mr-2" />{" "}
                                        {"Edit"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.reviews.destroy", {
                                            review: review.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={review.id}
                        >
                            <TableTd>{review.id}</TableTd>
                            <TableTd>
                                <img
                                    src={review?.image}
                                    className="w-12 h-12 rounded-full border border-primary object-cover "
                                    alt={review?.name}
                                />
                            </TableTd>
                            <TableTd>{review?.name}</TableTd>
                            <TableTd>
                                <Rating
                                    initialValue={review.rate}
                                    readonly
                                    transition
                                    allowFraction
                                    showTooltip
                                    // tooltipArray={tooltipArray}
                                    fillColorArray={fillColorArray}
                                    iconsCount={5}
                                    size={20}
                                    emptyStyle={{ display: "flex" }}
                                    fillStyle={{
                                        display: "-webkit-inline-box",
                                    }}
                                />
                            </TableTd>
                            <TableTd>{review?.status}</TableTd>
                            <TableTd>{review?.created_at}</TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
