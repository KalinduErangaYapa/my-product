import {
    ChatBubbleBottomCenterIcon,
    ClockIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";

const items = [
    {
        name: "Live Help",
        value: "1-888-123-45678",
        icon: PhoneIcon,
    },
    {
        name: "Opening Time",
        value: "8.00 - 18.00",
        icon: ClockIcon,
    },
    {
        name: "Live Help",
        value: "infp@brotherstech.co.sa",
        icon: ChatBubbleBottomCenterIcon,
    },
];

export default function TopHeader() {
    return (
        <div className="bg-gray-100 z-10 px-4 py-6 flex ">
            <div className="container mx-auto justify-between md:flex">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="w-[360px] mx-auto"
                />
                {/* data */}
                {/* <div className="hidden md:flex md:divide-x">
                    {items.map((item: any, index: number) => (
                        <div className="px-4 py-2" key={index}>
                            <p className="flex space-x-2">
                                <item.icon className="w-4 self-center h-4 text-primary" />
                                <span className="self-center">{item.name}</span>
                            </p>
                            <p className="font-[800]">{item.value}</p>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}
