import { use, useState } from "react";
import logo from '../../assets/Untitled-1 copy.png'
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import { UserIcon } from "lucide-react";


export default function Navbar() {

  const navigate = useNavigate()
  const {user, logOut} = use(AuthContext)
  
  const [open, setOpen] = useState(false);

  const handleLogOut = ()=>{
    logOut()
    .then( ()=>{

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged Out Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/')
    })
    .catch(error =>{
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
            className=" w-36 lg:w-60"
          />
         </NavLink>
          {/* <span className="text-xl font-bold text-gray-800">
            Shope Cove
          </span> */}
        </div>





        {/* Right - Buttons */}

           <p>{user && user.email}</p>
           <img className="w-9" src={user && user.photoURL ? user.photoURL : UserIcon} alt="profile" />
           


        <div className="hidden md:flex items-center gap-6">
          {
            user ? 
            <button onClick={handleLogOut} className="btn text-gray-700 hover:text-blue-600">
              LogOut
            </button>
           : <NavLink to='/auth/login'>
          <button className="btn text-gray-700 hover:text-blue-600">
            LogIn
          </button>
          </NavLink>
          }

          <NavLink to='/auth/signup'>
          <button className="btn text-gray-700 hover:text-blue-600">
            Sign Up
          </button>
          </NavLink>

          <FaShoppingCart className="text-xl cursor-pointer hover:text-blue-600" />
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
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>

         
         {
          user?
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
