import { Users, Edit3, CheckCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useState } from "react";
import UpdateUserRoleModal from "../../components/Modal/UpdateUserRoleModal";



const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();


    const [isOpen, setIsOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure("/all-users");
            return data;
        },
    });

    // const handleUpdate = async (user) => {
    //     try {
    //         // Example: Toggle status (you can replace with modal logic)
    //         const newStatus = user.status === "active" ? "inactive" : "active";

    //         await axiosSecure.patch(`/users/update/${user._id}`, {
    //             status: newStatus,
    //         });

    //         toast.success("User updated successfully");
    //         refetch();
    //     } catch (err) {
    //         toast.error("Failed to update user");
    //     }
    // };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 p-6">
            <div className="max-w-6xl mx-auto space-y-8">



                {/* Header */}

                <div className="flex items-center gap-3">
                    <Users className="text-primary" size={32} />
                    <h1 className="text-3xl font-extrabold">Manage Users</h1>
                </div>

                {/* Table */}
                <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">

                    {/* Head */}
                    <div className="grid grid-cols-12 bg-base-200 px-6 py-4 text-sm font-semibold">
                        <div className="col-span-4">Email</div>
                        <div className="col-span-2">Role</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3 text-right">Action</div>
                    </div>

                    {/* Body */}
                    {users.length === 0 ? (
                        <p className="p-8 text-center text-base-content/60">
                            No users found
                        </p>
                    ) : (
                        users.map((user) => (
                            <div
                                key={user._id}
                                className="grid grid-cols-12 items-center px-6 py-4 border-t hover:bg-base-200 transition"
                            >
                                {/* Email */}
                                <div className="col-span-4 font-medium">
                                    {user.email}
                                </div>

                                {/* Role */}
                                <div className="col-span-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide
                      ${user.role === "admin" && "bg-red-100 text-red-700"}
                      ${user.role === "seller" && "bg-indigo-100 text-indigo-700"}
                      ${user.role === "customer" && "bg-emerald-200 text-emerald-700"}
                    `}
                                    >
                                        {user.role?.toUpperCase()}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="col-span-3 flex items-center gap-2">
                                    {user.status === "active" || user.status === "verified" ? (
                                        <>
                                            <CheckCircle size={16} className="text-green-500" />
                                            <span className="text-green-600 font-medium">
                                                {user.status}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle size={16} className="text-red-500" />
                                            <span className="text-red-600 font-medium">
                                                {user.status || "unavailable"}
                                            </span>
                                        </>
                                    )}
                                </div>


                                {/* Action */}
                                <div className="col-span-3 flex justify-end">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setIsOpen(true);
                                        }}
                                        className="btn btn-sm btn-primary rounded-xl flex items-center gap-2"
                                    >
                                        <Edit3 size={16} />
                                        Update Role
                                    </button>

                                </div>
                                {selectedUser && (
                                    <UpdateUserRoleModal
                                        user={selectedUser}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        refetch={refetch}

                                    />
                                )}

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
