import { GrFacebookOption } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FiSend } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8 mt-auto">
      <div className=" px-10 text-[15px] sm:text-[16px]">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between mb-12">
          <div className="w-full md:w-[30%]">
            <h3 className="text-xl font-bold font-serif mb-4">AH DENIM</h3>
            <p className="text-gray-400 font-normal">
              Premium denim products crafted with excellence. Discover our
              collection of high-quality denim wear for all ages.
            </p>
          </div>

          <div>
            <h4 className="font-bold font-serif mb-4">Contact Support</h4>

            <div className="flex flex-col gap-2 font-normal text-gray-400 my-4">
              <div>Email Us</div>
              <div>Natalia@ahdenim.net</div>
            </div>

            <div className="flex flex-col gap-2 font-normal text-gray-400 my-4">
              <div>Phone Number</div>
              <div>+92 324 8270610</div>
            </div>

            <div className="font-normal my-3">
              <Link to="/ContactUS">
                <button className="flex gap-2 items-center bg-[#ffffff] text-[#222222] p-3 rounded-lg">
                  Send Message
                  <FiSend size={20} />
                </button>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-serif mb-4">About AH Denim</h4>
            <ul className="space-y-2 font-normal">
              <li>
                <Link
                  to="/AboutUs#about-us"
                  className="text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/AboutUs#our-video"
                  className="text-gray-400 hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/AboutUs#our-expo"
                  className="text-gray-400 hover:text-white"
                >
                  Our Expo
                </Link>
              </li>

              <li>
                <Link
                  to="/AboutUs#overview"
                  className="text-gray-400 hover:text-white"
                >
                  Overview
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-serif mb-4">Categories</h4>
            <ul className="space-y-2 font-normal">
              <li>
                <Link
                  to="/Items?category=Man"
                  className="text-gray-400 hover:text-white"
                >
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/Items?category=Woman"
                  className="text-gray-400 hover:text-white"
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/Items?category=Kids"
                  className="text-gray-400 hover:text-white"
                >
                  Kids' Collection
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 font-normal">
            © 2024 Cli-X. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="#"
              className="text-gray-400 hover:text-blue-700 hover:border-white/60"
            >
              <GrFacebookOption size={22} />
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-white/100  hover:border-white/60"
            >
              <FaXTwitter size={22} />
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-pink-500 hover:border-white/60"
            >
              <BsInstagram size={22} />
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-red-600  hover:border-white/60"
            >
              <FaYoutube size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
