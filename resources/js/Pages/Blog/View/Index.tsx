import BreadCumbsPublic from "@/Components/elements/header/BreadCumbsPublic";
import Inquiry from "@/Components/shared/Inquiry";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function BlogView({ article }: any) {
    return (
        <AppLayout>
            <Head>
                <title>{article.title}</title>
                <meta
                    name="description"
                    content={article.title}
                    data-react-helmet="true"
                />

                <meta
                    property="og:title"
                    content={article.title}
                    data-react-helmet="true"
                />

                <meta
                    property="og:type"
                    content="website"
                    data-react-helmet="true"
                />

                <meta
                    property="og:image"
                    content={article?.image_url}
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
            <div className="relative bg-gray-50">
                <div className="relative mx-auto container px-6 py-8 lg:px-0">
                    <h1 className="text-3xl text-center mb-2 font-bold tracking-tight text-gray-800 sm:text-5xl lg:text-4xl leading-[1.2]">
                        {article.title}
                    </h1>
                </div>
            </div>
            <div className="bg-white container mx-auto px-4 md:px-0 py-8 w-full">
                <img
                    src={article?.image_url}
                    className="object-cover mx-auto h-[auto] rounded-xl md:w-1/2 "
                    alt=""
                />
                <div className="mt-4 md:mt-6 text-xl mx-auto md:w-5/6">
                    <div
                        className="htmlData ql-editor"
                        dangerouslySetInnerHTML={{
                            __html: article?.description,
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
