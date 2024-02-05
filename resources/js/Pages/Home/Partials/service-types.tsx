import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const services = [
    {
        title: (
            <span>
                Iphone <br /> Repair
            </span>
        ),
        image: "",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quas sint rerum unde repudiandae similique cumque doloribus laborum omnis blanditiis vitae recusandae.",
    },
    {
        title: (
            <span>
                iMac <br /> Repair
            </span>
        ),
        image: "",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quas sint rerum unde repudiandae similique cumque doloribus laborum omnis blanditiis vitae recusandae.",
    },
    {
        title: (
            <span>
                Laptop <br /> Repair
            </span>
        ),
        image: "",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quas sint rerum unde repudiandae similique cumque doloribus laborum omnis blanditiis vitae recusandae.",
    },
];
export default function DefaultServices() {
    return (
        <div>
            <div className="container mx-auto mt-4 flex flex-col items-center  bg-slate-100 rounded-lg py-5">
                <h2 className="text-center text-gray-900  text-4xl font-bold font-serif" style={{ lineHeight: 1.5 }}>
                    iRepair Blog
                </h2>
            </div>
            <section className="flex bg-white pb-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3 gap-8 ">
                        {services.map((service, index) => (
                            <div
                                // href={`services/${service.slug}`}
                                key={index}
                                className="relative"
                            >
                                <div className="group relative h-[270px] transform-gpu cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-6 pt-8 text-slate-500 shadow-lg duration-300 hover:border-primary">
                                    <span className="absolute right-0 top-0 -z-10 ml-auto h-28 w-28 rounded-bl-full rounded-tr-[64rem] border border-b-slate-300 border-l-slate-300 bg-slate-300 duration-300 group-hover:bg-primary" />
                                    <img
                                        src={`/assets/imgs/page/home/services-slider${service.image}`}
                                        width={70}
                                        height={70}
                                        alt=""
                                        className="absolute right-2 top-2 ml-auto object-contain duration-300"
                                    />
                                    <h3 className="z-10 text-lg font-[700] uppercase tracking-[1px] text-slate-600 duration-300 group-hover:text-primary">
                                        {service.title}
                                    </h3>
                                    <p className="mt-8 text-sm font-[500] tracking-[0.61px] text-slate-500">
                                        <span>{service.description}</span>{" "}
                                    </p>
                                    <div className="absolute bottom-2 right-2">
                                        <Link
                                            href="/services"
                                            className="flex space-x-2 text-[12px] font-[400]"
                                        >
                                            <span className="self-center">
                                                Read more
                                            </span>
                                            <ArrowRightIcon className="h-4 w-4 self-center" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
