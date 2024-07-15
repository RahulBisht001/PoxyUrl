import {React} from "react";
import LinkForm from "./_components/LinkForm";
import {UrlProvider} from "@/context/context";

export default function Home() {
    return (
        <>
            <main className="w-full flex flex-col font-Outfit items-center justify-center text-black">
                <div className="circle test-1 z-[-10]"></div>
                <div className="circle test-2 z-[-10]"></div>
                <div className="circle test-3 z-[-10]"></div>
                <header className="text-center mt-12 mb-2">
                    <h1 className="font-bold text-4xl sm:text-6xl tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400">
                        More than Just a URL
                    </h1>
                    <h1 className="font-bold text-4xl sm:text-6xl tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 ">
                        Shortener
                    </h1>
                </header>

                <UrlProvider>
                    <LinkForm />
                </UrlProvider>
            </main>
        </>
    );
}
