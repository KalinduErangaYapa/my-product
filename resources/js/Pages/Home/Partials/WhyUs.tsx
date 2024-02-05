import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function WhyUs() {
    return (
        <section className="flex bg-slate-50 ">
            <div className="container mx-auto relative pt-16 pb-[550px]">
                <img
                    src="/assets/images/home/wall-brother2.png"
                    alt=""
                    className="absolute bottom-0 left-0 top-0 object-contain w-[100%] h-[100%]"
                />
                <div className="flex items-center justify-center">
                    <div className="container mx-auto mt-8 flex flex-col items-center">
                        <h2 className="text-center text-gray-900 font-[800] font-display text-5xl">
                            Why Brothers Tech is the <br /> best place to fix
                            your phone
                        </h2>
                        <p className="text-center font-sans text-gray-900 font-[500] text-lg mt-8 w-3/6">
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
