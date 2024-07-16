"use client";

import React, {useEffect, useState} from "react";
import {useAuth} from "@clerk/nextjs";
import Link from "next/link";

import {ICONS} from "@/utils/icons";

const LinkData = () => {
    const {getToken} = useAuth();
    const [links, setLinks] = useState([]);
    useEffect(() => {
        handleFetchAllUrls();
        // Fetch URLs when the component mounts
    }, []);

    const handleDeleteUrl = async (shortId) => {
        try {
            // Get the authentication token from Clerk
            const authToken = await getToken();

            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/link/${shortId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Add your session token or any other authentication headers
                    // Example:
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete the URL");
            }
            const res = await response.json();
            console.log(res.message);

            setLinks((prevLinks) => prevLinks.filter((link) => link.shortId !== shortId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchAllUrls = async () => {
        try {
            // Get the authentication token from Clerk
            const authToken = await getToken();

            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/links/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Add your session token or any other authentication headers
                    // Example:
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const res = await response.json();
                console.log(res.urls);
                setLinks(res.urls);
                // Assuming your backend responds with an array of URLs
            } else {
                throw new Error("Failed to fetch URLs");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefresh = () => {
        handleFetchAllUrls();
    };

    return (
        <>
            <section className="font-Outfit text-slate-400">
                <div className="flex  justify-between">
                    <div className="flex flex-col mb-4">
                        <h1 className="text-lg font-semibold tracking-wider">Dashboard</h1>
                        <div className="h-[2px] bg-[#f29c11] w-full"></div>
                    </div>

                    <div>
                        <button
                            className="bg-slate-900 text-[#f29c11] py-1 px-3 rounded-md flex gap-2 justify-center items-center shadow-sm shadow-[#f29c11]"
                            onClick={() => handleRefresh()}
                        >
                            <span>{ICONS.Reset}</span>
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                <div className=" mt-2 font-Outfit">
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-8 text-white">
                        {links &&
                            links.map((link, index) => {
                                return (
                                    <>
                                        <div
                                            key={index}
                                            className="bg-[#252525] shadow-sm rounded-xl p-3 hover:cursor-pointer hover:shadow-slate-500"
                                        >
                                            <div className="p-2">
                                                <div className="flex justify-between items-center">
                                                    <h1 className="font-semibold text-lg mt-0 mb-5">{link.linkName}</h1>
                                                    <button
                                                        className="mt-0 mb-5"
                                                        onClick={() => handleDeleteUrl(link.shortId)}
                                                    >
                                                        {ICONS.Delete}
                                                    </button>
                                                </div>

                                                <p className="my-2">{`${process.env.FRONTEND_URL}/${link.shortId}`}</p>
                                                <div className="flex justify-between items-center text-sm mt-4">
                                                    <Link
                                                        href={`${process.env.FRONTEND_URL}/${link.shortId}`}
                                                        target="_blank"
                                                        className="text-[#f29c11]"
                                                    >
                                                        Go to URL
                                                    </Link>
                                                    <Link
                                                        href={`${process.env.FRONTEND_URL}/dashboard/${link.shortId}`}
                                                        className="text-[#f29c11]"
                                                    >
                                                        View Analytics
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default LinkData;
