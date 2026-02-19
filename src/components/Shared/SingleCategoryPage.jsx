import { Link, useParams } from "react-router";
import useProductsByCategory from "../../hooks/useProductsByCategory";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const SingleCategoryPage = () => {
  const { categoryName } = useParams();
  const { data = [], isLoading } = useProductsByCategory();

  if (isLoading) return <LoadingSpinner />;

  const selectedCategory = data.find(
    (cat) => cat._id.toLowerCase() === categoryName.toLowerCase()
  );

  if (!selectedCategory) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-2xl font-semibold text-gray-400">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 text-center">
        <h1 className="text-5xl font-extrabold capitalize tracking-wide">
          {selectedCategory._id}
        </h1>

        <p className="mt-4 text-gray-300 text-lg">
          {selectedCategory.products.length} Products Available
        </p>
      </div>

      {/*  PRODUCTS SECTION */}
      <div className="container mx-auto px-4 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {selectedCategory.products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover transform group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-black transition">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  Premium quality product
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-black">
                    ${product.price}
                  </span>

                 <Link to={`/featuredsingleproduct/${product._id}`}>
                 <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition">
                    View
                  </button>
                 </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SingleCategoryPage;
