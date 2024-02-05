import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import InputError from "@/Components/elements/inputs/InputError";
import InputLabel from "@/Components/elements/inputs/InputLabel";
import SelectInput from "@/Components/elements/inputs/SelectInput";
import TextInput from "@/Components/elements/inputs/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Service({
    service,
    devices,
    repairs,
    activeDevice,
    prices,
}: any) {
    const { data, setData, post, processing, errors, reset } = useForm({
        device: activeDevice,
        repair: "",
        message: "",
        name: "",
        email: "",
        phone: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("contact-us.create"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Service</title>
                    <meta
                        name="description"
                        content="Learn about Brothers Tech"
                        data-react-helmet="true"
                    />

                    <meta
                        property="og:title"
                        content="About Us"
                        data-react-helmet="true"
                    />

                    <meta
                        property="og:type"
                        content="website"
                        data-react-helmet="true"
                    />

                    <meta
                        property="og:image"
                        content="/assets/images/meta.png"
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
                        <h1 className="text-4xl mb-2 font-bold tracking-tight text-gray-800 sm:text-5xl lg:text-6xl leading-[1.2]">
                            {service.page_title}
                        </h1>
                    </div>
                </div>
                <div className="bg-white py-4">
                    <div className="container mx-auto grid md:grid-cols-5 gap-6">
                        <div className=" md:col-span-3">
                            {/* description */}
                            <div className="px-4 md:px-0">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: service.description,
                                    }}
                                />
                            </div>
                            <div className="mt-16 px-4 md:px-0">
                                <h2 className="text-4xl font-[700]">
                                    Our Pricing
                                </h2>
                                <p>
                                    Check our lowest prices and make a inquire
                                    now.
                                </p>
                                <PricingTable prices={prices} />
                            </div>
                        </div>
                        {/* pricing  */}
                        <div className="md:col-span-2 md:p-4">
                            <div className="bg-gray-100 shadow p-6 sticky top-[120px] md:rounded-xl">
                                <div className="px-4 md:px-0 grid gap-y-6">
                                    {service.images.map(
                                        (image: any, index: number) => (
                                            <img
                                                src={image.url}
                                                alt=""
                                                className="rounded-xl"
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    // More people...
];

function PricingTable({ prices }: any) {
    console.log(prices);
    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mt-4">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-6"
                        >
                            Repair
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900"
                        >
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {prices.map((price: any, index: number) => (
                        <>
                            <tr key={price.id}>
                                <td
                                    colSpan={2}
                                    className="bg-slate-200 whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium text-gray-900 sm:pl-6"
                                >
                                    {price.name}
                                </td>
                            </tr>
                            {price.repairs.map((repair: any, index: number) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {repair.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-lg text-gray-600 font-[800]">
                                        ZAR {repair.price}
                                    </td>
                                </tr>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// function Test(){
//     return (
//         <>
//             <h2 className="text-slate-800 text-4xl font-[800] font-display">
//                 See Our Pricing
//             </h2>
//             <div className="mt-4">
//                 <form onSubmit={submit}>
//                     <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 mt-8">
//                         <div className="col-span-2">
//                             <InputLabel
//                                 htmlFor="device"
//                                 value="Select the device"
//                                 required
//                                 className="!text-slate-800 pl-1"
//                             />

//                             <SelectInput
//                                 className="mt-1 sys-select"
//                                 options={devices}
//                                 selectedOption={devices.filter((obj: any) => {
//                                     return obj.value === data.device;
//                                 })}
//                                 setData={(e: any) => setData("device", e)}
//                             />

//                             <InputError
//                                 message={errors.device}
//                                 className="mt-2"
//                             />
//                         </div>
//                         {/* problem */}
//                         <div className="col-span-2">
//                             <InputLabel
//                                 htmlFor="name"
//                                 value="Select the repair"
//                                 required
//                                 className="!text-slate-800 pl-1"
//                             />

//                             <SelectInput
//                                 className="mt-1 sys-select"
//                                 options={repairs}
//                                 selectedOption={repairs.filter((obj: any) => {
//                                     return obj.value === data.repair;
//                                 })}
//                                 setData={(e: any) => setData("repair", e)}
//                             />

//                             <InputError
//                                 message={errors.repair}
//                                 className="mt-2"
//                             />
//                         </div>
//                         <div className="border-t border-b col-span-2 p-8">
//                             <div className="w-full flex">
//                                 <div className="w-2/3">
//                                     <p>You will be charged :</p>
//                                 </div>
//                                 <div className="w-1/3">
//                                     <strong>ZAR 99.89</strong>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-span-2">
//                             <p className="font-[700] text-lg">
//                                 It's a fair price right?. Let's make a Inquiry.
//                             </p>
//                         </div>
//                         <div className="col-span-2">
//                             <InputLabel
//                                 htmlFor="name"
//                                 value="Your Name"
//                                 required
//                                 className="!text-slate-800 pl-1"
//                             />

//                             <TextInput
//                                 id="name"
//                                 name="name"
//                                 type="text"
//                                 value={data.name}
//                                 className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 text-gray-100"
//                                 onChange={(e) =>
//                                     setData("name", e.target.value)
//                                 }
//                             />

//                             <InputError
//                                 message={errors.name}
//                                 className="mt-2"
//                             />
//                         </div>
//                         <div className="col-span-1">
//                             <InputLabel
//                                 htmlFor="email"
//                                 value="Your Email"
//                                 required
//                                 className="!text-slate-800 pl-1"
//                             />

//                             <TextInput
//                                 id="name"
//                                 name="email"
//                                 type="email"
//                                 value={data.email}
//                                 className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 text-gray-100"
//                                 onChange={(e) =>
//                                     setData("email", e.target.value)
//                                 }
//                             />

//                             <InputError
//                                 message={errors.email}
//                                 className="mt-2"
//                             />
//                         </div>
//                         <div className="col-span-1">
//                             <InputLabel
//                                 htmlFor="phone"
//                                 value="Your Phone"
//                                 required
//                                 className="!text-slate-800 pl-1"
//                             />

//                             <TextInput
//                                 id="name"
//                                 name="phone"
//                                 type="text"
//                                 value={data.phone}
//                                 className="mt-1 block w-full bg-slate-50 !rounded-2xl !border-slate-200 text-gray-100"
//                                 onChange={(e) =>
//                                     setData("phone", e.target.value)
//                                 }
//                             />

//                             <InputError
//                                 message={errors.phone}
//                                 className="mt-2"
//                             />
//                         </div>
//                     </div>
//                     <div className="mt-10">
//                         <PrimaryButton type="submit" className="">
//                             Submit Inquiry
//                         </PrimaryButton>
//                     </div>
//                     <p className="mt-4 text-sm leading-6 text-gray-500">
//                         By submitting this form, I agree to the{" "}
//                         <Link
//                             href="#"
//                             className="font-semibold text-primary-600"
//                         >
//                             privacy&nbsp;policy
//                         </Link>
//                         .
//                     </p>
//                 </form>
//             </div>
//         </>
//     );
// }
