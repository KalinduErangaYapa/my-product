export default function Pricing({ featuredServices }: any) {
    return (
        <section className={`relative isolate overflow-hidden`}>
            <div className="container mx-auto mt-4 grid md:grid-cols-3 gap-4 md:py-16 px-4 md:px-0">
                {featuredServices.map((service: any, index: number) => {
                    return [
                        "apple-repair",
                        "samsung-repair",
                        "huawei-repair",
                    ].includes(service.slug) ? (
                        <div
                            key={index}
                            className="md:max-w-sm p-8 border-gray-200 bg-slate-100 rounded-lg"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                                {service.name}
                            </h5>
                            <div className="grid gap-y-6 mt-6">
                                {service.prices.map(
                                    (price: any, index: number) => {
                                        return index < 2 ? (
                                            <div key={index} className="">
                                                <p className=" font-normal text-gray-700 dark:text-gray-700 relative">
                                                    {price.repair_name}
                                                </p>
                                                <h6 className="font-[800]">
                                                    <span className="text-slate-700">
                                                        From
                                                    </span>{" "}
                                                    <span className="text-slate-700">
                                                        R{price.price}
                                                    </span>
                                                </h6>
                                            </div>
                                        ) : (
                                            <></>
                                        );
                                    }
                                )}
                            </div>
                            <a className="uppercase inline-flex items-center px-5 py-4 text-sm font-medium text-center text-gray-200 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800 mt-8"
                                href={route(
                                    "services.filter.show",
                                    service.slug
                                )}>
                                {service.name} PRICE LIST
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </div>
                    ) : (
                        <></>
                    );
                })}
            </div>
        </section>
    );
}
