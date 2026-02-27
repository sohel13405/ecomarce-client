import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import CategoryDropdown from "../../pages/CategoryDropdown";
import { Link } from "react-router";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("BDT");

  return (
    <nav className="w-full bg-[#89A8B2] text-white text-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto  px-4">
        <div className="flex items-center justify-between h-12">

          {/* Left Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-yellow-400">
              Home
            </Link>

           
            <CategoryDropdown />

            <Link to="/about" className="hover:text-yellow-400">
              About
            </Link>

            <Link to="/contactus" className="hover:text-yellow-400">
              Contact Us
            </Link>

            <a href="#" className="hover:text-yellow-400">
              Location
            </a>

            <a href="#" className="hover:text-yellow-400">
              Help
            </a>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5">

            <div className="flex items-center gap-3">
              <Link to='https://www.facebook.com/s.13405'>
              <FaFacebookF className="cursor-pointer hover:text-blue-400" />
              </Link>

              <Link to='https://x.com/'>
              <FaTwitter className="cursor-pointer hover:text-sky-400" />
              </Link>

              <FaInstagram  className="cursor-pointer hover:text-pink-400" />
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1280px-Flag_of_Bangladesh.svg.png"
                alt="BD"
                className="w-5 h-4"
              />
              <span>BD</span>
            </div>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#416f7f] border border-gray-600 rounded px-2 py-1 focus:outline-none"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BDT">BDT</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-300 text-black ">

            <div className="flex flex-col gap-3">
              <Link to="/">Home</Link>
              <CategoryDropdown />
              <Link to="/about">About</Link>
              <Link to="/contactus">Contact Us</Link>
            </div>

            <div className="flex gap-4 pt-2">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        )}
      </div>
    </nav>
  );

}