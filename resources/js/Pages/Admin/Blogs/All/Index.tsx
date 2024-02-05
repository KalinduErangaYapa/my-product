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
    blogs,
    filters,
}: {
    auth: PageProps;
    blogs: any;
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
            name: "Blogs",
            hasArrow: true,
            link: route("admin.blogs.index"),
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
            sortField: "name",
            sortable: false,
        },
        {
            label: "Title",
            sortField: "title",
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
        url: route("admin.blogs.create"),
        label: "Create",
    };

    const importLink = {
        url: route("admin.blogs.create"),
        label: "Import",
    };

    const exportLink = {
        url: route("admin.blogs.create"),
        label: "Export",
    };

    const search = {
        placeholder: "Search Here",
    };

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Blogs" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Blogs
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.blogs.index")}
                    createLink={createLink}
                    importLink={importLink}
                    exportLink={exportLink}
                    search={search}
                    links={blogs.meta.links}
                >
                    {blogs.data.map((blog: any) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.blogs.edit", {
                                            blog: blog.id,
                                        })}
                                    >
                                        <PencilIcon className="w-3 h-3 mr-2" />{" "}
                                        {"Edit"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.blogs.destroy", {
                                            blog: blog.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={blog.id}
                        >
                            <TableTd>{blog.id}</TableTd>
                            <TableTd>
                                <div className="flex">
                                    <img
                                        src={blog.image_url}
                                        className="w-12 h-12 object-contain mr-2 rounded-xl"
                                    />
                                </div>
                            </TableTd>
                            <TableTd>
                                <div className="flex">
                                        {blog?.title}
                                </div>
                            </TableTd>
                             <TableTd>{blog.status}</TableTd>
                            <TableTd>{blog.created_at_human}</TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
