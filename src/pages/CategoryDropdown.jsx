import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import useProductsByCategory from "../hooks/useProductsByCategory";
import LoadingSpinner from "../components/Shared/LoadingSpinner";


const CategoryDropdown = () => {
  const { data: categories = [], isLoading } = useProductsByCategory();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* CLICKABLE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-yellow-400"
      >
        Category
        <ChevronDown size={16} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-full left-0 mt-3 w-200 max-w-[95vw] bg-white text-black rounded-xl shadow-2xl p-6 z-50 grid grid-cols-2 md:grid-cols-3 gap-6">

          {categories.map((cat) => (
            <div key={cat._id}>
              <Link
                to={`/category/${cat._id}`}
                onClick={() => setOpen(false)}
                className="font-bold hover:text-blue-600 block mb-2 capitalize"
              >
                {cat._id}
              </Link>

              {Array.isArray(cat.subcategories) && (
                <div className="ml-4 flex flex-col gap-1">
                  {cat.subcategories.map((sub, i) => (
                    <Link
                      key={i}
                      to={`/category/${cat._id}?sub=${sub}`}
                      onClick={() => setOpen(false)}
                      className="text-sm text-gray-600 hover:text-black capitalize"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;