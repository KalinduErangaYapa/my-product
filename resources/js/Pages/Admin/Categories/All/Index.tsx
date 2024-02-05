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

export default function Departments({
    auth,
    categories,
    filters,
}: {
    auth: PageProps;
    categories: any;
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
            name: "Categories",
            hasArrow: true,
            link: route("admin.categories.index"),
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
            label: "Category",
            sortField: "name",
            sortable: true,
        },
        // {
        //     label: "Parent",
        //     sortField: "parent_id",
        //     sortable: true,
        // },
        {
            label: "Created AT",
            sortField: "created_at",
            sortable: true,
        },
    ];

    const createLink = {
        url: route("admin.categories.create"),
        label: "Create",
    };

    const importLink = {
        url: route("admin.categories.create"),
        label: "Import",
    };

    const exportLink = {
        url: route("admin.categories.create"),
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
                        Categories
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.categories.index")}
                    createLink={createLink}
                    importLink={importLink}
                    exportLink={exportLink}
                    search={search}
                    links={categories.meta.links}
                >
                    {categories.data.map((category: any) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.categories.edit", {
                                            category: category.id,
                                        })}
                                    >
                                        <PencilIcon className="w-3 h-3 mr-2" />{" "}
                                        {"Edit"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.categories.destroy", {
                                            category: category.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={category.id}
                        >
                            <TableTd>{category.id}</TableTd>
                            <TableTd>
                                <div className="flex">
                                    <img
                                        src={category.image_url}
                                        className="w-12 h-12 object-contain mr-2 rounded-xl"
                                    />
                                    <Link
                                        href={route("admin.categories.edit", {
                                            category: category.id,
                                        })}
                                        className="self-center text-blue-600 font-[700]"
                                    >
                                        {category?.name}
                                    </Link>
                                </div>
                            </TableTd>
                            {/* <TableTd>
                                {category.parent ? (
                                    <div className="flex">
                                        <img
                                            src={category.parent.image_url}
                                            className="w-12 h-12 object-contain mr-2 rounded-xl"
                                        />
                                        <Link
                                            href={route(
                                                "admin.categories.edit",
                                                {
                                                    category:
                                                        category.parent.id,
                                                }
                                            )}
                                            className="self-center text-blue-600 font-[700]"
                                        >
                                            {category.parent?.name}
                                        </Link>
                                    </div>
                                ) : (
                                    "-"
                                )}
                            </TableTd> */}
                            <TableTd>{category.created_at_human}</TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
