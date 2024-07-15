"use client";

import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <div className="font-Outfit flex items-center justify-center mt-20">
                <SignIn signUpUrl="/sign-up" />
            </div>
        </>
    );
}
