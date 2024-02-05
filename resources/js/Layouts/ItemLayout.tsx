import ApplicationLogo from "@/Components/elements/other/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function ItemLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 bg-orange-100">
            <div className="w-full sm:max-w-6xl mt-6 px-6 py-4 bg-white overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
