'use client';
import { useState } from 'react';
import theme from '../../assets/styles/theme';
import { ratings, FILTER_KEYS } from '../filters/filterOptions';
import { FaStar } from 'react-icons/fa';

const fallbackCategories = [
  { id: 'unisex', label: 'Unisex' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
];

const fallbackSizes = [
  { code: 'xs', label: 'XS' },
  { code: 's', label: 'S' },
  { code: 'm', label: 'M' },
  { code: 'l', label: 'L' },
  { code: 'xl', label: 'XL' },
];

const fallbackColors = [
  'white',
  'black',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'brown',
  'beige',
  'pink',
];

const FilterSidebar = ({
  filters,
  setFilters,
  isSidebarOpen,
  setIsSidebarOpen,
  collections = [],
  categories = [],
  sizes = [],
  colors = [],
}) => {
  const [openSection, setOpenSection] = useState({
    collection: false,
    sizes: false,
    category: false,
    colors: false,
    ratings: false,
  });

  const categoryOptions = categories && categories.length ? categories : fallbackCategories;
  const sizeOptions = sizes && sizes.length ? sizes : fallbackSizes;
  const colorOptions = colors && colors.length ? colors : fallbackColors;

  const toggleSection = (key) => setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      let updatedValues = [...prev[filterType]];

      if (updatedValues.includes(value)) {
        updatedValues = updatedValues.filter((v) => v !== value);
      } else {
        updatedValues.push(value);
      }

      if (filterType === FILTER_KEYS.COLLECTIONS) {
        if (updatedValues.length === 0) {
          updatedValues = ['latest'];
        }
      }

      return {
        ...prev,
        [filterType]: updatedValues,
      };
    });
  };

  return (
    <aside
      className={`${theme.filterSidebar.container} ${isSidebarOpen ? 'block' : 'hidden'} md:block z-40`}
    >
      {/* Header */}
      <div className={theme.filterSidebar.header}>
        <button
          className={theme.filterSidebar.closeButton}
          onClick={() => setIsSidebarOpen(false)}
        ></button>
      </div>

      {/* Collections */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('collection')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Collections</span>
          <span>{openSection.collection ? '−' : '+'}</span>
        </button>
        {openSection.collection && (
          <div className={theme.filterSidebar.sectionContent}>
            {collections?.map(({ name, collection_id }, index) => (
              <label
                key={`${collection_id}-${index}`}
                className="flex items-center space-x-2 py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters[FILTER_KEYS.COLLECTIONS]?.includes(collection_id) ?? false}
                  onChange={() => handleCheckboxChange(FILTER_KEYS.COLLECTIONS, collection_id)}
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('sizes')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Sizes</span>
          <span>{openSection.sizes ? '−' : '+'}</span>
        </button>
        {openSection.sizes && (
          <div className={theme.filterSidebar.sectionContent}>
            {sizeOptions.map(({ code, label }) => (
              <label key={code} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={filters[FILTER_KEYS.SIZES].includes(code) ?? false}
                  onChange={() => handleCheckboxChange('sizes', code)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('category')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Category</span>
          <span>{openSection.category ? '−' : '+'}</span>
        </button>
        {openSection.category && (
          <div className={theme.filterSidebar.sectionContent}>
            {categoryOptions.map(({ id, label }) => (
              <label key={id} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={filters[FILTER_KEYS.CATEGORY].includes(id)}
                  onChange={() => handleCheckboxChange('category', id)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('colors')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Colors</span>
          <span>{openSection.colors ? '−' : '+'}</span>
        </button>
        {openSection.colors && (
          <div className="flex flex-wrap gap-3 mt-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => handleCheckboxChange('colors', color)}
                className={`w-6 h-6 rounded-full border ${
                  filters[FILTER_KEYS.COLORS].includes(color)
                    ? 'border-black scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('ratings')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Ratings</span>
          <span>{openSection.ratings ? '−' : '+'}</span>
        </button>

        {openSection.ratings && (
          <div className={theme.filterSidebar.sectionContent}>
            {ratings.map((r) => (
              <label key={r} className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(r)}
                  onChange={() => handleCheckboxChange('ratings', r)}
                />
                <span className="flex items-center">
                  {Array.from({ length: r }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                  {Array.from({ length: 5 - r }).map((_, i) => (
                    <FaStar key={`o-${i}`} className="text-gray-300" />
                  ))}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {(() => {
        const activeCount = Object.entries(filters).reduce((acc, [k, v]) => {
          if (Array.isArray(v)) return acc + v.length;
          if (k === 'sort' && typeof v === 'string' && v) return acc + 1;
          return acc;
        }, 0);

        return activeCount > 0 ? (
          <button
            onClick={() =>
              setFilters({
                collection: [],
                category: [],
                sizes: [],
                colors: [],
                ratings: [],
                sort: '',
                direction: 'desc',
              })
            }
            className={theme.filterSidebar.clearButton}
          >
            Clear All ({activeCount})
          </button>
        ) : null;
      })()}
    </aside>
  );
};

export default FilterSidebar;
