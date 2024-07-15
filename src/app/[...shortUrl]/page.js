"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";

const page = () => {
    let pathname = usePathname();
    pathname = pathname.substring(1);

    useEffect(() => {
        if (pathname) {
            fetchShortUrl(pathname); // Function to handle fetching short URL data
        }
    }, [pathname]);

    const fetchShortUrl = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/${pathname}`);

            if (response.ok) {
                const {originalUrl} = await response.json();
                console.log(originalUrl);
                window.location.href = originalUrl; // Redirect to the original URL
            } else {
                console.error("Error fetching short URL:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching short URL:", error);
        }
    };

    return (
        <>
            <h1>Loading...</h1>
            {/* Placeholder or loading indicator */}
        </>
    );
};

export default page;
