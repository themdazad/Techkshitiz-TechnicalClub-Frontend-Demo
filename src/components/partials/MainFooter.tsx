import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";

function MainFooter() {
  return (
    <footer className="bg-[#020617] text-white border-t-[1px] border-[#182746] flex flex-wrap-reverse justify-center max-sm:text-center md:justify-between items-center py-4  px-[5%] max-sm:gap-4">
      <p className="text-sm">
        Techkshitiz {new Date().getFullYear()}, ©Copyright reserved.
        <br />
        Maintained with <span className="text-red-600">❤</span> By{" "}
        <NavLink className="font-semibold text-[#ece528cf]" to="/">
          Technical Club, GEC Siwan
        </NavLink>
      </p>
      <div className="icons flex items-center space-x-4 text-xl">
        <NavLink to="mailto:techkshitiz.in@gmail.com" target="_blank">
          <MdEmail />
        </NavLink>
        <NavLink to="https://www.youtube.com/@techkshitiz" target="_blank">
          <FaYoutube />
        </NavLink>
        <NavLink to="https://www.instagram.com/techkshitiz/" target="_blank">
          <FaInstagram />
        </NavLink>
        <NavLink
          to="https://www.linkedin.com/company/techkshitiz/"
          target="_blank"
        >
          <FaLinkedinIn />
        </NavLink>
        <NavLink to="https://twitter.com/techkshitiz/" target="_blank">
          <FaTwitter />
        </NavLink>
        <NavLink
          to="https://www.facebook.com/profile.php?id=61559032444292&mibextid=ZbWKwL"
          target="_blank"
        >
          <FaFacebook />
        </NavLink>
      </div>
    </footer>
  );
}

export default MainFooter;
