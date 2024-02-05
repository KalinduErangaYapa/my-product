import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { Fragment } from "react";

const callsToActionRepairs = [
    {
        name: "Apple Repairs",
        href: route("home"),
        image: "/assets/images/home/1.png",
    },
    {
        name: "Samsung Repairs",
        href: route("home"),
        image: "/assets/images/home/2.png",
    },
    {
        name: "Huawei Repairs",
        href: route("home"),
        image: "/assets/images/home/3.png",
    },
    {
        name: "Xiaomi Repairs",
        href: route("home"),
        image: "/assets/images/home/4.png",
    },
    {
        name: "Laptop Repairs",
        href: route("home"),
        image: "/assets/images/home/macbook.png",
    },
];

export default function Prices() {
    const { url, props }: any = usePage();
    return (
        <>
            <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold focus:outline-none leading-6 text-white hover:text-slate-200">
                    Prices
                    <ChevronDownIcon
                        className="h-5 w-5 flex-none"
                        aria-hidden="true"
                    />
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-sm overflow-hidden rounded-xl bg-slate-50 shadow-lg">
                        <div className="divide-y divide-gray-200 overflow-y-auto">
                            {callsToActionRepairs?.map((category: any) => (
                                <div
                                    key={category?.name}
                                    className="group relative flex items-center gap-x-6 p-6 text-sm leading-6 hover:bg-slate-100 "
                                >
                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                                        <img
                                            src={category?.image}
                                            className="h-11 w-11 rounded-lg"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="flex-auto z-50">
                                        <Link
                                            href={
                                                route("services.filter") +
                                                `?categories=${category.slug}`
                                            }
                                            className="block font-semibold text-slate-800 group-hover:text-black"
                                        >
                                            {category.name}
                                            <span className="absolute inset-0" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className=" bg-slate-900 py-4">
                            {callsToActionRepairs.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex px-6 gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-50 hover:bg-slate-50 hover:text-primary"
                                >
                                    <item.icon
                                        className="h-5 w-5 flex-none "
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </div> */}
                    </Popover.Panel>
                </Transition>
            </Popover>
        </>
    );
}
