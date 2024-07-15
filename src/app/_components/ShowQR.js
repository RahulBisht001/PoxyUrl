import {useContext, useRef} from "react";
import {Box, Modal} from "@mui/material";
import {ICONS} from "@/utils/icons";
import {UrlContext} from "@/context/context";

import QR_Code from "./QR_Code";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#000",
    color: "#f29c11",
    border: "1px solid #6e7a89",
    borderRadius: "15px",
    boxShadow: 24,
    p: 2,
};

const ShowQR = ({open, setOpen}) => {
    const {shortUrl} = useContext(UrlContext);
    const qrRef = useRef(null);

    const handleDownload = async () => {
        alert("This is not implemented yet");
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {shortUrl ? (
                        <>
                            <h1 className="font-Outfit text-lg font-semibold text-center mb-4">Your QR</h1>
                            <div className="rounded-md flex flex-col gap-3 justify-center items-center">
                                <QR_Code />

                                <div className="flex justify-center gap-10 text-white">
                                    <button onClick={handleDownload}>{ICONS.Download}</button>
                                    <button>{ICONS.Share}</button>
                                </div>
                            </div>
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

export default ShowQR;
