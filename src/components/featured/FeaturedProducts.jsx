export default function FeaturedProducts() {
    const products = [
      {
        id: 1,
        name: "Wireless Headphones",
        brand: "SoundMax",
        price: "$120",
        image: "https://images.unsplash.com/photo-1518441902112-f6e7c3c8b53a",
      },
      {
        id: 2,
        name: "Smart Watch",
        brand: "TechWear",
        price: "$180",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      },
      {
        id: 3,
        name: "Laptop Pro",
        brand: "UltraTech",
        price: "$1,250",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      },
      {
        id: 4,
        name: "Bluetooth Speaker",
        brand: "BoomSound",
        price: "$90",
        image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
      },
      {
        id: 5,
        name: "DSLR Camera",
        brand: "PixelShot",
        price: "$950",
        image: "https://images.unsplash.com/photo-1519183071298-a2962eadcdbb",
      },
      {
        id: 6,
        name: "Gaming Mouse",
        brand: "ProGear",
        price: "$60",
        image: "https://images.unsplash.com/photo-1612197528561-6b7c7a2a4b7d",
      },
      {
        id: 7,
        name: "Mechanical Keyboard",
        brand: "KeyMaster",
        price: "$140",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
      },
      {
        id: 8,
        name: "Fitness Band",
        brand: "FitLife",
        price: "$75",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      },
      {
        id: 9,
        name: "Smart TV",
        brand: "VisionPlus",
        price: "$1,100",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      },
      {
        id: 10,
        name: "Noise Cancelling Earbuds",
        brand: "QuietTone",
        price: "$150",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      },
    ];
  
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>
  
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
  
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">
                  {product.name}
                </h3>
  
                <p className="text-xs text-gray-500 mb-2">
                  {product.brand}
                </p>
  
                <p className="font-bold text-black">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
  
      </section>
    );
  }
  