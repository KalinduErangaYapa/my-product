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

export default function NewsLetterSubscribers({

    auth,
    newsLetterSubscribers,
    filters,
}: {
    auth: PageProps;
    newsLetterSubscribers: any;
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
            name: "NewsLetter Subscribers",
            hasArrow: true,
            link: route("admin.news-letter-subscribers.index"),
        },
    ];

    const tableColumns = [
        {
            label: "",
            sortField: "",
            sortable: false,
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
            label: "Created At",
            sortField: "created_at",
            sortable: true,
        },
    ];

    const search = {
        placeholder: "Search Here",
    };

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title="NewsLetter Subscribers" />
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        NewsLetter Subscribers
                    </h2>
                </div>
            </div>
              {/* Table */}
              <MasterTable
                    tableColumns={tableColumns}
                    filters={filters}
                    url={route("admin.news-letter-subscribers.index")}
                    search={search}
                    // createLink={createLink}
                    links={newsLetterSubscribers.meta.links}
                >
                    {newsLetterSubscribers.data.map(
                        (newsLetterSubscriber: any, index: number) => (

                    <TableBody
                       buttons={
                            <>
                                <PrimaryLink
                                    className="!py-2 "
                                    href={route("admin.news-letter-subscribers.edit", {
                                        news_letter_subscriber: newsLetterSubscriber.id,
                                    })}
                                >
                                    <EyeIcon className="w-3 h-3 mr-2" />{" "}
                                    {"View"}
                                </PrimaryLink>
                                <ConfirmButton
                                    className="!py-2"
                                    url={route("admin.news-letter-subscribers.destroy", {
                                        news_letter_subscriber: newsLetterSubscriber.id,
                                    })}
                                    label="Delete"
                                />
                            </>
                        }
                        key={newsLetterSubscriber.id}
                    >
                        <TableTd>{newsLetterSubscriber.email}</TableTd>
                        <TableTd>{newsLetterSubscriber.status}</TableTd>
                        <TableTd>{newsLetterSubscriber.created_at_human}</TableTd>
                    </TableBody>
                ))}
            </MasterTable>
        </Authenticated>
    );
}
