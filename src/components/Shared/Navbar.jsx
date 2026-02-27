import { use, useEffect, useState } from "react";
import logo from '../../assets/logo.png'
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import icon from '../../assets/icon.png'
import useCart from "../../hooks/useCart";




export default function Navbar() {

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('')



  const navigate = useNavigate()
  const { user, logOut } = use(AuthContext)

  const [open, setOpen] = useState(false);

  const { data: cart = [] } = useCart(user?.email);



  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearch(query);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/products?search=${search}`);
  };

 

  const orderCount = cart.length;

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
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 p-2">

        {/* Left - Search */}

        <div className="flex gap-3">
          <NavLink to='/dashboard'>
            <button className="btn btn-ghost">DASHBOARD</button>
          </NavLink>

          <form onSubmit={handleSearch} className="hidden md:flex items-center  w-2/5">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-l-md outline-none w-64"
            />
            <button type="submit" className="px-4 py-2 bg-[#476778] text-white rounded-r-md">search</button>
          </form>

        </div>

        {/* Middle - Logo */}
        <div className="flex items-center   justify-center">
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
              className=" hidden lg:block w-10 h-10 border rounded-full cursor-pointer"
              src={user?.photoURL ? user.photoURL : icon}
              alt="profile"
            />

            {/* Hover Box */}
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4 
                  opacity-0 invisible group-hover:opacity-100 
                  group-hover:visible transition-all duration-300 z-50">

              <p className="font-semibold text-gray-800"> Name:
                {user?.displayName || "No Name"}
              </p>

              <p className="text-sm text-gray-500">
                Email:
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

            <NavLink to="/dashboard/cartitems" className="relative">
              <FaShoppingCart className="text-xl cursor-pointer hover:text-blue-600" />


              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full badge">
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
        <div className="md:hidden bg-white border-t px-4 py-5 space-y-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />





          {/* Divider */}
          <div className=" pt-4 space-y-3">

            {user ? (
              <button
                onClick={handleLogOut}
                className="block w-full text-left py-2"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/auth/login" className="block py-2">
                  Login
                </NavLink>
                <div className="border border-gray-100"></div>
                <NavLink to="/auth/signup" className=" py-2">
                  Sign Up
                </NavLink>
              </>
            )}

          </div>

          {/* Cart */}
          <NavLink to="/dashboard/cartitems" className="relative">
            <FaShoppingCart className="text-xl cursor-pointer hover:text-blue-600" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      )}
    </nav>
  );
}
