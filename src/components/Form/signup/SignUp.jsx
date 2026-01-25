
import  { use } from "react";
import { AuthContext } from "../../auth/AuthContext";
import Swal from "sweetalert2";

export default function SignUp() {

    const {createUser, setUser} = use(AuthContext)

    const handleRegister = e =>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,photo,email,password)

        createUser(email,password)
        .then(result =>{
            console.log(result)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Account Created Successfully",
              showConfirmButton: false,
              timer: 1500
            });

            setUser()
        })
        .catch(error =>{
            console.log(error)
        })

    }


    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
  
        {/* Signup Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 my-12">
  
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">
              Join us and start your journey
            </p>
          </div>
  
          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
  
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>


             {/* photo url  */}
             <div>
              <label className="text-sm font-medium text-gray-700">
                photo url
              </label>
              <input
                type="text"
                name="photo"
                required
                placeholder="photoURL"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
  
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
  
            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Create a password"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>


           
  
            {/* Confirm Password */}
            {/* <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div> */}
  
            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input required type="checkbox" className="mt-1 accent-black" />
              <p className="text-gray-600">
                I agree to the{" "}
                <a href="#" className="font-semibold text-black hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
  
            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
          </form>
  
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
  
          {/* Social Signup */}
          <div className="space-y-3">
            <button className="w-full py-3 border rounded-xl hover:bg-gray-50 transition">
              Sign up with Google
            </button>
            <button className="w-full py-3 border rounded-xl hover:bg-gray-50 transition">
              Sign up with GitHub
            </button>
          </div>
  
          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href='/auth/login' className="font-semibold text-black hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    );
  }
  