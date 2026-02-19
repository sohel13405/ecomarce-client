import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProductModal = ({ product, closeModal, refreshProducts }) => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ Sync product data when modal opens or product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        quantity: product.quantity || "",
        category: product.category || "",
        description: product.description || "",
      });
    }
  }, [product]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { data } = await axiosSecure.put(
        `/products/${product._id}`,
        {
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          updatedAt: new Date(),
        }
      );

      if (data.modifiedCount > 0) {
        await Swal.fire({
          icon: "success",
          title: "Product updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        refreshProducts();
        closeModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>

        <form onSubmit={handleUpdate} className="space-y-3">
            <legend>Name</legend>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Product Name"
            required
          />
            <legend>Price</legend>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Price"
            required
          />
            <legend>Quantity</legend>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Quantity"
            required
          />
            <legend>Description</legend>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm"
              disabled={isUpdating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-sm bg-blue-500 text-white"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
