import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-[#1c1c1c] text-white text-[10px] tracking-widest uppercase">
      <div className="container-main h-10 flex items-center">

        {/* LEFT: Utility links */}
        <div className="flex items-center gap-8 text-neutral-300 font-medium">
          <Link
            to="/about"
            className="cursor-pointer hover:text-white transition"
          >
            About Us
          </Link>
          <span className="cursor-pointer hover:text-white transition">
            Offers
          </span>
          <span className="cursor-pointer hover:text-white transition">
            Help
          </span>
        </div>

        {/* CENTER: Offer text */}
        <div className="flex-1 text-center tracking-[0.15em] font-medium text-white/90">
          USE CODE MAISHA10 AND GET 10% OFF ON ALL ORDERS EXCEPT DISCOUNTED PRODUCTS
        </div>

        {/* RIGHT: Social icons */}
        <div className="flex items-center gap-4 text-white text-sm">
          <FaFacebook className="cursor-pointer hover:text-neutral-300 transition" />
          <FaInstagram className="cursor-pointer hover:text-neutral-300 transition" />
          <FaYoutube className="cursor-pointer hover:text-neutral-300 transition" />
          <FaPinterest className="cursor-pointer hover:text-neutral-300 transition" />
          <FaLinkedin className="cursor-pointer hover:text-neutral-300 transition" />
        </div>

      </div>
    </div>
  );
};

export default TopBar;
