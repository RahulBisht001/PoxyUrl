"use client";

import {useState} from "react";
import "dotenv/config";

const InputBar = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortURL, setShortURL] = useState("");

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
            console.log("Shortened URL:", data.shortId); // Adjust according to server response structure
            // Handle success, e.g., update UI with shortened URL
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle error, e.g., show error message to user
        });
    };

    return (
        <>
            <section className="w-full sm:max-w-[40rem] mx-10" aria-labelledby="url-shortener-form">
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
        </>
    );
};

export default InputBar;
