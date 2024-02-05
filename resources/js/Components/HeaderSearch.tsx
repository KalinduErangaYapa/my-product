import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function HeaderSearch() {
    return (
        <div className="min-w-0 flex-1 transition-all duration-300 ">
            <div className="flex items-center px-6 py-2 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <input
                            id="search"
                            name="search"
                            className="block w-full placeholder:uppercase placeholder:tracking-[0.1px] rounded-md border-0 bg-gray-100 py-3 pl-4 pr-3 text-gray-900  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                            placeholder="Search Your Items"
                            type="search"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 bg-primary-400 rounded-r-md">
                            <MagnifyingGlassIcon
                                className="h-5 w-5 text-primary-800"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
