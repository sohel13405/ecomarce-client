import { Link, useLoaderData } from "react-router";
import { useState } from "react";
import DealsOfTheWeek from "./DealsOfTheWeek";

const FeaturedProducts = () => {
  const products = useLoaderData();
  console.log(products);

  const [activeFilter, setActiveFilter] = useState("onSale");
  const [showAll, setShowAll] = useState(false);

  // 🔥 Filter Logic
  const filteredProducts = products.filter((product, index) => {
    if (activeFilter === "onSale") return index % 3 === 0;
    if (activeFilter === "hotSale") return index % 3 === 1;
    if (activeFilter === "bestSale") return index % 3 === 2;
  });
 

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:mt-16 flex flex-col lg:flex-row gap-12 items-center">

      {/* 🔥 Left Side */}
      <div className="lg:w-1/3">
        <DealsOfTheWeek products={products} />
      </div>

      {/* 🔥 Right Side */}
      <div className="lg:w-2/3 ">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

          <h2 className="text-3xl md:text-2xl text-[#628e9c] font-bold">
            Featured Products
          </h2>

          {/* Filter Buttons */}
          <div className="flex gap-3">

            {["onSale", "hotSale", "bestSale"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveFilter(type);
                  setShowAll(false);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeFilter === type
                      ? "bg-[#89A8B2] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {type === "onSale" && "On Sale"}
                {type === "hotSale" && "Hot Sale"}
                {type === "bestSale" && "Best Sale"}
              </button>
            ))}

          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 -mt-4  border-t border-[#cacaca] md:grid-cols-3 gap-12">

          {displayedProducts.map((product) => (
            <div
              key={product._id}
              className=" rounded-2xl overflow-hidden  hover:shadow-xl transition group flex flex-col"
            >
              {/* Image */}
              <Link to={`/featuredsingleproduct/${product._id}`}>
              <div className="relative flex items-center justify-center overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <h3 className="font-semibold text-[#67909d] text-sm md:text-base line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-lg font-bold text-black">
                    ${product.price}
                  </p>
                </div>

               
              </div>
              </Link>
            </div>
          ))}

        </div>

        {/* Show All Button */}
        {filteredProducts.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline rounded-xl px-8"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FeaturedProducts;
