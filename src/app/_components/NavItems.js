"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const NavItems = () => {
    const navItems = [
        {title: "Home", url: "/"},
        {title: "API's", url: "/api-v1"},
        {title: "Extension", url: "/extension"},
        {title: "System Design", url: "/blogs"},
        {title: "Features", url: "/features"},
        {title: "About", url: "/about"},
    ];

    return (
        <>
            <div className="w-full hidden md:flex items-center tracking-wide font-Outfit">
                {navItems.map((item, index) => {
                    const isActive = usePathname() === item.url;

                    return (
                        <Link
                            key={index}
                            href={item.url}
                            className={`px-4 py-[6px] text-base hover:text-[#f29c11] ${
                                isActive ? "text-[#f29c11]" : "text-gray-600"
                            }`}
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default NavItems;
