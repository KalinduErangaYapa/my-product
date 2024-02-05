import { Link, usePage } from "@inertiajs/react";
import DynamicHeroIcon from "@/Components/elements/icons/DynamicHeroIcon";
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function NavSingle({
    startWith,
    routeName,
    name,
    icon,
}: {
    startWith?: string;
    routeName?: any;
    name: any;
    icon: any;
}) {
    const { url } = usePage();
    const { inquiryCount }: any = usePage().props;
    const { contactCount }: any = usePage().props;
    function isActive(startWith?: string) {
        if (startWith == "/") {
            return url == startWith;
        } else {
            return url.startsWith(startWith ?? "");
        }
    }
    return (
        <div className="py-1 w-full">
            <Link
                href={routeName}
                className={classNames(
                    isActive(startWith)
                        ? " text-white bg-primary shadow shadow-primary"
                        : "text-slate-500 cursor-pointer hover:text-slate-700 hover:shadow  hover:bg-white ",
                    "w-full group mt-0 flex p-3 rounded-lg items-center text-sm font-medium  duration-300 ease-in-out transition-all"
                )}
                aria-current={isActive(startWith) ? "page" : undefined}
            >
                <DynamicHeroIcon
                    icon={icon}
                    className={classNames(
                        isActive(startWith)
                            ? "active text-white"
                            : "text-slate-500 group-hover:text-slate-700 duration-300 ease-in-out transition-all",
                        " mr-4 h-4 w-4 flex-shrink-0 "
                    )}
                    aria-hidden="true"
                />
                <span className="text">{name}</span>
                <div className="px-5">
                    {name == "Inquiries" && inquiryCount > 0 ? (
                        <div className="rounded-full py-1 px-2 font-[600] text-white bg-red-500 text-center">
                            {inquiryCount}
                        </div>
                    ) : name == "Contact Us" && contactCount > 0 ? (
                        <div className="rounded-full py-1 px-2 font-[600] text-white bg-red-500 text-center">
                            {contactCount}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </Link>
        </div>
    );
}
