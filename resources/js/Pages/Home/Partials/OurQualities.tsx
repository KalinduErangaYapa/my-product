import { text } from "stream/consumers";

const items = [
    {
        image: "/assets/images/home/Man.png",
        title: (
            <span>
                100% <br /> Transparency
            </span>
        ),
        text: (
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                perferendis autem
            </span>
        ),
    },
    {
        image: "/assets/images/home/settings-icon.png",
        title: (
            <span>
                High Quality <br /> Parts
            </span>
        ),
        text: (
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                perferendis autem
            </span>
        ),
    },
    {
        image: "/assets/images/home/Expert.png",
        title: (
            <span>
                Expert <br />
                Technicians
            </span>
        ),
        text: (
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                perferendis autem
            </span>
        ),
    },
    {
        image: "/assets/images/home/Clock.png",
        title: (
            <span>
                Super Quick
                <br /> Service
            </span>
        ),
        text: (
            <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                perferendis autem
            </span>
        ),
    },
];

export default function OurQualities() {
    return (
        <section
            className={`relative isolate overflow-hidden h-auto py-12 bg-slate-50`}
        >
            <div className=" grid md:grid-cols-4 justify-center gap-4">
                {items.map((item: any, index: number) => (
                    <div className="p-4">
                        <div
                            key={index}
                            className="space-y-4 text-center bg-white shadow p-4 rounded-lg"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="mx-auto object-contain w-[100px] h-[100px] self-center"
                            />
                            <h6 className="text-center text-black-500 font-display font-[800] text-xl">
                                {item.title}
                            </h6>
                            <p className="text-sm">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
