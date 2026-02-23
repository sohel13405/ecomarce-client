import { useLoaderData, useParams } from "react-router";

const ProductSideBySide = () => {
  const { id } = useParams();
  const products = useLoaderData();

  const product = products.find(p => p._id.toString() !== id);

  if (!product) return <p>Product not found</p>;

  const { image, name, _id, category } = product;

  return (
    <div className="max-w-full mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          key={_id}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover"
          />

          <div className="p-5 text-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500 mb-4">{category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSideBySide;
