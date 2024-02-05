import { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import Product from "./Partials/Service";
import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import useStateRef from "react-usestateref";
import removeValueFromArray from "@/lib/utility";
import SimplePagination from "@/Components/elements/pagination/paginate";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}
const routes = [
    {
        name: "Our Services",
        hasArrow: true,
        link: route("services.filter"),
    },
];

export default function OurProducts({
    categories,
    products,
    filters,
    utility,
    selectedCategory,
}: {
    categories: any;
    products: any;
    filters: any;
    utility: any;
    selectedCategory: any;
}) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const queryParameters = new URLSearchParams(window.location.href);
    const categoryType = queryParameters.get("categories");
    const [searchParam, setSearchParam] = useState(filters.searchParam ?? "");
    const [page, setPage] = useState<number>(filters.page ?? 1);
    const [rowPerPage, setRowPerPage] = useState<number>(filters.perPage ?? 12);
    const [sortBy, setSortBy, sortByRef] = useStateRef(
        filters.sortBy ?? "created_at"
    );
    const [sortDirection, setSortDirection, sortDirectionRef] = useStateRef(
        filters.sortDirection ?? "desc"
    );
    const [filterCategories, setFilterCategories, filterCategoriesRef] =
        useStateRef(filters.categories ? filters.categories : categoryType);

    const handleSearch = (event: any) => {
        router.visit("/products", {
            method: "get",
            data: {
                page: event + 1,
                rowPerPage: rowPerPage,
                sortBy: sortByRef.current,
                sortDirection: sortDirectionRef.current,
                searchParam: searchParam,
                categories: filterCategoriesRef.current,
            },
            preserveState: true,
            preserveScroll: true,
            only: ["products"],
        });
    };

    const handlePageClick = (event: any) => {
        setPage(event.selected + 1);
        handleSearch(event.selected);
    };

    function revisitPage() {
        router.get(
            route("services.filter"),
            {
                page: page,
                rowPerPage: rowPerPage,
                sortBy: sortByRef.current,
                sortDirection: sortDirectionRef.current,
                searchParam: searchParam,
                categories: filterCategoriesRef.current,
            },
            {
                replace: true,
                preserveState: true,
            }
        );
    }

    function setCategories(checked: boolean, value: string) {
        // let array = filterCategories.split(",");
        // switch (checked) {
        //     case true:
        //         !array.includes(value) && array.push(value);
        //         break;
        //     case true:
        //         console.log('true')
        //         array.includes(value) &&
        //             (array = removeValueFromArray(array, value));
        //         break;
        // }
        // // remove empty item from array is exists
        // array.includes("") && (array = removeValueFromArray(array, ""));
        // // convert array ti string.
        // setFilterCategories(array.toString());
        // //
        // revisitPage();
        if (checked) {
            setFilterCategories([value]);
            setFilterCategories(value.toString());
            revisitPage();
        } else {
            setFilterCategories(
                filterCategories.filter((category: any) => category !== value)
            );
            setFilterCategories(value.toString());
            revisitPage();
        }
    }

    return (
        <AppLayout>
            <Head>
                <title>Our Services</title>
                <meta
                    name="description"
                    content="Explore Delifina's exquisite range of food products, meticulously crafted for an unparalleled culinary experience worldwide."
                    data-react-helmet="true"
                />

                <meta
                    property="og:title"
                    content="Our Products"
                    data-react-helmet="true"
                />

                <meta
                    property="og:type"
                    content="website"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image"
                    content="/assets/images/about2.jpeg"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:type"
                    content="image/png"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:width"
                    content="1200"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:height"
                    content="630"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:alt"
                    content="Delifina Logo"
                    data-react-helmet="true"
                />
            </Head>
            <div className="bg-white mt-[160px]">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-40 lg:hidden"
                            onClose={setMobileFiltersOpen}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">
                                                Filters
                                            </h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                                                onClick={() =>
                                                    setMobileFiltersOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close menu
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        <form className="mt-4">
                                            <Disclosure
                                                as="div"
                                                className="border-t border-gray-200 pb-4 pt-4"
                                            >
                                                {({ open }) => (
                                                    <fieldset>
                                                        <legend className="w-full px-2">
                                                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                                                <span className="text-sm font-medium text-gray-900">
                                                                    Find your
                                                                    favourites
                                                                </span>
                                                                <span className="ml-6 flex h-7 items-center">
                                                                    <ChevronDownIcon
                                                                        className={classNames(
                                                                            open
                                                                                ? "-rotate-180"
                                                                                : "rotate-0",
                                                                            "h-5 w-5 transform"
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Disclosure.Button>
                                                        </legend>
                                                        <Disclosure.Panel className="px-4 pb-2 pt-4">
                                                            <div className="space-y-6">
                                                                {categories.map(
                                                                    (
                                                                        category: any,
                                                                        optionIdx: number
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                category.slug
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`categories-${optionIdx}-mobile`}
                                                                                name={`category[]`}
                                                                                checked={filterCategories.includes(
                                                                                    category.slug
                                                                                )}
                                                                                onChange={(
                                                                                    e
                                                                                ) => [
                                                                                    setPage(
                                                                                        1
                                                                                    ),
                                                                                    setCategories(
                                                                                        e
                                                                                            .target
                                                                                            .checked,
                                                                                        category.slug
                                                                                    ),
                                                                                ]}
                                                                                type="checkbox"
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`categories-${optionIdx}-mobile`}
                                                                                className="ml-3 text-sm text-gray-600"
                                                                            >
                                                                                {
                                                                                    category.name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </fieldset>
                                                )}
                                            </Disclosure>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                    <div className="relative bg-gray-200">
                        <div className="absolute inset-0">
                            <img
                                className="h-full w-full object-cover"
                                src="/assets/images/products/about2.jpeg"
                                alt=""
                            />
                            <div
                                className="absolute inset-0 bg-gray-900/70 mix-blend-multiply"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="relative mx-auto container px-6 py-24 sm:py-32 lg:px-0">
                            <h1 className="text-4xl mb-2 font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Our Services
                            </h1>
                            <BreadCumbsPublic routes={routes} />
                        </div>
                    </div>
                    <div className="container mx-auto sm:py-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 min-h-[80vh]">
                        <aside className="px-4 sm:px-0 bg-gray-100 lg:bg-transparent py-4">
                            <h2 className="sr-only">Filters</h2>

                            <button
                                type="button"
                                className="inline-flex items-center lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="text-lg font-medium text-gray-700">
                                    Filters
                                </span>
                                <PlusIcon
                                    className="ml-1 h-8 w-8 flex-shrink-0 text-gray-200 bg-gray-800 px-2 py-2 rounded-md"
                                    aria-hidden="true"
                                />
                            </button>

                            <div className="hidden lg:block bg-white shadow px-4 py-8 rounded-xl">
                                <form className="space-y-10 divide-y divide-gray-200">
                                    <div>
                                        <fieldset>
                                            <legend className="block text-sm font-medium text-gray-900">
                                                Find your favourites
                                            </legend>
                                            <div className="space-y-3 pt-6">
                                                {categories?.map(
                                                    (
                                                        category: any,
                                                        optionIdx: number
                                                    ) => (
                                                        <div
                                                            key={category?.slug}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                id={`category-${optionIdx}`}
                                                                name={`category[]`}
                                                                checked={filterCategories?.includes(
                                                                    category?.slug
                                                                )}
                                                                // onClick={(e) =>
                                                                //     getCategory(
                                                                //         category
                                                                //     )
                                                                // }
                                                                onChange={(
                                                                    e
                                                                ) => [
                                                                    setPage(1),
                                                                    setCategories(
                                                                        e.target
                                                                            .checked,
                                                                        category.slug
                                                                    ),
                                                                ]}
                                                                type="radio"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`category-${optionIdx}`}
                                                                className="ml-3 text-sm text-gray-600"
                                                            >
                                                                {category.name}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </fieldset>
                                    </div>
                                </form>
                            </div>
                        </aside>

                        {/* Product grid */}
                        <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                            {/* Your content */}
                            <div className="bg-white">
                                <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <h2 className="sr-only">Products</h2>
                                    {selectedCategory &&
                                        selectedCategory?.length > 0 && (
                                            <div className="grid grid-cols-4 my-5 border p-3 gap-x-3 w-full rounded-lg">
                                                <div className="col-span-4 mx-auto md:col-span-1 min-h-[150px] max-w-[180px] bg-yellow-100 rounded-lg">
                                                    <img
                                                        src={
                                                            selectedCategory[0]
                                                                ?.image_url
                                                        }
                                                        alt={
                                                            selectedCategory[0]
                                                                ?.name
                                                        }
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-3">
                                                    <h1 className="text-xl font-bold text-gray-800">
                                                        {
                                                            selectedCategory[0]
                                                                ?.name
                                                        }
                                                    </h1>
                                                    <h5 className="text-gray-700 mt-1">
                                                        {
                                                            selectedCategory[0]
                                                                ?.description
                                                        }
                                                    </h5>
                                                </div>
                                            </div>
                                        )}

                                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                                        {products.data.map((product: any) => (
                                            <Product
                                                product={product}
                                                utility={utility}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-[50px] md:mt-[80px] card">
                                        <SimplePagination
                                            total={products?.meta?.total}
                                            perPage={filters?.rowPerPage}
                                            page={filters?.page}
                                            handlePageClick={handlePageClick}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <Inquiry />
        </AppLayout>
    );
}
