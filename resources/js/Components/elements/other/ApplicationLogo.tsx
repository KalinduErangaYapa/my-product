import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/assets/images/logo.png"
            width={120}
            height={80}
            className="object-contain w-[240px] h-[auto]"
            alt=""
        />
    );
}
