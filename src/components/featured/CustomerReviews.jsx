import { useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Verified Buyer",
    rating: 5,
    text: "Absolutely love this product! High quality and exactly as described.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Happy Customer",
    rating: 4,
    text: "Fast delivery and amazing customer service. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Sophia Smith",
    role: "Verified Buyer",
    rating: 5,
    text: "The quality exceeded my expectations. Will definitely order again.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 4,
    name: "James Williams",
    role: "Happy Customer",
    rating: 4,
    text: "Very satisfied with the purchase. Stylish and affordable.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 5,
    name: "Emma Brown",
    role: "Verified Buyer",
    rating: 5,
    text: "Fantastic experience from start to finish!",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];

export default function CustomerReviews() {
  const carouselRef = useRef(null);

  // const scrollLeft = () => {
  //   carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
  // };

  // const scrollRight = () => {
  //   carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
  // };

  return (
    <section className="max-w-7xl mx-auto px-4 py-14 mt-20 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          What Our Customers Say
        </h2>

        {/* <div className="flex gap-3">
          <button
            onClick={scrollLeft}
            className="bg-white border p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            &#10094;
          </button>
          <button
            onClick={scrollRight}
            className="bg-white border p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            &#10095;
          </button>
        </div> */}
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="min-w-[280px] md:min-w-[300px] lg:min-w-[260px] bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition duration-300 flex-shrink-0"
          >
            {/* Top Section */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                “{review.text}”
              </p>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mt-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < review.rating
                        ? "text-yellow-400 text-lg"
                        : "text-gray-300 text-lg"
                    }
                  >
                    ★
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
