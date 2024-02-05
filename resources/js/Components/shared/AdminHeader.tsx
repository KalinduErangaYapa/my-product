import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import { Fragment, ReactNode, useState } from "react";
import Breadcrumbs from "../elements/header/BreadCumbs";
import NavItem from "../elements/header/NavItem";
import NavSingle from "./AdminSidebar/partials/NavSingle";
import { navigationLinks } from "@/lib/SideNavLinks";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const AdminHeader = ({
    user,
    header,
    bRoutes,
}: {
    user: any;
    header?: ReactNode;
    bRoutes: any;
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[101] lg:hidden"
                    onClose={setSidebarOpen}
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
                        <div className="fixed inset-0 bg-slate-900 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-50 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-900 pb-4 pt-5">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <nav
                                    className="mt-5 h-full flex-shrink-0  overflow-y-auto"
                                    aria-label="Sidebar"
                                >
                                    <div className="space-y-1 px-2">
                                        {navigationLinks.map(
                                            (item: any, index: number) => (
                                                <NavItem
                                                    key={item.name + index}
                                                    name={item.name}
                                                    routeName={route(
                                                        item.route
                                                    )}
                                                    startWith={item.startWith}
                                                    icon={item.icon}
                                                    link={item.link}
                                                    border={item.border}
                                                    // children={item.children}
                                                />
                                            )
                                        )}
                                    </div>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="lg:pt-4 lg:mt-0 lg:px-3 relative lg:fixed bg-slate-100 top-0 left-0 right-0 z-50">
                <header className="flex mb-5 z-50 lg:h-[4.3rem] w-full flex-shrink-0 bg-white lg:rounded-xl border shadow-xl  border-gray-200">
                    {/* Search bar */}
                    <div className="grid lg:flex  lg:flex-1 w-full lg:justify-between lg:mx-auto lg:max-w-full lg:px-8">
                        <div className="fixed z-50 bg-white top-0 left-0 right-0 lg:relative lg:top-0 lg:flex lg:flex-1 py-3  w-full lg:divide-x lg:divide-slate-800">
                            <div className="relative w-full px-4 lg:px-0 justify-between lg:w-[210px] flex lg:block lg:justify-start">
                                <img
                                    className="h-[40px] w-[auto] object-contain self-center"
                                    src={"/assets/images/logo.png?z=1"}
                                    alt="site logo"
                                    width={100}
                                    height={50}
                                />
                                <button
                                    type="button"
                                    className=" focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="sr-only">
                                        Open sidebar
                                    </span>
                                    <Bars3CenterLeftIcon
                                        className="h-6 w-6 text-slate-200 self-center"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="hidden lg:flex lg:ml-0 pl-8">
                                <Breadcrumbs routes={bRoutes} />
                            </div>
                        </div>
                        <div className="lg:ml-4 py-4 px-4 lg:py-0 lg:px-0  lg:bg-transparent flex lg:items-center md:ml-6 justify-between">
                            <div className="flex lg:hidden">
                                <Breadcrumbs routes={bRoutes} />
                            </div>
                            <div className="flex">
                                <Menu
                                    as="div"
                                    className="relative ml-3 self-center"
                                >
                                    <div>
                                        <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-transparent group">
                                            <span className="ml-3 text-sm font-medium text-gray-700">
                                                <span className="sr-only">
                                                    Open user menu for{" "}
                                                </span>
                                                <img
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    src="/assets/images/avatars/avatar.png"
                                                />
                                            </span>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="dropdown-menu absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href={route(
                                                            "admin.logout"
                                                        )}
                                                        method={"post"}
                                                        as="button"
                                                        type="button"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block w-full px-4 py-2 text-left text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Logout
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};
export default AdminHeader;
