import { FormEventHandler, useState } from "react";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import TextInput from "@/Components/elements/inputs/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextArea from "@/Components/elements/inputs/TextArea";

export default function CreateProduct({
    faq,
    type,
    faqStatus,
}: {
    faq: any;
    type: string;
    parentFaqs: { label: string; value: string }[];
    faqStatus: { label: string; value: string }[];
}) {
    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("admin.dashboard"),
        },
        {
            name: "Faq's",
            hasArrow: true,
            link: route("admin.faq.index"),
        },
        {
            name: type == "create" ? "Create" : "Edit",
            hasArrow: true,
            link: "",
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        question: type == 'edit' ? faq?.question : "",
        answer: type == 'edit' ? faq?.answer : "",
        status: type == 'edit' ? faq?.status : "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            route("admin.faq.updateFaq", {
                faq: faq?.id,
            })
        );
    };

    const title = type == "create" ? "Create Faq" : "Edit Faq";

    return (
        <Authenticated bRoutes={bRoutes}>
            <Head title={title} />
            <form
                onSubmit={submit}
                className=" grid grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
                <div className="col-span-3 flex justify-between">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {title}
                    </h2>
                    <PrimaryButton className="ml-auto" type="submit">
                        Save & Submit
                    </PrimaryButton>
                </div>
                <div className="col-span-2 space-y-6 mt-4 lg:mt-0">
                    <div className="bg-white shadow-card rounded-xl p-8 space-y-6">
                        <div>
                            <InputLabel htmlFor="question" value="Question" />

                            <TextInput
                                id="question"
                                name="question"
                                type="text"
                                value={data.question}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("question", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.question}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="answer" value="Answer" />

                            <TextArea
                                id="answer"
                                name="answer"
                                value={data.answer}
                                className="mt-1 block w-full"
                                isFocused={true}
                                rows={4}
                                onChange={(e) =>
                                    setData("answer", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.question}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-6">
                    <div className="bg-white shadow-card rounded-xl p-8 space-y-4">
                        <div>
                            <InputLabel htmlFor="status" value="Status" />

                            <SelectInput
                                className="border-gray-300 mt-1.5 focus:border-primary focus:ring-0.5 focus:ring-primary rounded-md shadow-sm "
                                options={faqStatus}
                                selectedOption={faqStatus.filter(
                                    (obj: any) => {
                                        return obj.value === data.status;
                                    }
                                )}
                                setData={(e: any) => setData("status", e)}
                            />

                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Authenticated>
    );
}
