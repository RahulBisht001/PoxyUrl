"use client";

import {useEffect, useState} from "react";

import {ICONS} from "@/utils/icons";
import {usePathname} from "next/navigation";
import LocationChart from "@/app/_components/LocationChart";
import BrowserChart from "@/app/_components/BrowserChart";
import OsChart from "@/app/_components/OsChart";

const page = () => {
    let pathname = usePathname();
    let segments = pathname.split("/");

    let shortId = segments[segments.length - 1];

    const [analytics, setAnalytics] = useState([]);
    const [isData, setIsData] = useState(false);

    useEffect(() => {
        handleLinkAnalytics(shortId);
    }, []);

    const handleLinkAnalytics = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/link/${shortId}`, {
                method: "GET",
                headers: {
                    // Add headers if needed, such as authorization headers
                    "Content-Type": "application/json",
                    // Add your session token or any other authentication headers
                    // Example:
                    // "Authorization": `Bearer ${sessionToken}`
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Analytics. Please refresh");
            }
            const res = await response.json();
            setIsData(true);
            // alert(isData);
            setAnalytics(res.data);
            // console.log(analytics);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefreshAnalytics = () => {
        // alert(shortId);
        handleLinkAnalytics(shortId);
    };

    return (
        <>
            <section className="font-Outfit text-slate-400 p-5 px-14">
                <div className="flex  justify-between">
                    <div className="flex flex-col mb-4">
                        <h1 className="text-lg font-semibold tracking-wider">Link Analytics</h1>
                        <div className="h-[2px] bg-[#f29c11] w-full"></div>
                    </div>

                    <div>
                        <button
                            className="bg-slate-900 text-[#f29c11] py-1 px-3 rounded-md flex gap-2 justify-center items-center shadow-sm text-base shadow-[#f29c11]"
                            onClick={() => handleRefreshAnalytics()}
                        >
                            <span>{ICONS.Reset}</span>
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                <h1 className="text-base">Total Clicks : {analytics.length} </h1>
                <div className="flex gap-4">
                    {isData && <LocationChart analyticsData={analytics} />}
                    {isData && <BrowserChart analyticsData={analytics} />}
                    {isData && <OsChart analyticsData={analytics} />}
                </div>
            </section>
        </>
    );
};

export default page;
