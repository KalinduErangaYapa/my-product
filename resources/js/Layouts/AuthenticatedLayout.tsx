import FlashAlerts from "@/Components/elements/alerts/FlashAlerts";
import AdminHeader from "@/Components/shared/AdminHeader";
import AdminSidebar from "@/Components/shared/AdminSidebar/AdminSideBar";
import { usePage } from "@inertiajs/react";
import { ReactNode } from "react";

export default function Authenticated({
    children,
    bRoutes,
}: {
    children: ReactNode;
    bRoutes: any;
}) {
    const pageProps = usePage().props;
    const { user }: any = pageProps.auth;
    return (
        <>
            <div
                className={" min-h-[100vh] h-full scroll-smooth bg-slate-100 "}
            >
                <AdminHeader bRoutes={bRoutes} user={user} />
                <div className="relative h-full pb-10 lg:mt-[85px]">
                    <AdminSidebar user={user} />
                    <div className="flex flex-1 flex-col lg:pl-[260px] h-full min-h-[100vh]">
                        <main className="container mx-auto flex-1 bg-slate-100 p-8 sm:py-8 lg:p-8">
                            {children}
                        </main>
                        {/* <Footer /> */}
                    </div>
                </div>
                <FlashAlerts flash={pageProps.flash} />
            </div>
        </>
    );
}
