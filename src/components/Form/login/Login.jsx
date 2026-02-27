import { use, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { saveUserInDb } from "../../../api/utils";
import animationData from '../../../assets/login animation.json'
import Lottie from "lottie-react";


export default function Login() {

    const navigate = useNavigate()
    const {login, user, logInWithGoogle} = use(AuthContext)
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
      if (user) {
        navigate(from, { replace: true });
      }
    }, [user, from, navigate]);

    const handleLogin = async (e) => {
      e.preventDefault();
    
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
    
      try {
        const result = await login(email, password);
    
        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        };
    
        await saveUserInDb(userData);
    
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
    
        // navigate(from, { replace: true });
    
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: err.message,
        });
      }
    };

    // handle Google signIn

    const handleGoogleLogIn = async () =>{
      try{
      const result =  await logInWithGoogle()
        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        };
        await saveUserInDb(userData);
        navigate(from, { replace: true })
     await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      catch(err){
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: err.message,
        });
      }
    }
    
    


    return (
      
      <div className=" lg:flex items-center justify-center gap-14 p-10 py-20 bg-[#0f232a]">

<div className="sm:w-44  lg:w-96">   
   <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true} 
      />
       </div>



<div className="">
  
  {/* Login Card */}
  <div className="w-full max-w-md bg-[#e2e2e23a] rounded-2xl shadow-2xl p-8">

    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-[#ffffff] mb-2">Welcome Back</h1>
      <p className="text-[#e1dcdc] text-sm">
        Please login to your account
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleLogin} className="space-y-5">

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full mt-1 px-4 py-3  text-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          placeholder="Enter your password"
          className="w-full mt-1 px-4 py-3 text-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
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
        className="w-full py-3 bg-[#769ca9] text-white rounded-xl font-semibold hover:bg-white hover:text-black transition"
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

    {/* Social Login /google login */}
    <div className="space-y-3">
      <button onClick={handleGoogleLogIn} className="w-full text-white py-3 border rounded-xl hover:bg-gray-50 transition hover:text-black">
        Continue with Google
      </button>
      {/* <button className="w-full py-3 border rounded-xl hover:bg-gray-50 transition">
        Continue with GitHub
      </button> */}
    </div>

    {/* Footer */}
    <p className="text-center text-sm text-gray-300 mt-6">
      Don’t have an account?{" "}
      <a href='/auth/signup' className="font-semibold text-red-500 hover:underline">
        Sign up
      </a>
    </p>
  </div>
</div>


      </div>
    );
  }
  