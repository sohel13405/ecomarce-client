import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../../components/auth/AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/customer/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (!orders.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">
          No Orders Found
        </h2>
        <Link to="/" className="btn btn-primary rounded-xl">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <Link to="/">
          <button className="btn">Back To Home</button>
        </Link>
      </div>

      <div className="max-h-[500px] overflow-y-auto rounded-2xl shadow-md bg-base-100">
        <table className="table w-full">
          <thead className="bg-base-200 font-semibold sticky top-0 z-10">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Price</th>
              <th>Order Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover">
                <td>{index + 1}</td>

                <td>
                  <img
                    className="w-16 rounded-lg"
                    src={order.productImage}
                    alt=""
                  />
                </td>

                <td className="font-semibold text-primary">
                  {order.productName}
                </td>

                <td>{order.quantity}</td>

                <td>{order.productCategory}</td>

                <td>$ {order.price}</td>

                {/* ORDER STATUS */}
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
                    {order.status}
                  </span>
                </td>

                {/* PAYMENT STATUS */}
                <td>
                  <span
                    className={`badge rounded-lg ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
