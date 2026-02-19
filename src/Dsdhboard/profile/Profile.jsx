import { Mail, Phone, MapPin, User, Edit3, LogOut } from "lucide-react";
import { use } from "react";
import { AuthContext } from "../../components/auth/AuthContext";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Profile = () => {


    const { user, logOut } = use(AuthContext)
    const [role, isRoleLoading] = useRole()
    const navigate = useNavigate()

    if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>

   const handleLogOut = ()=>{
       logOut()
       .then( ()=>{
   
         Swal.fire({
           position: "top-end",
           icon: "success",
           title: "Logged Out Successfully",
           showConfirmButton: false,
           timer: 1800
         });
         navigate('/')
       })
       .catch(error =>{
         console.log(error)
       })
     }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
            <div className="max-w-4xl w-full bg-base-100 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3">

                {/* Left Profile Card */}
                <div className="bg-gradient-to-br from-primary to-secondary text-white p-8 flex flex-col items-center justify-center text-center">
                    <div className="relative">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/default-avatar.png"}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    </div>

                    <h2 className="mt-4 text-2xl font-bold">{user?.displayName || "User Name"}</h2>
                    <p className="text-sm opacity-90">
                        {typeof role === "string" ? role.toUpperCase() : ""}
                    </p>

                    <button className="btn btn-outline border-white text-white mt-6 rounded-xl">
                        <Edit3 size={18} />
                        Edit Profile
                    </button>
                </div>

                {/* Right Info Section */}
                <div className="md:col-span-2 p-8 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <User className="text-primary" /> Profile Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Email */}
                        <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl">
                            <Mail className="text-primary" />
                            <div>
                                <p className="text-sm text-base-content/60">Email</p>
                                <p className="font-semibold">{user?.email}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl">
                            <Phone className="text-primary" />
                            <div>
                                <p className="text-sm text-base-content/60">Phone</p>
                                <p className="font-semibold">
                                    {user?.phone || "+880 1XXXXXXXXX"}
                                </p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl md:col-span-2">
                            <MapPin className="text-primary" />
                            <div>
                                <p className="text-sm text-base-content/60">Address</p>
                                <p className="font-semibold">
                                    {user?.address || "Dhaka, Bangladesh"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-6">
                        <button className="btn btn-primary rounded-xl">
                            Update Info
                        </button>

                        <button onClick={handleLogOut} className="btn btn-outline btn-error rounded-xl">
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
