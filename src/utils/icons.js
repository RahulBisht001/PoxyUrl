import {FaLinkedinIn} from "react-icons/fa6";
import {FaTwitter} from "react-icons/fa";
import {PiSignInBold} from "react-icons/pi";
import {FaAngleUp, FaAngleDown} from "react-icons/fa6";
import {IoQrCodeSharp} from "react-icons/io5";
import {FaChartLine} from "react-icons/fa";
import {GrPowerReset} from "react-icons/gr";
import {HiDownload} from "react-icons/hi";
import {IoIosShareAlt} from "react-icons/io";

import {BsEmojiSmileUpsideDown} from "react-icons/bs";
import {IoTrash} from "react-icons/io5";

export const ICONS = {
    linkedin: <FaLinkedinIn />,
    twitter: <FaTwitter />,
    up: <FaAngleUp />,
    down: <FaAngleDown />,
    login: <PiSignInBold />,
    QR: <IoQrCodeSharp />,
    Analytics: <FaChartLine />,
    Reset: <GrPowerReset />,
    Download: <HiDownload size={30} />,
    Share: <IoIosShareAlt size={30} />,
    Sad: <BsEmojiSmileUpsideDown size={30} />,
    Delete: <IoTrash size={16} />,
};
