import { Link } from "@inertiajs/react";

export default function Product({
    product,
    utility,
}: {
    product: any;
    utility: any;
}) {
    return (
        <Link
            key={product.id}
            href={route("services.filter.show", product.slug)}
            className="group"
        >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border xl:aspect-h-5 xl:aspect-w-7 hover:bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <h3 className="mt-4 text-md text-gray-900 font-[800] text-center">
                {product.name.substring(0, 27)}
                {product.name.length > 27 && "..."}
            </h3>
            <p className="mt-1 text-sm font-[400] text-gray-900 text-center space-x-2">
                {product.category}
            </p>
        </Link>
    );
}
