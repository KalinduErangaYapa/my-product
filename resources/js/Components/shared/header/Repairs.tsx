import { Link, usePage } from "@inertiajs/react";

export default function Repairs() {
    const { url, props }: any = usePage();
    return (
        <>
            <div className="text-sm  text-slate-700 mt-4">
                {props.services?.map((service: any) => (
                    <ul
                        role="list"
                        className=" sm:mt-3 space-y-3"
                    >
                        <Link
                            href={route(
                                "services.filter.show",
                                service.slug
                            )}
                            key={service?.name}
                            className="group relative flex items-center  text-sm leading-6 hover:bg-slate-100"
                        >
                            <div className="flex-auto">
                                <span className="">
                                    {service.name}
                                    <span className="absolute inset-0" />
                                </span>
                            </div>
                        </Link>
                    </ul>
                ))}
            </div>
        </>
    );
}
