import {socials} from "@/utils/social";
import Link from "next/link";

const Footer = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="fixed bottom-1 font-Outfit">
                    {/* <div className="flex items-center justify-center gap-x-6 sm:gap-x-2 md:w-[400px]">
                        {socials.map((social) => (
                            <a
                                key={social.id}
                                className="flex items-center justify-center flex-1 cursor-pointer group md:hover:shadow-outline-gray rounded-[9px] p-2 text-white text-3xl gap-4"
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                                <div className="text-xs sm:text-sm space-y-1">
                                    <p className="text-white transition font-medium">{social.name}</p>
                                    <p className="text-[#5a5b63]">{social.handle}</p>
                                </div>
                            </a>
                        ))}
                    </div> */}

                    <p className="text-sm text-slate-200 text-center mt-2">
                        Made with ❤️ By &nbsp;&nbsp;
                        <Link href="rahulbisht.com" target="_blank" className="text-green-400 underline">
                            RahulB
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;
