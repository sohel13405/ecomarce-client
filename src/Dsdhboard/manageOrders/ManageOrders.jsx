import { Eye, CheckCircle, XCircle, Truck } from "lucide-react";

const ManageOrders = ({ orders = [] }) => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Manage Orders</h2>

        <input
          type="text"
          placeholder="Search orders..."
          className="input input-bordered w-full md:w-72 rounded-xl"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover">
                <td>{index + 1}</td>

                <td>
                  <div>
                    <p className="font-semibold">{order.userName}</p>
                    <p className="text-xs text-base-content/60">
                      {order.userEmail}
                    </p>
                  </div>
                </td>

                <td>{order.productName}</td>

                <td className="font-bold text-primary">
                  ৳{order.price}
                </td>

                <td>
                  <span
                    className={`badge px-3 py-2 font-semibold ${
                      order.status === "Pending"
                        ? "badge-warning"
                        : order.status === "Delivered"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>{order.date}</td>

                <td>
                  <div className="flex items-center justify-center gap-2">
                    <button className="btn btn-sm btn-outline">
                      <Eye size={16} />
                    </button>

                    <button className="btn btn-sm btn-success text-white">
                      <CheckCircle size={16} />
                    </button>

                    <button className="btn btn-sm btn-info text-white">
                      <Truck size={16} />
                    </button>

                    <button className="btn btn-sm btn-error text-white">
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-16 text-base-content/60">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
