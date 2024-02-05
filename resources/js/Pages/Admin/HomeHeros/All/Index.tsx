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

export default function HomeHeros({
    auth,
    homeHeros,
    filters,
    homeHeroStatus,
}: {
    auth: PageProps;
    homeHeros: any;
    filters: any;
    homeHeroStatus: any;
}) {
    const user: any = auth.user;
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Home Heros",
            hasArrow: true,
            link: route("admin.home-heros.index"),
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
            label: "Title",
            sortField: "title",
            sortable: true,
        },
        {
            label: "Link",
            sortField: "link",
            sortable: true,
        },
        {
            label: "Created AT",
            sortField: "created_at",
            sortable: true,
        },
    ];

    const createLink = {
        url: route("admin.home-heros.create"),
        label: "Create",
    };

    const importLink = {
        url: route("admin.home-heros.create"),
        label: "Import",
    };

    const exportLink = {
        url: route("admin.home-heros.create"),
        label: "Export",
    };

    const search = {
        placeholder: "Search Here",
    };
    console.log(homeHeros);
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="Home Heros" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Home Heros
                    </h2>
                </div>
            </div>

            <div>
                {/* Table */}
                <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.home-heros.index")}
                    createLink={createLink}
                    importLink={importLink}
                    exportLink={exportLink}
                    search={search}
                    links={homeHeros.meta.links}
                >
                    {homeHeros?.data?.map((homeHero: any) => (
                        <TableBody
                            buttons={
                                <>
                                    <PrimaryLink
                                        className="!py-2 "
                                        href={route("admin.home-heros.edit", {
                                            home_hero: homeHero.id,
                                        })}
                                    >
                                        <PencilIcon className="w-3 h-3 mr-2" />{" "}
                                        {"Edit"}
                                    </PrimaryLink>
                                    <ConfirmButton
                                        className="!py-2"
                                        url={route("admin.home-heros.destroy", {
                                            home_hero: homeHero.id,
                                        })}
                                        label="Delete"
                                    />
                                </>
                            }
                            key={homeHero.id}
                        >
                            <TableTd>{homeHero.id}</TableTd>
                            <TableTd>
                                <img
                                    src={homeHero?.image}
                                    className="w-12 h-12 border border-gray-400 object-cover "
                                    alt={homeHero?.title}
                                />
                            </TableTd>
                            <TableTd>{homeHero?.title}</TableTd>
                            <TableTd>{homeHero?.link ?? "-"}</TableTd>
                            <TableTd>{homeHero?.created_at}</TableTd>
                        </TableBody>
                    ))}
                </MasterTable>
            </div>
        </Authenticated>
    );
}
