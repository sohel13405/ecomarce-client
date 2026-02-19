import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../components/auth/AuthContext";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import UpdateProductModal from "./UpdateProductModal";

const ManageProduct = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    //  Load seller products

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axiosSecure.get(
                `/products/seller/${user?.email}`
            );
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchProducts();
        }
    }, [user?.email]);

    // Delete product
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const { data } = await axiosSecure.delete(`/products/${id}`);

                if (data.deletedCount > 0) {
                    setProducts(products.filter((p) => p._id !== id));

                    Swal.fire("Deleted!", "Product deleted successfully.", "success");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 "
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="btn btn-sm bg-blue-500 text-white"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-sm bg-red-500 text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>


                    </table>

                </div>

            )}

            {selectedProduct && (
                <UpdateProductModal
                    product={selectedProduct}
                    closeModal={() => setSelectedProduct(null)}
                    refreshProducts={fetchProducts}
                />
            )}
        </div>

    );
};

export default ManageProduct;
