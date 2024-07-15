"use client";

import {SignUp} from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <div className="font-Outfit flex items-center justify-center mt-20">
                <SignUp signInUrl="/sign-in" />
            </div>
        </>
    );
}
