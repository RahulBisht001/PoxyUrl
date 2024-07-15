import React, {useContext} from "react";
import {useQRCode} from "next-qrcode";
import {UrlContext} from "@/context/context";

const QR_Code = () => {
    const {Canvas} = useQRCode();
    const {shortUrl} = useContext(UrlContext);

    return (
        <>
            <Canvas
                text={shortUrl}
                options={{
                    errorCorrectionLevel: "M",
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                        dark: "#000",
                        light: "#fff",
                    },
                }}
            />
        </>
    );
};

export default QR_Code;
