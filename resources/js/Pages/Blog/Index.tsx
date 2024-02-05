import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

const routes = [
    {
        name: "Blogs",
        hasArrow: true,
        link: route("blogs"),
    },
];

export default function Blogs(blogs: any) {
    return (
        <AppLayout>
            <Head>
                <title>Our Blog</title>
                {/* <meta
                    name="description"
                    content="Explore Delifina's culinary insights and industry updates in our blog. Join us on a journey of food knowledge, trends, and delicious inspiration."
                    data-react-helmet="true"
                /> */}

                <meta
                    property="og:title"
                    content="Blogs"
                    data-react-helmet="true"
                />

                <meta
                    property="og:type"
                    content="website"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image"
                    content="/assets/images/meta.png"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:type"
                    content="image/png"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:width"
                    content="1200"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image:height"
                    content="630"
                    data-react-helmet="true"
                />
            </Head>
            <div className="relative bg-gray-200">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full object-cover"
                        src="/assets/images/page-walls/2.png"
                        alt=""
                    />
                    <div
                        className="absolute inset-0 bg-gray-900/70 mix-blend-multiply"
                        aria-hidden="true"
                    />
                </div>
                <div className="relative mx-auto container px-6 py-12 sm:py-28 lg:px-0">
                    <h1 className="text-4xl mb-2 font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Blogs
                    </h1>
                    <BreadCumbsPublic routes={routes} />
                </div>
            </div>
            <div className="bg-white">
                <div className="bg-white container mx-auto px-4 md:px-0 py-16 w-full">
                    <div className="grid grid-cols-4 gap-x-5">
                        {blogs?.blogs?.map((singleBlog: any, index: any) => (
                            <a
                                href={route("blogs.read", singleBlog?.id)}
                                className="col-span-4 group md:col-span-2 lg:col-span-1"
                            >
                                <div className="relative mt-4">
                                    <div className="w-full">
                                        <img
                                            src={singleBlog?.image_url}
                                            className="object-cover w-full h-[auto] rounded-xl"
                                            alt=""
                                        />
                                    </div>
                                    <div className="rounded-lg w-full">
                                        <span>
                                            {singleBlog?.created_at_human}
                                        </span>
                                        <h6 className="font-[800] group-hover:underline text-gray-800 w-full text-md md:text-lg mt-2 md:mt-0">
                                            {singleBlog?.title}
                                        </h6>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
