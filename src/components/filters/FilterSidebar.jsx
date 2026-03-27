'use client';
import { useState } from 'react';
import theme from '../../assets/styles/theme';
import {
  ratings,
  FILTER_KEYS,
  fallbackCategories,
  fallbackSizes,
  fallbackColors,
} from '../filters/filterOptions';
import { FaStar } from 'react-icons/fa';

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

  const hasSelectedOptions = (filterKey) => {
    return Array.isArray(filters[filterKey]) && filters[filterKey].length > 0;
  };

  const isSectionOpen = (sectionKey, filterKey) => {
    return openSection[sectionKey] || hasSelectedOptions(filterKey);
  };

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

      return {
        ...prev,
        [filterType]: updatedValues,
      };
    });
  };

  return (
    <aside
      className={`${theme.filterSidebar.container} ${isSidebarOpen ? 'block' : 'hidden'} lg:block z-40`}
    >
      {/* Header */}
      <div className={theme.filterSidebar.header}>
        <button
          className={theme.filterSidebar.closeButton}
          onClick={() => setIsSidebarOpen(false)}
        ></button>
      </div>

      {/* Collections */}
      <div className={theme.filterSidebar.sectionWrap}>
        <button
          onClick={() => toggleSection('collection')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Collections</span>
          <span>{isSectionOpen('collection', FILTER_KEYS.COLLECTIONS) ? '−' : '+'}</span>
        </button>
        {isSectionOpen('collection', FILTER_KEYS.COLLECTIONS) && (
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
      <div className={theme.filterSidebar.sectionWrap}>
        <button
          onClick={() => toggleSection('sizes')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Sizes</span>
          <span>{isSectionOpen('sizes', FILTER_KEYS.SIZES) ? '−' : '+'}</span>
        </button>
        {isSectionOpen('sizes', FILTER_KEYS.SIZES) && (
          <div className={theme.filterSidebar.sectionContent}>
            {sizeOptions.map(({ code, label }) => (
              <label key={code} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={filters[FILTER_KEYS.SIZES].includes(code) ?? false}
                  onChange={() => handleCheckboxChange(FILTER_KEYS.SIZES, code)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div className={theme.filterSidebar.sectionWrap}>
        <button
          onClick={() => toggleSection('category')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Category</span>
          <span>{isSectionOpen('category ', FILTER_KEYS.CATEGORY) ? '−' : '+'}</span>
        </button>
        {isSectionOpen('category ', FILTER_KEYS.CATEGORY) && (
          <div className={theme.filterSidebar.sectionContent}>
            {categoryOptions.map(({ id, label }) => (
              <label key={id} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={filters[FILTER_KEYS.CATEGORY].includes(id)}
                  onChange={() => handleCheckboxChange(FILTER_KEYS.CATEGORY, id)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className={theme.filterSidebar.sectionWrap}>
        <button
          onClick={() => toggleSection(FILTER_KEYS.COLORS)}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Colors</span>
          <span>{isSectionOpen('colors ', FILTER_KEYS.COLORS) ? '−' : '+'}</span>
        </button>
        {isSectionOpen('colors ', FILTER_KEYS.COLORS) && (
          <div className="flex flex-wrap gap-3 mt-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => handleCheckboxChange(FILTER_KEYS.COLORS, color)}
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
      <div className={theme.filterSidebar.sectionWrap}>
        <button
          onClick={() => toggleSection('ratings')}
          className={theme.filterSidebar.sectionButton}
        >
          <span>Ratings</span>
          <span>{isSectionOpen('ratings ', FILTER_KEYS.RATINGS) ? '−' : '+'}</span>
        </button>

        {isSectionOpen('ratings ', FILTER_KEYS.RATINGS) && (
          <div className={theme.filterSidebar.sectionContent}>
            {ratings.map((r) => (
              <label key={r} className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(r)}
                  onChange={() => handleCheckboxChange(FILTER_KEYS.RATINGS, r)}
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
        const activeCount = [
          ...(filters.collection || []),
          ...(filters.category || []),
          ...(filters.sizes || []),
          ...(filters.colors || []),
          ...(filters.ratings || []),
        ].length;

        return activeCount > 0 ? (
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                collection: [],
                category: [],
                sizes: [],
                colors: [],
                ratings: [],
                sort: '',
                direction: '',
              }))
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
