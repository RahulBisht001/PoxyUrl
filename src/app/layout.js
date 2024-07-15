import {ClerkProvider} from "@clerk/nextjs";
import {Poppins, Outfit} from "next/font/google";

import Link from "next/link";

import Logo from "./_components/Logo";
import NavItems from "./_components/NavItems";
import Toolbar from "./_components/Toolbar";

import "./globals.css";
import Footer from "./_components/Footer";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-Outfit",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-Poppins",
});

export const metadata = {
    title: "ZypLi",
    description: "More than just a URL Shortener",
};

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${outfit.variable} ${poppins.variable}`}>
                    <header className="w-full px-6 sm:px-14 flex items-center justify-between h-[60px] font-Outfit">
                        <div className="flex items-center justify-between">
                            <Link href={"/"}>
                                <Logo />
                            </Link>
                        </div>
                        <div>
                            <NavItems />
                        </div>
                        <div className="flex items-center gap-3 ">
                            <Toolbar />
                        </div>
                    </header>
                    <main>{children}</main>

                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
