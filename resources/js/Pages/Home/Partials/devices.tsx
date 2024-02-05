import { Link, usePage } from "@inertiajs/react";

export default function Devices({ featuredServices }: any) {
    return (
        <section className="bg-gray-100">
            <div className="grid grid-cols-3 md:grid-cols-7 text-center justify-center divide-x divide-y">
                {featuredServices?.map((service: any, index: number) => (
                    <Link
                        href={route("services.filter.show", service.slug)}
                        key={index}
                        className="item h-[70px] md:h-[110px] hover:bg-slate-800 hover:text-white p-2 flex duration-300 ease-in-out"
                    >
                        <div className="self-center h-full justify-center w-full ">
                            <div className="h-[40%] mx-auto mt-2">
                                <img
                                    src={service.icon_url}
                                    className="w-[auto] h-full object-cover mx-auto"
                                    alt=""
                                />
                            </div>
                            <p className="text-center leading-[1.1] text-sm mt-2 md:h-[30%]">
                                {service.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
