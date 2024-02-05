import { FormEventHandler } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, router, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";

export default function EditNewsLetterSubscribers({
    newsLetterSubscriber,
    type,
    newsLetterSubscriberStatus,
}: {
    newsLetterSubscriber: any;
    type: string;
    newsLetterSubscriberStatus: { label: string; value: string }[];
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "NewsLetter Subscribers",
            hasArrow: true,
            link: route("admin.news-letter-subscribers.index"),
        },
        {
            name: "View",
            hasArrow: true,
            link: "",
        },
    ];

    const { data, setData, post, errors, patch } = useForm({
        status: newsLetterSubscriber?.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(
            route("admin.news-letter-subscribers.update", {
                news_letter_subscriber: newsLetterSubscriber?.id,
            })
        );
    };

    const title = type === "create" ? "Create NewsLetterSubscriber" : "Edit NewsLetterSubscriber";
    console.log(newsLetterSubscriberStatus)
    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title={title} />
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        NewsLetterSubscriber
                    </h2>
                </div>
            </div>
            <form onSubmit={submit} className="grid grid-cols-3 gap-8">
                <div className="sm:col-span-2 col-span-4">
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        <div>
                            <h3 className=" text-xl mb-8 font-medium leading-6 text-gray-900">
                                NewsLetterSubscriber Details
                            </h3>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-6  sm:grid-cols-6">
                            <div className="sm:col-span-6 ">
                                <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                    <div className="font-bold">Email:</div>
                                    <div>{newsLetterSubscriber?.email}</div>
                                </div>
                                <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-6  sm:grid-cols-6">
                                    <div className="sm:col-span-6 ">
                                        <div className=" flex-wrap gap-x-2 text-sm font-medium text-gray-700 md:flex">
                                            <div className="font-bold">Created At:</div>
                                            <div>{newsLetterSubscriber?.created_at_human}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-3">
                                <InputLabel htmlFor="status" value="Status:" />
                                <SelectInput
                                    className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm"
                                    options={newsLetterSubscriberStatus}
                                    selectedOption={newsLetterSubscriberStatus?.filter(
                                        (option) => option.value === data.status
                                    )}
                                    setData={(e: any) => setData("status", e)}
                                />
                                <InputError message={errors.status} />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <PrimaryButton type="submit">Save</PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>

        </Authenticated>
    );
}
