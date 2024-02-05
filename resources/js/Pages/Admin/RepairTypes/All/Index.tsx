import { Head, Link } from "@inertiajs/react";
import MasterTable, {
    TableBody,
    TableTd,
} from "@/Components/elements/tables/masterTable";
import { PrimaryLink } from "@/Components/elements/buttons/PrimaryButton";
import { PencilIcon } from "@heroicons/react/20/solid";
import ConfirmButton from "@/Components/elements/buttons/ConfirmButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function RepairTypes({

    repairTypes,
    filters,
    utility,
}: {
    repairTypes: any;
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
            name: "Repair Types",
            hasArrow: true,
            link: route("admin.repair-types.index"),
        },
    ];

    const tableColumns = [
        {
            label: "",
            sortField: "",
            sortable: false,
        },
        {
            label: "Repair Type Name",
            sortField: "name",
            sortable: true,
        },
        {
            label: "Created At",
            sortField: "created_at",
            sortable: true,
        },

    ];

    const createLink = {
        url: route("admin.repair-types.create"),
        label: "Create",
    };

    const search = {
        placeholder: "Search Here",
    };
console.log(repairTypes)
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Repair Types" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                       Repair Types
                    </h2>
                </div>
            </div>
            <div>
                {/* Table */}
                <MasterTable
                   tableColumns={tableColumns}
                   filters={filters}
                   url={route("admin.repair-types.index")}
                   createLink={createLink}
                   search={search}
                   links={repairTypes.meta.links}
                >

                        {repairTypes.data.map((repairType: any, index: number ) => (
                          <TableBody
                          buttons={
                            <>
                                <PrimaryLink
                                    className="!py-2 "
                                    href={route("admin.repair-types.edit", {
                                        repair_type: repairType.id,
                                    })}
                                    >
                                         <PencilIcon className="w-3 h-3 mr-2" />{" "}
                                        {"Edit"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.repair-types.destroy", {
                                            repair_type: repairType.id,
                                        })}
                                        label="Delete"
                                        />
                                    </>
                                }
                                key={repairType.id+ "" + index}
                                >

                                    <TableTd>
                                        {repairType?.name}
                                    </TableTd>
                                    <TableTd>
                                        {repairType?.created_at_human}
                                    </TableTd>
                                </TableBody>
                            ))}
                        </MasterTable>
                    </div>
                </Authenticated>
            );
        }
