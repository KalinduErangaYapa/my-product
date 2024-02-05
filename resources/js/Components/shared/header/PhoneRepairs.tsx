import { Popover, Transition } from "@headlessui/react";
import {
    ArrowLongRightIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
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

export default function PhoneRepairs() {
    const { url, props }: any = usePage();
    return (
        <>
            <Popover className="relative self-center">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold focus:outline-none leading-6 text-slate-300 hover:text-white">
                    Phone Repairs
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
                            {props.services?.map((service: any) => (
                                <Link
                                    href={route(
                                        "services.filter.show",
                                        service.slug
                                    )}
                                    key={service?.name}
                                    className="group relative flex items-center gap-x-6 px-6 py-2 text-sm leading-6 hover:bg-slate-100 "
                                >
                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                                        <img
                                            src={service?.icon_url}
                                            className="h-[auto] w-11 rounded-lg"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="flex-auto z-50">
                                        <span className="block font-semibold text-slate-800 group-hover:text-black">
                                            {service.name}
                                            <span className="absolute inset-0" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className=" bg-slate-900 py-4">
                            <Link
                                href={route("services.filter")}
                                className="flex px-6 gap-x-2.5  text-sm font-semibold leading-6 text-gray-50 "
                            >
                                <ArrowLongRightIcon
                                    className="h-5 w-5 flex-none "
                                    aria-hidden="true"
                                />
                                All Services
                            </Link>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </>
    );
}
