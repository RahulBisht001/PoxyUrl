"use client";
import React from "react";
import {UserProfile, useClerk} from "@clerk/nextjs";

const Page = () => {
    const {user} = useClerk();
    return (
        <>
            <div className="flex items-center justify-center mt-5 font-Outfit">
                {user && <UserProfile routing="path" path="/profile" />}
            </div>
        </>
    );
};

export default Page;
