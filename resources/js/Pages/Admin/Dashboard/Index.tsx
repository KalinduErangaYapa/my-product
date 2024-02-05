import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Statistics from "./Partials/Statistics";

export default function Dashboard({ auth, productDetails, inquiryDetails, cvDetails }: PageProps) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
    ];
    return (
        <AuthenticatedLayout bRoutes={bRoutes}>
            <Head title="Dashboard" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <Statistics productDetails={productDetails} inquiryDetails={inquiryDetails} cvDetails={cvDetails} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
