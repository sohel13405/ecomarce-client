import { Link } from "react-router";

const FeaturedThreeProducts = ({ products }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:h-48 w-full">
        {products?.slice(0, 3).map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group"
          >
            {/* LEFT SIDE */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500">
                {product.category}
              </p>

              <Link
                to={`/featuredsingleproduct/${product._id}`}
                className="inline-block w-fit px-4 py-2 bg-[#6692a1] text-white text-sm rounded-lg hover:bg-[#9ab9c4] transition"
              >
                Details
              </Link>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="w-60 h-60 shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedThreeProducts;
