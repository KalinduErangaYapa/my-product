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

export default function ContactUs({
    auth,
    contactUs,
    filters,
}: {
    auth: PageProps;
    contactUs: any;
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
            name: "Contact Us",
            hasArrow: true,
            link: route("admin.contact-us.index"),
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
            label: "Email",
            sortField: "email",
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

    // const exportLink = {
    //     url: route("admin.inquiries.create"),
    //     label: "Export",
    // };

    const search = {
        placeholder: "Search Here",
    };

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Careers" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Contact Us
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.contact-us.index")}
                    // createLink={viewLink}
                    // importLink={importLink}
                    // exportLink={exportLink}
                    search={search}
                    links={contactUs.meta.links}
                >
                    {contactUs.data.map((contact: any) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.contact-us.edit", {
                                            id: contact.id,
                                        })}
                                    >
                                        <EyeIcon className="w-3 h-3 mr-2" />{" "}
                                        {"View"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.contact-us.destroy", {
                                            id: contact.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={contact.id}
                        >
                            <TableTd>{contact.id}</TableTd>
                            <TableTd>{contact.name}</TableTd>
                            <TableTd>{contact.email}</TableTd>
                            <TableTd>{contact.status}</TableTd>
                            <TableTd>{contact.created_at_human}</TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
