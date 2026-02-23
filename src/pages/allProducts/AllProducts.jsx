import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLoaderData } from "react-router";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const AllProducts = () => {
  const products = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 relative overflow-hidden">

      {/* Premium Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-linear-to-r from-blue-100 via-purple-100 to-pink-100 opacity-40"
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center mb-16 text-[#6d96a4] bg-clip-text  "
      >
        Explore All Products
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            whileHover={{ y: -12 }}
            className="group relative rounded-3xl p-px bg-linear-to-r from-blue-200 via-purple-200 to-pink-200"
          >

            {/* Card Body */}
            <div className="bg-white rounded-3xl p-5 h-full shadow-xl transition-all duration-500 group-hover:shadow-2xl">

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Icons */}
                <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-500">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="bg-white p-2 rounded-full shadow-lg text-red-500"
                  >
                    <FaHeart />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="bg-white p-2 rounded-full shadow-lg text-gray-800"
                  >
                    <FaShoppingCart />
                  </motion.button>
                </div>

                {/* New Badge */}
                {product.isNew && (
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-3 left-3 bg-linear-to-r from-[#89A8B2] to-[#89A8B2] text-white text-xs px-3 py-1 rounded-full shadow-md"
                  >
                    NEW ✨
                  </motion.div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {product.category}
              </p>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              <p className="text-xl font-bold text-blue-600 mb-4">
                ${product.price}
              </p>

              {/* View Details Button */}
             <Link to={`/featuredsingleproduct/${product._id}`}>
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 rounded-xl bg-[#89A8B2] text-white font-semibold shadow-lg hover:shadow-purple-[#E5E1DA] transition-all duration-300"
              >
                View Details
              </motion.button>
             </Link>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default AllProducts;
