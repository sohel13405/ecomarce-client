import { ShoppingCart, Heart, Star } from "lucide-react";
import {  useParams } from "react-router";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import { use,   useState } from "react";
import PurchaseModal from "./PurchaseModal";
import { AuthContext } from "../auth/AuthContext";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const FeaturedSingleProduct = () => {

    const {id} = useParams()

    const { user } = use(AuthContext)
    // const product = useLoaderData()

    const [isOpen, setIsOpen] = useState(false)
    const [role, isRoleLoading] = useRole()


const {data : product, isLoading, refetch} = useQuery({
    queryKey: ['product'],
    queryFn: async () =>{
      const {data} =  await axios(`${import.meta.env.VITE_API_URL}/product/${id}`)
        return data
    }
    
})


    

    const { image, name, price, quantity, seller, category, description} = product || {};



if(isRoleLoading || isLoading) return <LoadingSpinner></LoadingSpinner>
if (!product || typeof product !== 'object') return <ErrorPage></ErrorPage>



    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-16 px-4">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center bg-base-100/70 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/20">

                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-3xl opacity-30 group-hover:opacity-50 transition" />

                        <img
                            src={image}
                            alt={name}
                            className="relative object-cover rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.05]"
                        />

                        <span className="absolute top-6 left-6 px-5 py-1.5 bg-primary text-white rounded-full text-sm font-semibold tracking-wide shadow-lg">
                            Featured
                        </span>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">

                        <span className="inline-block px-4 py-1 rounded-full text-xs tracking-widest uppercase bg-primary/10 text-primary font-semibold">
                            {category}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                            {name}
                        </h1>

                        <div className="flex items-center gap-4">
                            <h2>Seller : {seller?.name}</h2>
                            <img className="w-7" src={seller?.image} alt="" />
                        </div>

                        <p className="text-base-content/70 leading-relaxed text-lg"> Description :
                            {description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="fill-warning stroke-warning" />
                            ))}
                            <span className="text-sm text-base-content/60">(5.0 Reviews)</span>
                        </div>

                        {/* Price & Stock */}
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div>
                                <p className="text-sm uppercase tracking-widest text-base-content/60">
                                    Price
                                </p>
                                <p className="text-4xl font-black text-primary">
                                    ${price}
                                </p>
                            </div>

                            <div
                                className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide ${quantity > 0
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-rose-100 text-rose-700"
                                    }`}
                            >
                                {quantity > 0 ? `In Stock • ${quantity}` : "Out of Stock"}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 pt-4">

                            <div className="relative group flex-1">

                                <button
                                    disabled = {!user  || user?.email === seller?.email || role !== 'customer' || role === 'admin'}

                                    onClick={() => user && setIsOpen(true)}
                                    className={`group relative w-full h-14 rounded-2xl overflow-hidden 
                                    text-white text-lg font-semibold shadow-xl transition
                                  ${user && user?.email !== seller?.email  && role !== 'admin'? "bg-gradient-to-r from-[#e1dfdf] to-[#707171] hover:scale-[1.02]"
                                            : "bg-gray-400 cursor-not-allowed opacity-60"
                                        }`}
                                >
                                    <span className="relative flex items-center justify-center gap-3">
                                        <ShoppingCart size={22} />
                                        {user ? "Purchase" : "Login to purchase"}
                                    </span>
                                </button>

                                {/* Tooltip */}
                                {!user && (
                                    <div
                                        className="absolute -top-11 left-1/2 -translate-x-1/2 
                                   scale-0 group-hover:scale-100 transition
                                bg-black text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap"
                                    >
                                        Please login to continue
                                    </div>
                                )}

                            </div>


                            <button className="h-14 w-14 flex items-center justify-center rounded-2xl border border-base-300 hover:bg-base-200 transition shadow-md">
                                <Heart size={22} />
                            </button>

                        </div>

                        <PurchaseModal
                            product={product}
                            isOpen={isOpen}
                            closeModal={() => setIsOpen(false)}
                            refetch={refetch}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedSingleProduct;
