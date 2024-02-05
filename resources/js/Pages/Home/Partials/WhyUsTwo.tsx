import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function WhyUsTwo() {
    return (
        <section className="flex bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto relative pt-0 md:pt-16 z-10 pb-[300px] md:pb-[300px] px-4 md:px-0">
                {/* Laptop */}
                <img
                    src="/assets/images/home/wall-brother3.png"
                    alt=""
                    className="absolute inset-0 object-contain w-[100%] h-[100%] hidden md:block"
                />
                {/* Mobile */}
                <img
                    src="/assets/images/home/mobile.png"
                    alt=""
                    className="absolute inset-0 object-cover -z-10 w-[100%] h-[100%] block md:hidden"
                />
                <div className="flex items-center justify-center">
                    <div className="container mx-auto mt-8 flex flex-col items-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            We fix your Mobile as Original
                        </h2>
                        <p className="text-center font-sans text-gray-900 font-[500] text-lg mt-8 md:w-3/6">
                            You can choose a payment option that works for you,
                            pay less with a trade-in, connect your new iPhone to
                            your carrier and get set up quickly. You can also
                            chat with a Specialist anytime.
                        </p>
                        <div className="mt-4">
                            <button className=" text-primary font-[700] py-2 px-4 rounded">
                                Learn More
                                <ChevronRightIcon className="w-4 h-4 inline-block" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
