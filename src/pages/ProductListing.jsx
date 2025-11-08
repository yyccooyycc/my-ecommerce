import { useState, useMemo, useEffect } from 'react';
import theme from '../assets/styles/theme';
import useFetchCollections from '../components/hooks/useFetchCollections';
import useFetchProducts from '../components/hooks/useFetchProducts';
import FilterSidebar from '../components/filters/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { FaFilter } from 'react-icons/fa';

const ProductListing = () => {
  const [filters, setFilters] = useState({
    collection: [],
    category: [],
    sizes: [],
    colors: [],
    ratings: [],
    sort: '',
    direction: 'desc',
  });
  const { collections } = useFetchCollections();
  const { products, loading, error } = useFetchProducts();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e) => {
      if (!e.matches) {
        setIsSidebarOpen(false);
      }
    };

    if (!mq.matches) setIsSidebarOpen(false);

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const selectedCollections = (filters.collection || []).filter((id) => id !== 'latest');

    return products
      .filter((p) => {
        const pid = p.collection?.collection_id ?? null;

        //collections union
        const matchCollection =
          selectedCollections.length === 0 || selectedCollections.includes(pid);

        //sizes union
        const allSizes = [
          ...(p.sizes?.map((s) => String(s)) ?? []),
          ...(p.inventory?.map((inv) => String(inv.size)).filter(Boolean) ?? []),
        ];
        const matchSizes =
          filters.sizes.length === 0 || allSizes.some((s) => filters.sizes.includes(s));

        //colors union
        const allColors = p.colors ?? [];
        const matchColors =
          filters.colors.length === 0 || allColors.some((c) => filters.colors.includes(c));

        //ratings union
        const matchRatings =
          filters.ratings.length === 0 ||
          filters.ratings.some((r) => p.rating >= r && p.rating < r + 1);

        //category union
        const matchCategory =
          filters.category.length === 0 || filters.category.includes(p.category?.category_id);

        //intersection
        return matchCollection && matchSizes && matchColors && matchRatings && matchCategory;
      })
      .sort((a, b) => {
        const sortKey =
          filters.sort || (filters.collection.includes('latest') ? 'created' : 'created');
        const dir = filters.direction || 'desc';

        let aValue, bValue;
        switch (sortKey) {
          case 'popular':
            aValue = a.sold ?? 0;
            bValue = b.sold ?? 0;
            break;
          case 'rating':
            aValue = a.rating ?? 0;
            bValue = b.rating ?? 0;
            break;
          case 'price':
            aValue = dir === 'asc' ? (a.priceRange?.lowest ?? 0) : (a.priceRange?.highest ?? 0);
            bValue = dir === 'asc' ? (b.priceRange?.lowest ?? 0) : (b.priceRange?.highest ?? 0);
            break;
          case 'created':
          default:
            aValue = new Date(a.created_at).getTime();
            bValue = new Date(b.created_at).getTime();
            break;
        }
        return dir === 'asc' ? aValue - bValue : bValue - aValue;
      });
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

  const errorView = error ? <p>Error: {error}</p> : null;

  return (
    <div className="flex relative">
      {/* Filter Button */}
      <button
        className={`${theme.filterSidebar.filterButton} md:hidden`}
        onClick={() => setIsSidebarOpen((v) => !v)}
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
        collections={collections}
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
        {errorView}
        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          className={`${theme.productGrid.container} ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default ProductListing;
