import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ButtonHTMLAttributes, useState } from 'react';

export default function ConfirmButton({
    className = "",
    disabled,
    label,
    url,
    message,
    yesText,
    noText,
    ...props
}: {
    className?: string;
    disabled?: boolean;
    url: string;
    label: string;
    message?: string;
    yesText?: string;
    noText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    const { t } = useLaravelReactI18n();

    const [collapse, setCollapse] = useState(false);

    return (
        <div
            className={
                (collapse == true ? " pl-4 " : " w-[auto] ") +
                " duration-300 ease-in-out transition-all inline-flex bg-red-100 rounded-[12px]"
            }
        >
            {collapse && (
                <span className="self-center text-red-900 mr-4">
                    {t("confirmButton.danger.message")}
                </span>
            )}
            <div className="ml-auto">
                {collapse && (
                    <Link
                        method="delete"
                        href={url}
                        as='button'
                        className="inline-flex items-center px-4 py-2 rounded-l-[12px] bg-red-600 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        {/* {t("confirmButton.danger.yes")} */}
                        Yes
                    </Link>
                )}
                <span
                    onClick={() => setCollapse(!collapse)}
                    className={
                        `${
                            collapse
                                ? " bg-slate-600 hover:bg-slate-500 active:bg-slate-700 rounded-r-[12px] focus:outline-none focus:ring-2 focus:ring-slate-500 "
                                : " bg-red-600 rounded-[12px] hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 "
                        } inline-flex cursor-pointer items-center px-4 py-2 rounded-r-[16px] border border-transparent font-semibold text-xs text-white uppercase tracking-widest  focus:ring-offset-2 transition ease-in-out duration-150 ${
                            disabled && "opacity-25"
                        } ` + className
                    }
                >
                    <span>
                        {/* {collapse ? t("confirmButton.danger.no") : label} */}
                        {collapse ? "No" : label}
                    </span>
                </span>
            </div>
        </div>
    );
}
