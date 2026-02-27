import { ShoppingCart, Heart, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import { use } from "react";
import { AuthContext } from "../auth/AuthContext";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";

const AddToCart = () => {

    const { id } = useParams()

    const { user } = use(AuthContext)
    const navigate = useNavigate()



    const [role, isRoleLoading] = useRole()
    const { data: cart = [], refetch } = useCart(user?.email);

    const { data: product, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/product/${id}`)
            return data
        }

    })




    const { image, name, price, quantity, seller, category, description } = product || {};

    console.log(product);

    if (isRoleLoading || isLoading) return <LoadingSpinner></LoadingSpinner>
    if (!product || typeof product !== 'object') return <ErrorPage></ErrorPage>

    const handleAddToCart = async () => {
        if (!user) return;

        // Check if product already exists
        const isAlreadyInCart = cart.some(
            (item) => item.productId?.toString() === product._id?.toString()
          );
        
          if (isAlreadyInCart) {
            Swal.fire({
              icon: "warning",
              title: "Already Added!",
              text: "This product is already in your cart.",
              timer: 1500,
              showConfirmButton: false,
            });
            return;
          }

        const cartItem = {
            userEmail: user.email,
            productId: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            sellerEmail: seller?.email,
            category: product.category,
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/cart`,
                cartItem
            );

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your cart addedd successfully",
                showConfirmButton: false,
                timer: 1500,
            });

            refetch();

            navigate('/')

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 py-20 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* 🔥 LEFT SIDE — BIG IMAGE */}
                    <div className="relative group">

                        {/* Glow Background */}
                        <div className="absolute -inset-6 bg-linear-to-tr from-primary/30 to-purple-400/20 blur-3xl rounded-[3rem] opacity-70 group-hover:opacity-90 transition duration-500" />

                        <div className="relative bg-white rounded-[3rem] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

                            <img
                                src={image}
                                alt={name}
                                className="w-full h-125 object-contain rounded-2xl transition-transform duration-700 group-hover:scale-110"
                            />

                            <span className="absolute top-8 left-8 bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                Premium Choice
                            </span>
                        </div>
                    </div>

                    {/* 🔥 RIGHT SIDE — CONTENT */}
                    <div className="space-y-8">

                        <div>
                            <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                                {category}
                            </span>

                            <h1 className="text-5xl font-extrabold mt-5 leading-tight">
                                {name}
                            </h1>
                        </div>

                        {/* Seller */}
                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm w-fit">
                            <img
                                src={seller?.image}
                                alt=""
                                className="w-12 h-12 rounded-full object-cover border"
                            />
                            <div>
                                <p className="text-xs text-gray-500">Sold By</p>
                                <p className="font-semibold">{seller?.name}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} className="fill-yellow-400 stroke-yellow-400" />
                            ))}
                            <span className="text-gray-500 text-sm">(5.0 Reviews)</span>
                        </div>

                        {/* Price & Stock */}
                        <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-md">

                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">
                                    Price
                                </p>
                                <p className="text-5xl font-black text-primary mt-1">
                                    ${price}
                                </p>
                            </div>

                            <div
                                className={`px-6 py-3 rounded-full text-sm font-semibold ${quantity > 0
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {quantity > 0
                                    ? `In Stock • ${quantity}`
                                    : "Out of Stock"}
                            </div>
                        </div>

                        {/* 🔥 Buttons */}
                        <div className="flex gap-5 pt-4">

                            <button
                                disabled={
                                    !user ||
                                    user?.email === seller?.email ||
                                    role !== "customer"
                                }
                                onClick={handleAddToCart}
                                className={`flex-1 h-16 rounded-2xl text-lg font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${user && user?.email !== seller?.email && role === "customer"
                                        ? "bg-[#67909d] hover:scale-105 hover:shadow-2xl"
                                        : "bg-[#89A8B2] cursor-not-allowed opacity-60"
                                    }`}
                            >
                                <ShoppingCart size={22} />
                                {user ? "Add To Cart" : "Please login to continue"}
                            </button>

                            <button className="h-16 w-16 flex items-center justify-center rounded-2xl border border-gray-300 bg-white hover:bg-gray-100 transition shadow-md">
                                <Heart size={22} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddToCart;
