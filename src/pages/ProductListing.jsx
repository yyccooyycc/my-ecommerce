import { useState, useMemo } from 'react';
import theme from '../assets/styles/theme';
import useFetchProducts from '../components/hooks/useFetchProducts';
import FilterSidebar from '../components/filters/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { FaFilter } from 'react-icons/fa';

const ProductListing = () => {
  const { products, loading, error } = useFetchProducts({ collection: 'latest' });
  const [filters, setFilters] = useState({
    collection: [],
    category: [],
    sizes: [],
    colors: [],
    ratings: [],
    sort: '',
    direction: 'desc',
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (error) return <p>Error: {error}</p>;

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productSizes =
        product.sizes?.length > 0
          ? product.sizes
          : product.inventory?.map((inv) => inv.size).filter(Boolean) || [];
      const productColors =
        product.colors?.length > 0
          ? product?.colors
          : product.inventory?.map((inv) => inv.color).filter(Boolean) || [];

      const sizeMatch =
        filters.sizes?.length === 0 || productSizes.some((s) => filters.sizes.includes(s));

      const colorMatch =
        filters.colors?.length === 0 || productColors.some((c) => filters.colors.includes(c));

      const ratingMatch =
        filters.ratings?.length === 0 ||
        filters.ratings?.some((r) => product.rating >= r && product.rating < r + 1);

      return sizeMatch && colorMatch && ratingMatch;
    });

    result = [...result].sort((a, b) => {
      let aValue, bValue;
      switch (filters.sort) {
        case 'popular':
          aValue = a.sold ?? 0;
          bValue = b.sold ?? 0;
          break;
        case 'rating':
          aValue = a.rating ?? 0;
          bValue = b.rating ?? 0;
          break;
        case 'price':
          aValue =
            filters.direction === 'asc'
              ? (a.priceRange?.lowest ?? 0)
              : (a.priceRange?.highest ?? 0);
          bValue =
            filters.direction === 'asc'
              ? (b.priceRange?.lowest ?? 0)
              : (b.priceRange?.highest ?? 0);
          break;
        case 'created':
        default:
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
      }
      return filters.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return result;
  }, [products, filters]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case 'price-asc':
        setFilters((prev) => ({ ...prev, sort: 'price', direction: 'asc' }));
        break;
      case 'price-desc':
        setFilters((prev) => ({ ...prev, sort: 'price', direction: 'desc' }));
        break;
      case 'popular':
        setFilters((prev) => ({ ...prev, sort: 'popular', direction: 'desc' }));
        break;
      case 'rating':
        setFilters((prev) => ({ ...prev, sort: 'rating', direction: 'desc' }));
        break;
      case 'created':
      default:
        setFilters((prev) => ({ ...prev, sort: 'created', direction: 'desc' }));
        break;
    }
  };

  return (
    <div className="flex relative">
      {/* Filter Button */}
      <button
        className={`${theme.filterSidebar.filterButton} md:hidden`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaFilter size={16} />
        <span>Filter</span>
      </button>

      {/* Sidebar */}
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Product Section */}
      <div className={theme.productListing.container}>
        {/* Header: All Products + SortBy */}
        <div className={`${theme.shared.header} ${theme.productListing.header}`}>
          <span className={theme.productListing.title}></span>

          <select
            value={
              filters.sort === 'price'
                ? filters.direction === 'asc'
                  ? 'price-asc'
                  : 'price-desc'
                : filters.sort
            }
            onChange={handleSortChange}
            className={theme.productListing.sortSelect}
            aria-label="Sort products"
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="popular">Most popular</option>
            <option value="rating">Best rating</option>
            <option value="created">Newest</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          className={theme.productListing.grid}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default ProductListing;
