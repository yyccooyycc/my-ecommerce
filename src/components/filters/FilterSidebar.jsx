'use client';
import { useState } from 'react';
import theme from '../../assets/styles/theme';
import { sizes, colors, ratings, categories, collection } from '../filters/filterOptions';
import { FaStar } from 'react-icons/fa';
import { FILTER_KEYS } from '../filters/filterOptions';

const FilterSidebar = ({ filters, setFilters, isSidebarOpen, setIsSidebarOpen }) => {
  const [openSection, setOpenSection] = useState({
    collection: false,
    sizes: false,
    category: false,
    colors: false,
    ratings: false,
  });

  const toggleSection = (key) => setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((v) => v !== value)
        : [...prev[filterType], value],
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: ['latest'],
      sizes: [],
      colors: [],
      ratings: [],
      sort: '',
      direction: 'desc',
    });
  };

  return (
    <>
      <aside
        className={`${theme.filterSidebar.container} ${
          isSidebarOpen ? theme.filterSidebar.open : theme.filterSidebar.close
        }`}
      >
        {/* Header */}
        <div className={theme.filterSidebar.header}>
          <button
            className={theme.filterSidebar.closeButton}
            onClick={() => setIsSidebarOpen(false)}
          >
          </button>
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
              {collection.map((col) => (
                <label key={col} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    checked={filters[FILTER_KEYS.COLLECTIONS]?.includes(col) ?? false}
                    onChange={() => handleCheckboxChange('collection', col)}
                  />
                  <span>{col}</span>
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
              {sizes.map(({ code, label }) => (
                <label key={code} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    checked={filters[FILTER_KEYS.SIZES].includes(code) ?? false}
                    onChange={() => handleCheckboxChange('sizes', code)}
                  />
                  <span>
                    {code} – {label}
                  </span>
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
              {categories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    checked={filters[FILTER_KEYS.CATEGORY].includes(cat) ?? false}
                    onChange={() => handleCheckboxChange('category', cat)}
                  />
                  <span>{cat}</span>
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
              {colors.map((color) => (
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
        <button onClick={handleClearFilters} className={theme.filterSidebar.clearButton}>
          Clear Filters
        </button>
      </aside>
    </>
  );
};

export default FilterSidebar;
