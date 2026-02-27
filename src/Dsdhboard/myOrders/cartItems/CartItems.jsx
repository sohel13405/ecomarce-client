import { Trash2, CreditCard } from "lucide-react";
import { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../../components/auth/AuthContext";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router";

const CartItems = () => {
  const { user } = useContext(AuthContext);

//   if (!user) return <LoadingSpinner />;

  const { data: cart = [], isLoading, refetch } = useCart(user?.email);

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = async (id) => {
     const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This cart item will be deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            });
    
            if (confirm.isConfirmed){
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/${id}`
      );
      


      refetch();

      Swal.fire("Deleted!", "cart item deleted successfully.", "success");
    } catch (error) {
      console.log(error);
    }
}
  };

//   const totalPrice = cart.reduce(
//     (total, item) => total + Number(item.price || 0),
//     0
//   );

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
  <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">

    <div className="lg:flex justify-between">
    <h2 className="text-2xl sm:text-3xl font-bold mb-8">
      🛒 My Cart ({cart.length}) Items
    </h2>
    <Link to="/">
          <button className="btn mb-5 hidden lg:block ">Back To Home</button>
        </Link>
    </div>

    {cart.length === 0 ? (
      <div className="text-center py-20 text-gray-500 text-lg">
        Your cart is empty
      </div>
    ) : (
      <>
        {/*MOBILE VIEW */}
        <div className="space-y-6 lg:hidden">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-gray-50 rounded-2xl p-4 shadow-md"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </p>
                  <p className="font-bold text-primary mt-2">
                    ${item.price}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  <Trash2 size={18} />
                </button>

                <Link to={`/featuredsingleproduct/${item.productId}`}>
                  <button className="px-5 py-3 rounded-xl bg-[#89A8B2] text-white flex items-center gap-2 hover:scale-105 transition shadow-md">
                    <CreditCard size={18} />
                    Purchase
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE  */}
        <div className="hidden lg:block">
  <div className="max-h-125 overflow-y-auto rounded-2xl shadow-md">
    <table className="w-full text-left border-collapse">

      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr className="border-b text-gray-600 uppercase text-sm">
          <th className="py-4 px-4">#</th>
          <th className="py-4">Product</th>
          <th>Category</th>
          <th>Price</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((item, index) => (
          <tr
            key={item._id}
            className="border-b hover:bg-slate-50 transition"
          >
            <td className="px-4">{index + 1}</td>

            <td className="py-6 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20  rounded-xl"
              />
              <span className="font-semibold">
                {item.name}
              </span>
            </td>

            <td className="capitalize">
              {item.category}
            </td>

            <td className="font-bold text-primary">
              ${item.price}
            </td>

            <td className="text-center">
              <div className="flex justify-center gap-3 py-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  <Trash2 size={18} />
                </button>

                <Link to={`/featuredsingleproduct/${item.productId}`}>
                  <button className="px-5 py-3 rounded-xl bg-[#89A8B2] text-white flex items-center gap-2 hover:scale-105 transition shadow-md">
                    <CreditCard size={18} />
                    Purchase
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

      </>
    )}
  </div>
</div>
  );
};

export default CartItems;