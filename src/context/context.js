"use client";

import {createContext, useState} from "react";

export const UrlContext = createContext({});

export const UrlProvider = ({children}) => {
    const [shortUrl, setShortUrl] = useState("");
    return (
        <>
            <UrlContext.Provider value={{shortUrl, setShortUrl}}>{children}</UrlContext.Provider>
        </>
    );
};
