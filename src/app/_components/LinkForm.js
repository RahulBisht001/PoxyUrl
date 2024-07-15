"use client";

import {useContext, useState} from "react";

import {ICONS} from "@/utils/icons";
import ShowQR from "./ShowQR";
import {UrlContext} from "@/context/context";
import SaveLink from "./SaveLink";

const LinkForm = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);

    const {shortUrl, setShortUrl} = useContext(UrlContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            originalUrl,
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        };

        fetch(`${process.env.BACKEND_URL}/api/v1/shorten`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response.json(); // Assuming server responds with JSON
        })
        .then((data) => {
            console.log("Shortened URL:", data.shortId);
            // Adjust according to server response structure
            // Handle success, e.g., update UI with shortened URL

            setShortUrl(`${process.env.FRONTEND_URL}/${data.shortId}`);
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle error, e.g., show error message to user
        });
    };

    const handleRefresh = () => {
        setShortUrl(""); // Clear the shortened URL
        setOriginalUrl(""); // Optionally clear the original URL
    };

    return (
        <>
            <section className="w-full sm:max-w-[40rem] mx-10 font-Outfit" aria-labelledby="url-shortener-form">
                <form id="url-shortener-form" className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
                    {/* ========================= */}
                    {/* Version 2 */}
                    <div className="searchbox-wrap">
                        <label htmlFor="og-link" className="sr-only">
                            Original long URL
                        </label>
                        <input
                            type="url"
                            name="og-link"
                            id="og-link"
                            autoComplete="off"
                            required
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            placeholder="Paste the link here"
                            aria-label="Original long URL"
                        />
                        <button id="inputButton" type="submit">
                            <span>Shorten!</span>{" "}
                        </button>
                    </div>
                    {/* ========================= */}

                    {/* ----------------------------------- */}
                    {/* Version 1 */}

                    {/* <div className="flex my-5 h-12 w-full">
                        <label htmlFor="og-link" className="sr-only">
                            Original long URL
                        </label>
                        <input
                            type="url"
                            name="og-link"
                            id="og-link"
                            required
                            // value={value}
                            // onChange={(e) => setValue(e.target.value)}
                            className="w-full px-4 py-3 focus:outline-none rounded-l-lg font-[400] bg-slate-200"
                            placeholder="Paste the link here"
                            aria-label="Original long URL"
                        />
                        <button
                            type="submit"
                            className="bg-[#f29c11] text-black font-semibold px-1 sm:px-3 focus:outline-none rounded-r-lg flex items-center"
                        >
                            Shorten!
                        </button>
                    </div> */}
                    {/* ----------------------------------- */}
                </form>
            </section>

            {/* Display Shortened URL */}
            {shortUrl && (
                <div className="mt-5 flex">
                    <p className="text-base text-[#f29c11]">Shortened URL : &nbsp;</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {shortUrl}
                    </a>
                </div>
            )}

            {/* Button for various functionality on the link */}
            <div className="text-gray-600 flex gap-4 mt-5">
                <button
                    className="text-[#f29c11] p-2 rounded-lg shadow-sm shadow-[#f29c11] bg-black hover:bg-black normal-case font-Outfit tracking-wider flex justify-center items-center gap-3"
                    onClick={() => setOpen(true)}
                >
                    {ICONS.QR}
                    <p>Generate QR</p>
                </button>
                <button
                    className="text-[#f29c11] p-2 rounded-lg shadow-sm shadow-[#f29c11] bg-black hover:bg-black normal-case font-Outfit tracking-wider flex justify-center items-center gap-3"
                    onClick={() => setSave(true)}
                >
                    {ICONS.Analytics}
                    <p>Save for Analytics</p>
                </button>

                <button
                    className="text-[#f29c11] p-2 rounded-lg shadow-sm shadow-[#f29c11] bg-black hover:bg-black normal-case font-Outfit tracking-wider flex justify-center items-center gap-3"
                    onClick={() => handleRefresh()}
                >
                    {ICONS.Reset}
                    <p>Refresh</p>
                </button>
            </div>

            {open && (
                <>
                    <ShowQR open={open} setOpen={setOpen} />
                </>
            )}

            {save && (
                <>
                    <SaveLink save={save} setSave={setSave} />
                </>
            )}
        </>
    );
};

export default LinkForm;
