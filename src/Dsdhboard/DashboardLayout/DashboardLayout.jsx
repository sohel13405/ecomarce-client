
import { use, useState } from "react";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import logo from "../../assets/Untitled-1 copy.png";
import {
  FaBars,
  FaClipboardList,
  FaPlus,
  FaShoppingBag,
  FaSignOutAlt,
  FaStore,
  FaUser,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { SidebarLink } from "../SidebarLink";
import { AuthContext } from "../../components/auth/AuthContext";
import Swal from "sweetalert2";
import { Box } from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false); // default closed for mobile
  const [role, isRoleLoading] = useRole();
  const { logOut } = use(AuthContext);
  const navigate = useNavigate();

  if (isRoleLoading) return <LoadingSpinner />;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1800,
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="lg:flex min-h-screen bg-gray-100 relative">
      
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
   
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-screen
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        w-72 bg-black text-white transition-transform duration-300 flex flex-col `}
      >

        {/* Logo + Close Button */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <NavLink to="/">
            <img className="w-36" src={logo} alt="logo" />
          </NavLink>

          {/* Close button mobile */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">

          {role === "customer" && (
            <>
              <h1 className="text-xl font-bold mb-6">Customer</h1>

              <SidebarLink
                open={true}
                to="/dashboard/my-orders"
                icon={<FaShoppingBag />}
                text="My Orders"
              />
              <SidebarLink
                open={true}
                to="/dashboard/become-seller"
                icon={<FaStore />}
                text="Become A Seller"
              />
            </>
          )}

          {role === "seller" && (
            <>
              <h1 className="text-xl font-bold mb-6">Seller</h1>

              <SidebarLink
                open={true}
                to="/dashboard/manage-product"
                icon={<Box />}
                text="Manage Product"
              />
              <SidebarLink
                open={true}
                to="/dashboard/add-product"
                icon={<FaPlus />}
                text="Add Product"
              />
              <SidebarLink
                open={true}
                to="/dashboard/manage-orders"
                icon={<FaClipboardList />}
                text="Manage Orders"
              />
            </>
          )}

          {role === "admin" && (
            <>
              <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

              <SidebarLink
                open={true}
                to="/dashboard/statistics"
                icon={<FaUsers />}
                text="Statistics"
              />
              <SidebarLink
                open={true}
                to="/dashboard/manage-users"
                icon={<FaUsers />}
                text="Manage Users"
              />
            </>
          )}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 space-y-2 border-t border-white/10">
          <SidebarLink
            open={true}
            to="/dashboard/profile"
            icon={<FaUser />}
            text="Profile"
          />
          <button
            onClick={handleLogOut}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar (Mobile) */}
        <div className="lg:hidden bg-white shadow px-4 py-3 flex items-center">
          <button onClick={() => setOpen(true)}>
            <FaBars size={22} />
          </button>
          <h1 className="ml-4 font-semibold">Dashboard</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-2xl p-4 lg:p-6 min-h-full shadow-sm">
            <Outlet />
          </div>
        </main>
   
      </div>
      
    </div>
  );
}

export default DashboardLayout;