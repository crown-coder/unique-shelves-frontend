import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";

const Socials = () => {
    return (
        <div className="w-full text-lg flex justify-center gap-3 mt-5 text-gray-400">
            <Link className="hover:text-blue-950 transition-all duration-75">
                <FaFacebook />
            </Link>
            <Link className="hover:text-blue-950 transition-all duration-75">
                <RiTwitterXFill />
            </Link>
            <Link className="hover:text-blue-950 transition-all duration-75">
                <FaInstagram />
            </Link>
            <Link className="hover:text-blue-950 transition-all duration-75">
                <RiWhatsappFill />
            </Link>
        </div>
    )
}

export default Socials
