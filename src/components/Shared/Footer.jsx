import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Mail, X } from "lucide-react";
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-300 mt-20">
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <img className="w-48" src={logo} alt="" />
          <p className="text-sm leading-6 text-gray-400">
            Your trusted destination for premium electronics and
            modern gadgets. Shop smart. Shop easy.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="https://www.facebook.com/s.13405" className="p-3 bg-slate-700 rounded-full hover:bg-blue-600 transition">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/" className="p-3 bg-slate-700 rounded-full hover:bg-pink-500 transition">
              <Instagram size={18} />
            </a>
            <a href="https://www.x.com/" className="p-3 bg-slate-700 rounded-full hover:bg-sky-500 transition">
              <X size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/allproducts" className="hover:text-white transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contactus" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">
            Customer Service
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="#" className="hover:text-white transition">FAQs</Link></li>
            <li><Link to="#" className="hover:text-white transition">Shipping & Returns</Link></li>
            <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">
            Subscribe
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Get updates about new products and special offers.
          </p>

          <div className="flex items-center bg-slate-700 rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 bg-transparent outline-none text-sm text-white"
            />
            <button className="px-4 bg-blue-600 hover:bg-blue-700 transition">
              <Mail size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-700 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShopeCove. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;