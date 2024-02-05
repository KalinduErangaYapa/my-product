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

export default function Inquiries({
    auth,
    inquiries,
    filters,
}: {
    auth: PageProps;
    inquiries: any;
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
            name: "Inquiries",
            hasArrow: true,
            link: route("admin.inquiries.index"),
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
            label: "Name",
            sortField: "name",
            sortable: true,
        },
        {
            label: "Type",
            sortField: "type",
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
        url: route("admin.inquiries.create"),
        label: "Create",
    };

    const importLink = {
        url: route("admin.inquiries.create"),
        label: "Import",
    };

    const exportLink = {
        url: route("admin.inquiries.create"),
        label: "Export",
    };

    const search = {
        placeholder: "Search Here",
    };

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Inquiries" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Inquiries
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.inquiries.index")}
                    // createLink={createLink}
                    importLink={importLink}
                    exportLink={exportLink}
                    search={search}
                    links={inquiries.meta.links}
                >
                    {inquiries.data.map((inquiry: any) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.inquiries.edit", {
                                            id: inquiry.id,
                                        })}
                                    >
                                        <EyeIcon className="w-3 h-3 mr-2" />{" "}
                                        {"View"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.inquiries.destroy", {
                                            id: inquiry.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={inquiry.id}
                        >
                            <TableTd>{inquiry.id}</TableTd>
                            <TableTd>{inquiry.name}</TableTd>
                            <TableTd>
                                {inquiry.type === "inquiry"
                                    ? "Inquiry"
                                    : "Quotation"}
                            </TableTd>
                            <TableTd>
                                <span className="capitalize">
                                    {inquiry.status}
                                </span>
                            </TableTd>
                            <TableTd>{inquiry.created_at}</TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
