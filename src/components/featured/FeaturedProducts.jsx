import { Link, useLoaderData } from "react-router";

export default function FeaturedProducts() {
  const products = useLoaderData();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-12">
        Featured Products
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group flex flex-col"
          >
            {/* Image */}
            <div className="relative flex items-center justify-center  overflow-hidden  aspect-[4/4]">
              <img
                src={product.image}
                alt={product.name}
                className=" object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 p-4">
              <div>
                <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                  {product.name}
                </h3>

                <p className="mt-1 text-lg font-bold text-primary">
                  ${product.price}
                </p>
              </div>

              {/* Button */}
              <Link
                to={`/featuredsingleproduct/${product._id}`}
                className="mt-4"
              >
                <button className="btn  btn-sm w-full rounded-xl">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
