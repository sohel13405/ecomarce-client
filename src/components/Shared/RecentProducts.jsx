import { useRef } from "react";
import { Link } from "react-router";

const RecentProducts = ({ products }) => {
    const recentProducts = products.slice(5).reverse();
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 mt-16 relative">
      {/* Header with text on left, arrows on right */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Recent Products</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            &#10094;
          </button>
          <button
            onClick={scrollRight}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 flex-shrink-0"
          >
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-500 mt-1">{product.price}</p>
              <Link
                to={`/featuredsingleproduct/${product._id}`}
                className="mt-3 inline-block px-4 py-2 bg-[#89A8B2] text-white rounded-lg hover:bg-[#6e97a5] transition-colors duration-300"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProducts;
