import { Link } from "@inertiajs/react";

export default function BlogSection({ blogs }: any) {
    const displayedBlogs = blogs?.slice(0, 4);

    return (
        <section className="py-32">
            <div className="mx-auto container px-6">
                <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-[800] tracking-tight text-gray-900 sm:text-4xl">
                        iRepair Blog
                    </h2>
                    <p className="text-base leading-8 text-gray-600">
                        Read everything that matters to know about your devices
                        and the latest technology trends.
                    </p>
                </div>
                <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {displayedBlogs?.map((blog: any) => (
                        <article
                            key={blog.id}
                            className="flex flex-col items-start justify-between"
                        >
                            <div className="relative w-full">
                                <img
                                    src={blog.image_url}
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-xl bg-gray-100 object-cover sm:aspect-[3/2] lg:aspect-[4/3]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-full mt-4">
                                <div className="text-left text-xs text-gray-500">
                                    <time
                                        dateTime={blog.created_at_human}
                                        className="text-gray-500"
                                    >
                                        {blog.created_at_human}
                                    </time>
                                </div>
                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-semibold leading-6 text-gray-900 text-left cursor-pointer">
                                        <Link
                                            href={route("blogs.read", blog?.id)}
                                        >
                                            <span className="hover:text-gray-600">
                                                {blog.title}
                                            </span>
                                        </Link>
                                    </h3>
                                    <p
                                        className="mt-2 line-clamp-3 text-left text-sm leading-6 text-gray-600 post-content"
                                        dangerouslySetInnerHTML={{
                                            __html: blog.description,
                                        }}
                                    ></p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                {/* <div className="mt-8 text-right">
                    <Link href="/blogs">
                        <button className="text-primary font-[700] py-3 px-6 rounded">
                            See All Blogs
                            <ChevronRightIcon className="w-5 h-5 inline-block" />
                        </button>
                    </Link>
                </div> */}
            </div>
        </section>
    );
}
