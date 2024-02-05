import SearchInput from "@/Components/elements/inputs/SearchInput";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    ChevronUpIcon,
    PlusIcon,
} from "@heroicons/react/20/solid";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PrimaryLink } from "../buttons/PrimaryButton";
import { SecondaryLink } from "../buttons/SecondaryButton";
import Pagination from "@/Components/shared/Pagination";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function TableBody({
    key,
    children,
    buttons,
}: {
    key: any;
    children: any;
    buttons: any;
}) {
    return (
        <Disclosure as="tbody" className=" bg-white w-full" key={key}>
            {({ open }) => (
                <>
                    <tr key={key + "p"}>
                        <TableTd width={10}>
                            <Disclosure.Button className="w-12 text-gray-900">
                                <span className="flex items-center">
                                    {open ? (
                                        <ChevronDownIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ChevronRightIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </TableTd>
                        {children}
                    </tr>
                    <tr key={key + "c"}>
                        <Disclosure.Panel
                            as="td"
                            colSpan={100}
                            className="whitespace-nowrap bg-gray-50 py-4 pl-4 pr-3 sm:pl-6 "
                        >
                            <span className="flex items-center space-x-4">
                                {buttons}
                            </span>
                        </Disclosure.Panel>
                    </tr>
                </>
            )}
        </Disclosure>
    );
}

export function TableTd({
    children,
    width,
}: {
    children: any;
    width?: number;
}) {
    return (
        <td
            width={width}
            className="whitespace-wrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
        >
            {children}
        </td>
    );
}

export default function MasterTable({
    tableColumns,
    filters,
    url,
    createLink,
    importLink,
    exportLink,
    filterBar = true,
    search,
    links,
    children,
}: {
    tableColumns: any;
    filters: any;
    url: string;
    createLink?: {
        label: string;
        url: string;
    };
    importLink?: {
        label: string;
        url: string;
    };
    exportLink?: {
        label: string;
        url: string;
    };
    search?: {
        placeholder: string;
    };
    filterBar?: boolean;
    links: any;
    children: any;
}) {
    const [searchParam, setSearchParam] = useState(filters.searchParam ?? "");
    const [page, setPage] = useState(filters.page ?? 1);
    const [rowPerPage, setRowPerPage] = useState(filters.perPage ?? 10);
    const [sortBy, setSortBy] = useState(filters.sortBy ?? "name");
    const [sortDirection, setSortDirection] = useState(
        filters.sortDirection ?? "desc"
    );

    function revisitPage(e: any) {
        router.get(
            url,
            {
                page: page,
                rowPerPage: rowPerPage,
                sortBy: sortBy,
                sortDirection: sortDirection,
                searchParam: e.target?.value,
            },
            {
                replace: true,
                preserveState: true,
            }
        );
    }

    const handleOnSort = (column: any, direction: any, e: any) => {
        if (column && direction) {
            setSortBy(column);
            setSortDirection(direction);
            revisitPage(e);
        }
    };

    // const debouncedHandleSearch = useDebouncedCallback(
    //     // function
    //     (value) => {
    //         setSearchParam(value);
    //         setPage(1);
    //         revisitPage();
    //     },
    //     // delay in ms
    //     1000
    // );
    const resetSearch = (e: any) => {
        setSearchParam("");
        setPage(1);
        revisitPage("");
    };

    function tableTh({
        label,
        sortField,
        sortable,
    }: {
        label: string;
        sortField: string;
        sortable: boolean;
    }) {
        return (
            <th
                key={sortField}
                onClick={(e) =>
                    sortable &&
                    handleOnSort(
                        sortField,
                        sortDirection == "asc" ? "desc" : "asc",
                        e,
                    )
                }
                scope="col"
                className={
                    (sortable ? " cursor-pointer " : " cursor-default ") +
                    " py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                }
            >
                <div className="flex">
                    {label}
                    {sortBy == sortField && sortDirection == "asc" && (
                        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                    {sortBy == sortField && sortDirection == "desc" && (
                        <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    )}
                </div>
            </th>
        );
    }

    return (
        <>
            <div className="mt-8 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    {/* Filter */}
                    <div className="bg-white overflow-hidden shadow rounded-lg p-4 flex justify-between space-x-2">
                        <div className="w-2/8 flex self-center">
                            {search && (
                                <SearchInput
                                    id="search"
                                    className="block w-full self-center"
                                    isFocused
                                    value={searchParam}
                                    placeholder={search.placeholder}
                                    resetSearch={resetSearch}
                                    autoComplete="search"
                                    onChange={(e) =>
                                        [revisitPage(e), setSearchParam(e.target.value)]
                                    }
                                />
                            )}
                        </div>
                        <div className="flex space-x-4 self-center">
                            {createLink && (
                                <PrimaryLink
                                    href={createLink.url}
                                    className="self-center"
                                >
                                    <PlusIcon className="text-white w-4 h-4" />
                                    <span className="hidden md:block">
                                        {createLink.label}
                                    </span>
                                </PrimaryLink>
                            )}
                            {/* import */}
                            {/* {importLink && (
                                <SecondaryLink
                                    href={importLink.url}
                                    className="self-center flex space-x-2"
                                >
                                    <ArrowDownIcon className="text-white w-4 h-4" />
                                    <span>{importLink.label}</span>
                                </SecondaryLink>
                            )} */}
                            {/* Export */}
                            {/* {exportLink && (
                                <SecondaryLink
                                    href={exportLink.url}
                                    className="self-center flex space-x-2"
                                >
                                    <ArrowUpIcon className="text-white w-4 h-4" />
                                    <span>{exportLink.label}</span>
                                </SecondaryLink>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {tableColumns.map((column: any) =>
                                            tableTh({
                                                label: column.label,
                                                sortField: column.sortField,
                                                sortable: column.sortable,
                                            })
                                        )}
                                    </tr>
                                </thead>
                                {children}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination links={links} />
        </>
    );
}
