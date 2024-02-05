import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import MasterTable, {
    TableBody,
    TableTd,
} from "@/Components/elements/tables/masterTable";
import { PrimaryLink } from "@/Components/elements/buttons/PrimaryButton";
import { PencilIcon } from "@heroicons/react/20/solid";
import ConfirmButton from "@/Components/elements/buttons/ConfirmButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Products({
    faqs,
    filters,
    utility,
}: {
    faqs: any;
    filters: any;
    utility: any;
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Faq's",
            hasArrow: true,
            link: route("admin.faq.index"),
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
            label: "Question",
            sortField: "question",
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
        {
            label: "Last Update",
            sortField: "updated_at",
            sortable: true,
        },
    ];

    const createLink = {
        url: route("admin.faq.create"),
        label: "Create",
    };

    const search = {
        placeholder: "Search Here",
    };
console.log(faqs)
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Faq's" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        FAQ's
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.faq.index")}
                    createLink={createLink}
                    search={search}
                    links={faqs.meta.links}
                >
                    {faqs.data.map((faq: any, index: number) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.faq.edit", {
                                            faq: faq.id,
                                        })}
                                    >
                                        <PencilIcon className="w-3 h-3 mr-2" />{" "}
                                        {"Edit"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.faq.destroy", {
                                            faq: faq.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={faq.id + "" + index}
                        >
                            <TableTd>
                               {faq?.id}
                            </TableTd>
                            <TableTd>
                               {faq?.question}
                            </TableTd>
                             <TableTd>
                               {faq?.status}
                            </TableTd>
                            <TableTd width={120}>
                                <small>{faq?.created_at}</small>
                            </TableTd>
                            <TableTd width={120}>
                                <small>{faq?.updated_at}</small>
                            </TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
