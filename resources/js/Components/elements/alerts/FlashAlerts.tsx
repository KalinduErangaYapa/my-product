import SuccessAlert from "./SuccessAlert";
import { PageProps } from "@/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import DangerAlert from "./DangerAlert";

// {flash:PageProps["flash"]}
export default function FlashAlerts({ flash }: any) {
    const { t } = useLaravelReactI18n();
    return (
        <>
            {flash?.success && (
                <SuccessAlert
                    title={t("alert.success.title")}
                    message={flash?.success}
                />
            )}

            {flash?.error && (
                <DangerAlert
                    title={t("alert.success.title")}
                    message={flash?.error}
                />
            )}
        </>
    );
}
