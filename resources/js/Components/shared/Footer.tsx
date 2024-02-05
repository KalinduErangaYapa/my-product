import { Link, useForm, usePage } from "@inertiajs/react";
import { PrimaryButton, PrimaryLink } from "../elements/buttons/PrimaryButton";
import Repairs from "./header/Repairs";
import { FormEventHandler, useState } from "react";
import TextInput from "../elements/inputs/TextInput";
import InputError from "../elements/inputs/InputError";

const footerNavigation = {
    company: [
        { name: "Home", href: route("home") },
        // { name: "Our Products", href: route("products.filter") },
        { name: "About Us", href: route("about-us") },
        { name: "Contact Us", href: route("contact-us") },
        { name: "Terms & Conditions", href: route("terms-and-conditions") },
        { name: "Privacy & Policy", href: route("privacy-and-policy") },
    ],
    repairs: [
        { name: "Smartphone repairs", href: "" },
        { name: "Laptop repairs", href: "/" },
        { name: "Desktop repairs", href: "/" },
        { name: "Tablet repairs", href: "/" },
        { name: "Apple Watch repairs", href: "/" },
        { name: "Motherboard repairs", href: "" },
        { name: "iPhone Battery Replacemnt", href: "" },
        { name: "iPhone Screen Replacement", href: "" },
    ],
    social: [
        {
            name: "Facebook",
            href: "https://web.facebook.com/delifinacompany",
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/delifinafoods/",
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/company/delifina",
            icon: (props: any) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    {...props}
                >
                    <path
                        fill="transparent"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                    ></path>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                        opacity=".05"
                    ></path>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                        opacity=".07"
                    ></path>
                    <path
                        // fill="#fff"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                    ></path>
                </svg>
            ),
        },
        {
            name: "Pinterest",
            href: "http://www.pinterest.com/delifinafoods",
            icon: (props: any) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                    {...props}
                >
                    <circle cx="24" cy="24" r="20" fill="transparent"></circle>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.4439087,11.4161377c-8.6323242,0-13.2153931,5.7946167-13.2153931,12.1030884	c0,2.9338379,1.5615234,6.5853882,4.0599976,7.7484131c0.378418,0.1762085,0.581543,0.1000366,0.668457-0.2669067	c0.0668945-0.2784424,0.4038086-1.6369019,0.5553589-2.2684326c0.0484619-0.2015381,0.0246582-0.3746338-0.1384277-0.5731201	c-0.8269653-1.0030518-1.4884644-2.8461304-1.4884644-4.5645752c0-4.4115601,3.3399658-8.6799927,9.0299683-8.6799927	c4.9130859,0,8.3530884,3.3484497,8.3530884,8.1369019c0,5.4099731-2.7322998,9.1584473-6.2869263,9.1584473	c-1.9630737,0-3.4330444-1.6238403-2.9615479-3.6153564c0.5654297-2.3769531,1.6569214-4.9415283,1.6569214-6.6584473	c0-1.5354004-0.8230591-2.8169556-2.5299683-2.8169556c-2.006958,0-3.6184692,2.0753784-3.6184692,4.8569336	c0,1.7700195,0.5984497,2.9684448,0.5984497,2.9684448s-1.9822998,8.3815308-2.3453979,9.9415283	c-0.4019775,1.72229-0.2453003,4.1416016-0.0713501,5.7233887l0,0c0.4511108,0.1768799,0.9024048,0.3537598,1.3687744,0.4981079l0,0	c0.8168945-1.3278198,2.0349731-3.5056763,2.4864502-5.2422485c0.2438354-0.9361572,1.2468872-4.7546387,1.2468872-4.7546387	c0.6515503,1.2438965,2.5561523,2.296936,4.5831299,2.296936c6.0314941,0,10.378418-5.546936,10.378418-12.4400024	C36.7738647,16.3591919,31.3823242,11.4161377,24.4439087,11.4161377z"
                    ></path>
                </svg>
            ),
        },
    ],
};

