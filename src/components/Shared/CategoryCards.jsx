import {
  FaMobileAlt,
  FaLaptop,
  FaTshirt,
  FaCouch,
  FaBasketballBall,
} from "react-icons/fa";

const categories = [
  { id: 1, name: "Mobiles", count: 128, icon: <FaMobileAlt size={28} /> },
  { id: 2, name: "Laptops", count: 76, icon: <FaLaptop size={28} /> },
  { id: 3, name: "Fashion", count: 245, icon: <FaTshirt size={28} /> },
  { id: 4, name: "Furniture", count: 58, icon: <FaCouch size={28} /> },
  { id: 5, name: "Sports", count: 94, icon: <FaBasketballBall size={28} /> },
  { id: 6, name: "Fashion", count: 245, icon: <FaTshirt size={28} /> },
  { id: 7, name: "Laptops", count: 76, icon: <FaLaptop size={28} /> },
  { id: 8, name: "Mobiles", count: 128, icon: <FaMobileAlt size={28} /> },
];

export default function CategoryCards() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 min-w-max px-2">

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="
              relative min-w-[140px]
              bg-white rounded-xl
              flex flex-col items-center justify-center py-6
              cursor-pointer
              transition-all duration-300
              hover:bg-black
              group
            "
          >
            {/* Badge */}
            {/* <span
              className="
                absolute top-2 right-3
                bg-black text-white text-xs px-2 py-0.5 rounded-full
                group-hover:bg-white group-hover:text-black
                transition
              "
            >
              {cat.count}
            </span> */}

            {/* Icon */}
            <div className="text-black group-hover:text-white mb-2 transition">
              {cat.icon}
            </div>

            {/* Category Name */}
            <p className="text-sm font-semibold text-black group-hover:text-white transition">
              {cat.name}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
