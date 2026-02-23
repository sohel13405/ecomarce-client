import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import {
  FaMobileAlt,
  FaLaptop,
} from "react-icons/fa";
import {
  Headphones,
  Keyboard,
  Mouse,
  Router,
  Speaker,
  Tv,
} from "lucide-react";
import useProductsByCategory from "../hooks/useProductsByCategory";
import LoadingSpinner from "../components/Shared/LoadingSpinner";



const iconMap = {
  mobile: <FaMobileAlt size={22} />,
  laptop: <FaLaptop size={22} />,
  earphone: <Headphones size={22} />,
  tv: <Tv size={22} />,
  mouse: <Mouse size={22} />,
  router: <Router size={22} />,
  speaker: <Speaker size={22} />,
  keyboard: <Keyboard size={22} />,
};

const CategoryDropdown = () => {
  const { data: categories = [], isLoading } = useProductsByCategory();
  const [open, setOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Button */}
      <button className="flex items-center gap-2 font-semibold text-gray-700 hover:text-black transition">
        Categories
        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute left-0 top-full mt-3
            w-[900px] max-w-[95vw]
            bg-white shadow-2xl
            rounded-2xl p-8
            grid grid-cols-2 md:grid-cols-3 gap-8
            z-50 border
          "
        >
          {categories.map((cat) => (
            <div key={cat._id}>
              {/* Main Category */}
              <Link
                to={`/category/${cat._id}`}
                className="flex items-center gap-2 font-bold text-gray-800 hover:text-black mb-3"
              >
                <span className="text-gray-600">
                  {iconMap[cat._id?.toLowerCase()] || (
                    <FaMobileAlt size={20} />
                  )}
                </span>
                <span className="capitalize">{cat._id}</span>
              </Link>

              {/* Subcategories (SAFE CHECK) */}
              <div className="flex flex-col gap-2 ml-6">
                {Array.isArray(cat.subcategories) &&
                  cat.subcategories.map((sub, i) => (
                    <Link
                      key={i}
                      to={`/category/${cat._id}?sub=${sub}`}
                      className="text-sm text-gray-500 hover:text-black transition capitalize"
                    >
                      {sub}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
