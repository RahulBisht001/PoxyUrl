"use client";

import {useState} from "react";
import {useClerk} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {ICONS} from "@/utils/icons";

const Toolbar = () => {
    const {user, signOut} = useClerk();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logoutHandler = () => {
        // Implement logout functionality here with clerk auth
        alert("Log out button clicked");
        signOut();
        router.push("/");
    };

    return (
        <>
            {user ? (
                <>
                    <Image
                        src={user?.imageUrl}
                        alt="User Image"
                        width={35}
                        height={35}
                        className="rounded-full border-blue-500 border-2"
                    />
                    <button onClick={toggleDropdown} className="items-center focus:outline-none">
                        {isOpen ? ICONS.up : ICONS.down}
                    </button>

                    {isOpen && (
                        <div className="absolute top-16 right-5 w-36 bg-[#1c1d1f] rounded-xl text-sm p-1">
                            <Link href="/profile">
                                <p
                                    className="px-4 py-2 text-slate-300 rounded-lg hover:bg-[#121212]
                                "
                                >
                                    Profile
                                </p>
                            </Link>
                            <Link href="/dashboard">
                                <p className="px-4 py-2 text-slate-300 rounded-lg hover:bg-[#121212]">Dashboard</p>
                            </Link>
                            <p
                                className="px-4 py-2 cursor-pointer rounded-lg hover:bg-[#121212] text-red-500"
                                onClick={logoutHandler}
                            >
                                Logout
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <button className="px-4 py-1 rounded-md border border-black hover:border-[#f29c11] text-gray-500 hover:text-[#f29c11] ">
                        <div className="font-medium">
                            <Link href={"/sign-in"} className="flex gap-3 justify-center items-center">
                                <p> Login</p>
                                {ICONS.login}
                                {/* <PiSignInBold size={20} /> */}
                            </Link>
                        </div>
                    </button>
                </>
            )}
        </>
    );
};

export default Toolbar;
