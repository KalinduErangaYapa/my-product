import { Link } from "@inertiajs/react";

export default function YouMayAlsoLike({
    products,
    title,
    linkText,
    link,
    utility,
}: {
    products: any;
    title: string;
    linkText: string;
    link: string;
    utility: any;
}) {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h2>
                    <Link
                        href={link}
                        className="hidden text-sm font-medium text-primary-600 hover:brightness-90 md:block"
                    >
                        {linkText}
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                    {products.map((product: any) => (
                        <div key={product.slug} className="group relative">
                            <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                                <img
                                    src={product.main_image.url}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-4 text-lg text-gray-700">
                                <Link
                                    href={route(
                                        "services.filter.show",
                                        product.slug
                                    )}
                                >
                                    <span className="absolute inset-0" />
                                    {product.name.substring(0, 27)}
                                    {product.name.length > 27 && "..."}
                                </Link>
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900 space-x-2">
                                <span>
                                    {utility.currency}
                                    {` `}
                                    {product.base_price}
                                </span>
                                {` `}
                                {product.cut_off_price && (
                                    <span className="text-red-600 line-through">
                                        {utility.currency}
                                        {` `}
                                        {product.cut_off_price}
                                    </span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-sm md:hidden">
                    <Link
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Shop the collection
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
