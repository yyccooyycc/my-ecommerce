import { useState } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["red", "blue", "green", "black", "white"];
const ratings = [5, 4, 3, 2, 1];

const FilterSidebar = ({ filters, setFilters }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const clearFilters = () => {
    setFilters({ sizes: [], colors: [], ratings: [] });
  };

  return (
    <div className="w-64 p-4 border-r bg-gray-100 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Size Filter */}
      <div className="mb-4">
        <button
          className="flex justify-between w-full text-left font-medium py-2"
          onClick={() => toggleSection("sizes")}
        >
          Sizes <FaChevronDown className={`transition ${openSection === "sizes" ? "rotate-180" : ""}`} />
        </button>
        {openSection === "sizes" && (
          <div className="pl-4">
            {sizes.map((size) => (
              <label key={size} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => handleCheckboxChange("sizes", size)}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Swatches */}
      <div className="mb-4">
        <button
          className="flex justify-between w-full text-left font-medium py-2"
          onClick={() => toggleSection("colors")}
        >
          Colors <FaChevronDown className={`transition ${openSection === "colors" ? "rotate-180" : ""}`} />
        </button>
        {openSection === "colors" && (
          <div className="flex space-x-2 pl-4">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${filters.colors.includes(color) ? "border-black" : "border-transparent"}`}
                style={{ backgroundColor: color }}
                onClick={() => handleCheckboxChange("colors", color)}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <button
          className="flex justify-between w-full text-left font-medium py-2"
          onClick={() => toggleSection("ratings")}
        >
          Ratings <FaChevronDown className={`transition ${openSection === "ratings" ? "rotate-180" : ""}`} />
        </button>
        {openSection === "ratings" && (
          <div className="pl-4">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(rating)}
                  onChange={() => handleCheckboxChange("ratings", rating)}
                  className="mr-2"
                />
                <span className="flex text-yellow-500">
                  {Array(rating).fill(<FaStar />)}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear All Button */}
      {Object.values(filters).some((arr) => arr.length > 0) && (
        <button
          onClick={clearFilters}
          className="mt-4 text-sm text-red-500 underline"
        >
          Clear All ({Object.values(filters).flat().length})
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