export default function Footer() {
    const { categories }: any = usePage().props;
    const date = new Date();
    const { data, setData, post, progress, errors, reset } = useForm({
        email: "",
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("subscriber.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsSuccess(true);
            },
        });
    };
    return (
        <footer aria-labelledby="footer-heading" className=" bg-slate-100">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div>
                <div className="mx-auto container px-4 sm:px-0 lg:px-0">
                    <div className="py-20 xl:grid xl:grid-cols-6 xl:gap-8">
                        <div className="space-y-2 col-span-2">
                            <img
                                className="h-auto w-full object-contain mx-auto"
                                src="/assets/images/logo.png?a=1"
                                alt="Brothers Tech"
                                width={250}
                                height={50}
                            />
                            <hr className="border-[0.5px] my-1" />
                            <p className="text-sm leading-[1.2] text-slate-800">
                                iRepair is the leader in electronics repair in
                                Greece. We
                                <br /> have been in the repair business since
                                2007 helping our <br /> customers with all of
                                the technology related problems.
                            </p>
                            <hr className="border-[0.5px] my-1 mt-5" />
                            <div className="flex space-x-6 justify-center">
                                {footerNavigation.social.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-500 hover:text-gray-400 bg-gray-900 rounded-full p-1"
                                    >
                                        <span className="sr-only">
                                            {item.name}
                                        </span>
                                        <item.icon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-4 grid grid-cols-2 md:grid-cols-3 gap-3 pt-[40px] sm:pt-[40px]">
                            <div>
                                <h3 className="text-lg font-medium text-slate-800">
                                    QUICK LINKS{" "}
                                </h3>
                                <ul
                                    role="list"
                                    className="mt-4 sm:mt-6 space-y-3"
                                >
                                    {footerNavigation.company.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a
                                                href={item.href}
                                                className="text-slate-700 hover:text-primary"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-slate-800">
                                    REPAIRS
                                </h3>
                                {/* <ul role="list" className="mt-6 space-y-3">
                                    {footerNavigation.repairs.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a
                                                href={item.href}
                                                className="text-slate-700 hover:text-primary"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul> */}

                                <Repairs />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-slate-800">
                                    NEWSLETTER
                                </h3>
                                <p className="text-sm leading-[1.2] text-slate-700 mt-6">
                                    All you don't want to miss at you <br />
                                    inbox! Get updates on the latest updates on
                                    the latest iRepair in store specials,
                                    discount offers, and customer-only deals.
                                </p>
                                <form
                                    onSubmit={submit}
                                    className="w-full  flex flex-col  sm:justify-start justify-center  lg:col-span-5 lg:pt-2"
                                >
                                    <div className="flex w-full flex-wrap  sm:justify-start justify-center gap-4">
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <TextInput
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            onChange={(e) => setData("email", e.target.value)}
                                            className=""
                                            placeholder="Enter your email"
                                        />
                                        <PrimaryButton
                                            disabled={progress != null ? true : false}
                                            type="submit"
                                        >
                                            Subscribe
                                        </PrimaryButton>
                                    </div>
                                    <InputError message={errors.email} className="mt-2" />
                                    {isSuccess && (
                                        <p className="mt-2 bg-green-100 text-green-800 rounded-md py-2 px-8">
                                            Thank you for subscribing our News letter Service.
                                        </p>
                                    )}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-900">
                <div className="mx-auto container px-4 sm:px-0 lg:px-0">
                    <div className="py-5">
                        <p className="text-sm text-gray-400 space-x-2 text-center">
                            <span>
                                Copyright &copy; {date.getFullYear()}, Brothers
                                Tech. All rights reserved,
                            </span>
                            <span>
                                Developed By{" "}
                                <a
                                    target="_blank"
                                    href="https://axcertro.com"
                                    className="font-[800] font-body"
                                >
                                    Axcertro
                                </a>{" "}
                                <span>With ❤️</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
