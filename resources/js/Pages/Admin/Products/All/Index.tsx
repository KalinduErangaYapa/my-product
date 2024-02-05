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
    products,
    filters,
    utility,
}: {
    products: any;
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
            name: "Services",
            hasArrow: true,
            link: route("admin.services.index"),
        },
    ];

    const tableColumns = [
        {
            label: "",
            sortField: "",
            sortable: false,
        },
        {
            label: "Service",
            sortField: "name",
            sortable: true,
        },
        // {
        //     label: "Category",
        //     sortField: "category_id",
        //     sortable: true,
        // },
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
        url: route("admin.services.create"),
        label: "Create",
    };

    const search = {
        placeholder: "Search Here",
    };

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Services" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Services
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.services.index")}
                    createLink={createLink}
                    search={search}
                    links={products.meta.links}
                >
                    {products.data.map((product: any, index: number) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.services.edit", {
                                            service: product.id,
                                        })}
                                    >
                                        <PencilIcon className="w-3 h-3 mr-2" />{" "}
                                        {"Edit"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.services.destroy", {
                                            service: product.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={product.id + "" + index}
                        >
                            <TableTd>
                                <div className="flex">
                                    <img
                                        src={product.icon_url}
                                        className="w-12 h-12 object-contain mr-2 rounded-xl"
                                    />
                                    <Link
                                        href={route("admin.services.edit", {
                                            service: product.id,
                                        })}
                                        className="self-center text-blue-600 font-[700]"
                                    >
                                        {product?.name}
                                    </Link>
                                </div>
                            </TableTd>
                            {/* <TableTd>
                                {product?.category ? (
                                    <Link
                                        href={route("admin.categories.edit", {
                                            category: product?.category?.id,
                                        })}
                                        className="self-center text-blue-600 font-[700]"
                                    >
                                        {product?.category?.name}
                                    </Link>
                                ) : (
                                    "-"
                                )}
                            </TableTd> */}
                            {/* <TableTd width={120}>
                                <small>{product?.is_featured}</small>
                            </TableTd> */}
                            <TableTd width={180}>
                                <small>{product?.created_at_human}</small>
                            </TableTd>
                            <TableTd width={180}>
                                <small>{product?.updated_at_human}</small>
                            </TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
