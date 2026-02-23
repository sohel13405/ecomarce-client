import { use,  useState } from "react";
import logo from '../../assets/Untitled-1 copy.png'
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import icon from '../../assets/icon.png'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



export default function Navbar() {

  const navigate = useNavigate()
  const { user, logOut } = use(AuthContext)

  const [open, setOpen] = useState(false);
 

 
  const axiosSecure = useAxiosSecure()

  const { data: orders = []} = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email, // prevents crash if user null
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/customer/${user.email}`);
      return res.data;
    },
  });

 

  const orderCount = orders.length;

  const handleLogOut = () => {
    logOut()
      .then(() => {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }







  return (
    <nav className="w-full bg-white shadow-md px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

        {/* Left - Search */}

        <div className="flex gap-3.5">
          <NavLink to='/dashboard'>
            <button className="btn btn-ghost">DASHBOARD</button>
          </NavLink>

          <div className="hidden md:flex items-center gap-2 w-1/2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Middle - Logo */}
        <div className="flex items-center  justify-center">
          <NavLink to='/'>
            <img
              src={logo}// put logo in public folder
              alt="logo"
              className=" w-36 lg:w-50"
            />
          </NavLink>
          {/* <span className="text-xl font-bold text-gray-800">
            Shope Cove
          </span> */}
        </div>





        {/* Right - Buttons */}

       <div className="flex items-center justify-center gap-4">

       <div className="relative group inline-block">
  
  {/* User Image */}
  <img
    className="w-10 h-10 border rounded-full cursor-pointer"
    src={user?.photoURL ? user.photoURL : icon}
    alt="profile"
  />

  {/* Hover Box */}
  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4 
                  opacity-0 invisible group-hover:opacity-100 
                  group-hover:visible transition-all duration-300 z-50">

    <p className="font-semibold text-gray-800">
      {user?.displayName || "No Name"}
    </p>

    <p className="text-sm text-gray-500">
      {user?.email}
    </p>

  </div>
</div>



        <div className="hidden md:flex items-center gap-2.5 ">
          {
            user ?
              <button onClick={handleLogOut} className=" text-gray-700 hover:text-blue-600">
                LogOut
              </button> 
              : <NavLink to='/auth/login'>
                <button className=" text-gray-700 hover:text-blue-600">
                  LogIn
                </button>
              </NavLink>
          }
          |
 
          <NavLink to='/auth/signup'>
            <button className=" text-gray-700 hover:text-blue-600">
              Sign Up
            </button>
          </NavLink>

          <NavLink to="/dashboard/my-orders" className="relative">
            <FaShoppingCart className="text-xl cursor-pointer hover:text-blue-600" />

            {orderCount > 0 && (
              <span className="
      absolute -top-2 -right-2
      bg-red-500 text-white
      text-xs font-bold
      w-5 h-5 flex items-center justify-center
      rounded-full
    ">
                {orderCount}
              </span>
            )}
          </NavLink>

        </div>

       </div>





        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">

          {/* Mobile Search */}
          <div className="flex items-center gap-2">
            <NavLink to="/dashboard/my-orders" className="flex items-center gap-2 relative">
              <FaShoppingCart />

              {orderCount > 0 && (
                <span className="
      absolute -top-2 left-4
      bg-red-500 text-white
      text-xs font-bold
      w-5 h-5 flex items-center justify-center
      rounded-full
    ">
                  {orderCount}
                </span>
              )}

              <span>My Orders</span>
            </NavLink>
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>


          {
            user ?
              <button onClick={handleLogOut} className="block w-full text-left">LogOut</button>
              : <NavLink to='/auth/login'>
                <button className="block w-full text-left">LogIn</button>
              </NavLink>
          }

          <NavLink to='/auth/signup'>
            <button className="block w-full text-left">Sign Up</button>
          </NavLink>

          <div className="flex items-center gap-2">
            <FaShoppingCart />
            <span>Cart</span>
          </div>
        </div>
      )}
    </nav>
  );
}
