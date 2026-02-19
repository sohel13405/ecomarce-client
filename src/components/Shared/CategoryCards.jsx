import { Link } from "react-router";

import {
  FaMobileAlt,
  FaLaptop,
 
  
} from "react-icons/fa";
import {  Headphones, Keyboard, Mouse, Router, Speaker, Tv } from "lucide-react";
import useProductsByCategory from "../../hooks/useProductsByCategory";
import LoadingSpinner from "./LoadingSpinner";

const iconMap = {
  mobile: <FaMobileAlt size={28} />,
  laptop: <FaLaptop size={28} />,
  earphone: <Headphones size={28} />,
  tv: <Tv size={28} />,
  mouse: <Mouse size={28} />,
  router: <Router size={28} />,
  speaker: <Speaker size={28} />,
  keyboard: <Keyboard size={28}/>
  
  
};

const CategoryCards = () => {
  const { data: categories = [], isLoading } = useProductsByCategory();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 min-w-max px-2">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat._id.toLowerCase()}`}
            className="
              relative min-w-[140px]
              bg-white rounded-xl
              flex flex-col items-center justify-center py-6
              transition-all duration-300
              hover:bg-black
              group
            "
          >
            <div className="text-black group-hover:text-white mb-2 transition">
              {iconMap[cat._id.toLowerCase()] || <FaMobileAlt size={28} />}
            </div>

            <p className="text-sm font-semibold text-black group-hover:text-white transition capitalize">
              {cat._id}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
