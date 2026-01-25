export default function ProductSideBySide() {
    const products = [
      {
        id: 1,
        name: "Wireless Headphones",
        company: "SoundMax",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        buttonText: "Shop Now",
      },
      {
        id: 2,
        name: "Smart Watch",
        company: "TechWear",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        buttonText: "View Details",
      },
    ];
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
  
              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>
  
                {/* Company Name */}
                <p className="text-sm text-gray-500 mb-4">
                  {product.company}
                </p>
  
                <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                  {product.buttonText}
                </button>
              </div>
            </div>
          ))}
  
        </div>
      </div>
    );
  }
  