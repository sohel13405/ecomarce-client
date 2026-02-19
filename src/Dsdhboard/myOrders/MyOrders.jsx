import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { use } from "react";
import { AuthContext } from "../../components/auth/AuthContext";

const MyOrders = ()=> {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/customer/${user.email}`);
      return res.data;
    },
  });


  const handleCancel = async (id) => {
    try {
      await axiosSecure.delete(`/orders/${id}`);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  if (!orders.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">
          No Orders Found
        </h2>
        <Link
          to="/"
          className="btn btn-primary rounded-xl"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-md bg-base-100">
        <table className="table w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover">
                <td>{index + 1}</td>

                <td>
                  <img className="w-16" src={order.productImage} alt="" />
                </td>

                <td className="font-semibold text-primary">
                  ${order.productName}
                </td>

                <td>
                  <span
                    className={`badge rounded-lg ${
                      order.status === "pending"
                        ? "badge-warning"
                        : order.status === "shipped"
                        ? "badge-info"
                        : order.status === "delivered"
                        ? "badge-success"
                        : "badge-ghost"
                    }`}
                  >
                    {order.quantity}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge rounded-lg ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.productCategory}
                  </span>
                </td>

                <td>
                  <h1>$ {order.price}</h1>
                </td>

                <td>
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MyOrders;