import { useState } from "react";
import Footer from "@/Components/shared/Footer";
import Header from "@/Components/shared/header/Header";
import NewsLetterForm from "@/Components/shared/NewsLetter";
import { Head } from "@inertiajs/react";
import TopHeader from "@/Components/shared/header/TopHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const appName = "Brothers Tech";
    return (
        <div className="font-body ">
            <Head>
                <title>Savor the Authentic Taste of Ceylon.</title>
                <meta
                    head-key="description"
                    name="description"
                    content="We serve the wonderful taste of Ceylon to the world as a superb experience."
                />
                <meta
                    head-key="og:title"
                    property="og:title"
                    content="Savor the Authentic Taste of Ceylon."
                />
                <meta head-key="og:type" property="og:type" content="website" />
                <meta
                    head-key="og:url"
                    property="og:url"
                    content={route("home")}
                />
                <meta
                    property="og:image"
                    head-key="og:image"
                    content={route("home") + "/assets/images/delifina.png"}
                />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={"/assets/images/logo.png"}
                />
            </Head>
            <TopHeader />
            {/* Hero section */}
            <Header />
            <main className="min-h-[100vh]">{children}</main>
            {/* Footer */}
            <Footer />
        </div>
    );
}
