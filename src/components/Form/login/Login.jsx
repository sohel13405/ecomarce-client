import { use } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Login() {

    const navigate = useNavigate()
    const {login} = use(AuthContext)

    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)

        login(email,password)
        .then(result =>{
            console.log(result)
            
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "You logged In Successfully",
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
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
  
        {/* Login Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
  
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">
              Please login to your account
            </p>
          </div>
  
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
  
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
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
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
  
            {/* Options */}
            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label>
              <a href="#" className="text-gray-500 hover:text-black">
                Forgot password?
              </a>
            </div> */}
  
            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>
  
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
  
          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full py-3 border rounded-xl hover:bg-gray-50 transition">
              Continue with Google
            </button>
            {/* <button className="w-full py-3 border rounded-xl hover:bg-gray-50 transition">
              Continue with GitHub
            </button> */}
          </div>
  
          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href='/auth/signup' className="font-semibold text-black hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
  }
  