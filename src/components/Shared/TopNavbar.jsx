import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  return (
    <nav className="w-full bg-gray-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">

          {/* Left Links */}
          <div className="hidden md:flex items-center gap-6">
          <a href='/' className="hover:text-yellow-400">Home</a>
            <a href='/about' className="hover:text-yellow-400">About</a>
            <a href="#" className="hover:text-yellow-400">Contact Us</a>
            <a href="#" className="hover:text-yellow-400">Location</a>
            <a href="#" className="hover:text-yellow-400">Help</a>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5">

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <FaFacebookF className="cursor-pointer hover:text-blue-400" />
              <FaTwitter className="cursor-pointer hover:text-sky-400" />
              <FaInstagram className="cursor-pointer hover:text-pink-400" />
            </div>

            {/* Country Flag */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="USA"
                className="w-5 h-4"
              />
              <span>USA</span>
            </div>

            {/* Currency Dropdown */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-900 border border-gray-600 rounded px-2 py-1 focus:outline-none"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BDT">BDT</option>
              <option value="INR">INR</option>
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
          <div className="md:hidden py-4 space-y-4 border-t border-gray-700">

            {/* Links */}
            <div className="flex flex-col gap-3">
              <a href='/'>Home</a>
              <a href='/about'>About</a>
              <a href="#">Contact Us</a>
              <a href="#">Location</a>
              <a href="#">Help</a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </div>

            {/* Country & Currency */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="USA"
                className="w-5 h-4"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gray-900 border border-gray-600 rounded px-2 py-1"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>BDT</option>
                <option>INR</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
