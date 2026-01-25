
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaStore,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";
import { SidebarLink } from "../SidebarLink";
import { NavLink, Outlet } from "react-router";
import TopNavbar from "../../components/Shared/TopNavbar";

import logo from '../../assets/Untitled-1 copy.png'



export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  return (
    
    <div>
        <TopNavbar></TopNavbar>
        <div className="flex min-h-screen bg-gray-100">

        

{/* Sidebar */}
<aside
  className={`${
    open ? "w-72" : "w-20"
  } bg-black text-white transition-all duration-300 flex flex-col`}
>
  {/* Logo */}
  <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
    <NavLink to='/'>
    <img className="w-48 " src={logo} alt="" />
    </NavLink>
    <button onClick={() => setOpen(!open)}>
      <FaBars size={20} />
    </button>
  </div>

  {/* Menu */}
  <nav className="flex-1 px-3 py-6 space-y-2">
    {/* <SidebarLink open={open} to="/dashboard" icon={<FaTachometerAlt />} text="Dashboard" /> */}
    <SidebarLink open={open} to="/dashboard/my-orders" icon={<FaShoppingBag />} text="My Orders" />
    <SidebarLink open={open} to="/dashboard/become-seller" icon={<FaStore />} text="Become a Seller" />
    <SidebarLink open={open} to="/dashboard/add-product" icon={<FaPlus />} text="Add Product" />
    <SidebarLink open={open} to="/dashboard/manage-orders" icon={<FaClipboardList />} text="Manage Orders" />
    <SidebarLink open={open} to="/dashboard/manage-users" icon={<FaUsers />} text="Manage Users" />
  </nav>

  {/* Bottom */}
  <div className="px-3 pb-6 space-y-2 border-t border-white/10">
    <SidebarLink open={open} to="/dashboard/profile" icon={<FaUser />} text="Profile" />
    <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-white/10 transition">
      <FaSignOutAlt />
      {open && <span>Logout</span>}
    </button>
  </div>
</aside>

{/* Main Content */}
<main className="flex-1 p-6">
  <div className="bg-white rounded-2xl p-6 min-h-full shadow-sm">
    <Outlet />
  </div>
</main>
</div>
    </div>
  );
}