const logos = [
    "/assets/images/home/logo/1.png",
    "/assets/images/home/logo/2.png",
    "/assets/images/home/logo/3.png",
    "/assets/images/home/logo/4.png",
    "/assets/images/home/logo/5.png",
];
export default function Brands() {
    return (
        <div className={`relative isolate overflow-hidden py-16 h-auto`}>
            <div className=" mx-auto grid grid-cols-2 md:grid-cols-5  justify-center">
                {logos.map((logo: any, index: number) => (
                    <div className="bg-white border border-slate-50 p-4 flex justify-center py-16">
                        <img
                            src={logo}
                            alt=""
                            className="object-contain h-[50px] self-center"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
