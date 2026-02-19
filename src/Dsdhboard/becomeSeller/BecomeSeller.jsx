import { useState, use } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaStore } from "react-icons/fa";
import { AuthContext } from "../../components/auth/AuthContext";
import Swal from "sweetalert2";

const BecomeSeller = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(
        `/become-seller-request/${user?.email}`
        
      );
      return data;
    },
    onSuccess: (data) => {
        console.log(data);


       Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Seller request submitted successfully!",
          showConfirmButton: false,
          timer: 1800
         });
    //   setShopName("");
    //   setPhone("");
    //   setAddress("");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to submit request");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const sellerData = {
      name: user?.displayName,
      email: user?.email,
      shopName,
      phone,
      address,
      status: "pending", // admin will approve
    };

    mutation.mutate(sellerData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-100 p-6">
      <div className="bg-base-100 shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-base-300">

        <div className="flex items-center gap-3 mb-6">
          <FaStore className="text-primary text-3xl" />
          <h2 className="text-2xl font-bold">
            Become a Seller
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name (Read Only) */}
          <div>
            <label className="text-sm font-semibold">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full mt-2 rounded-xl bg-base-200"
            />
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full mt-2 rounded-xl bg-base-200"
            />
          </div>

          {/* Shop Name */}
          <div>
            <label className="text-sm font-semibold">Shop Name</label>
            <input
              type="text"
              required
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Enter your shop name"
              className="input input-bordered w-full mt-2 rounded-xl"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold">Phone Number</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="input input-bordered w-full mt-2 rounded-xl"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-semibold">Business Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your business address"
              className="textarea textarea-bordered w-full mt-2 rounded-xl"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-primary w-full rounded-xl mt-4"
          >
            {mutation.isPending
              ? "Submitting..."
              : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller;
