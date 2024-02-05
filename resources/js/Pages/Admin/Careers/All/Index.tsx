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

export default function Careers({
    auth,
    careers,
    filters,
}: {
    auth: PageProps;
    careers: any;
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
            name: "Careers",
            hasArrow: true,
            link: route("admin.careers.index"),
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
            label: "First Name",
            sortField: "first_name",
            sortable: true,
        },
        {
            label: "Last Name",
            sortField: "last_name",
            sortable: true,
        },
        {
            label: "Email",
            sortField: "email",
            sortable: true,
        },
        {
            label: "Phone",
            sortField: "phone",
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

    // const viewLink = {
    //     url: route("admin.careers.create"),
    //     label: "Create",
    // };

    // const importLink = {
    //     url: route("admin.inquiries.create"),
    //     label: "Import",
    // };

    const exportLink = {
        url: route("admin.inquiries.create"),
        label: "Export",
    };

    const search = {
        placeholder: "Search Here",
    };

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Careers" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Careers
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.careers.index")}
                    // createLink={viewLink}
                    // importLink={importLink}
                    exportLink={exportLink}
                    search={search}
                    links={careers.meta.links}
                >
                    {careers.data.map((career: any) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.careers.edit", {
                                            id: career.id,
                                        })}
                                    >
                                        <EyeIcon className="w-3 h-3 mr-2" />{" "}
                                        {"View"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.careers.destroy", {
                                            id: career.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={career.id}
                        >
                            <TableTd>{career.id}</TableTd>
                            <TableTd>{career.first_name}</TableTd>
                            <TableTd>{career.last_name}</TableTd>
                            <TableTd>{career.email}</TableTd>
                            <TableTd>{career.phone}</TableTd>
                            <TableTd>{career.status}</TableTd>
                            <TableTd>{career.created_at}</TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
