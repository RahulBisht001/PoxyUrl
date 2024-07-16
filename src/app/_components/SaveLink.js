"use client";

import {useContext, useState} from "react";
import {Box, Modal} from "@mui/material";
import {ICONS} from "@/utils/icons";
import {UrlContext} from "@/context/context";
import {useAuth} from "@clerk/nextjs";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "#000",
    color: "#f29c11",
    border: "1px solid #6e7a89",
    borderRadius: "15px",
    boxShadow: 24,
    p: 2,
};

const SaveLink = ({save, setSave}) => {
    const {getToken} = useAuth();

    const {shortUrl} = useContext(UrlContext);
    const [linkName, setLinkName] = useState("");

    const urlParts = shortUrl.split("/"); // Split the URL by '/'
    const shortId = urlParts[urlParts.length - 1]; // Get the last part

    const handleSaveUrl = async (e) => {
        try {
            e.preventDefault();

            // Get the authentication token from Clerk
            const authToken = await getToken();

            const requestData = {
                shortId,
                linkName,
            };

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(requestData),
            };

            fetch(`${process.env.BACKEND_URL}/api/v1/saveUrl`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.json(); // Assuming server responds with JSON
            })
            .then((data) => {
                console.log("Shortened URL:", data);
                // Adjust according to server response structure
                // Handle success, e.g., update UI with shortened URL
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error, e.g., show error message to user
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal
                open={save}
                onClose={() => setSave(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {shortUrl ? (
                        <>
                            <h1 className="font-Outfit text-lg font-semibold text-center mb-4">
                                Save The Link For Analytics
                            </h1>

                            <form action="" className="mx-4 font-Poppins">
                                <p className="text-xs my-1">Short URL*</p>
                                <input
                                    type="text"
                                    className="outline-none p-2 w-full rounded-lg bg-slate-900 font-medium font-Poppins text-sm placeholder:text-gray-500 mb-4"
                                    readOnly
                                    value={shortUrl}
                                />

                                <p className="text-xs my-1">Link Name*</p>
                                <input
                                    type="text"
                                    className="outline-none p-2 w-full rounded-lg bg-slate-900 font-medium font-Poppins text-sm placeholder:text-gray-500"
                                    placeholder="Give a name to your link"
                                    required
                                    value={linkName}
                                    onChange={(e) => setLinkName(e.target.value)}
                                />

                                <button
                                    className="bg-slate-900 hover:bg-gray-700 p-2 w-full rounded-lg mt-4 text-xs"
                                    onClick={(e) => handleSaveUrl(e)}
                                >
                                    Save The Link
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div>
                                <h1 className="font-Outfit text-base text-center mb-4 text-red-500">
                                    Please Enter a URL First!
                                </h1>
                                <span className="text-red-500 flex justify-center font-semibold">{ICONS.Sad}</span>
                            </div>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default SaveLink;
