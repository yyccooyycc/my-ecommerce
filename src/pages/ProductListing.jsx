import { useState, useMemo, useEffect } from 'react';
import theme from '../assets/styles/theme';
import useFetchCollections from '../components/hooks/useFetchCollections';
import useFetchProducts from '../components/hooks/useFetchProducts';
import FilterSidebar from '../components/filters/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { FiFilter } from 'react-icons/fi';

const perPage = 9;

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { collections } = useFetchCollections();
  const { products, loading, error, pagination } = useFetchProducts({ page, perPage });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');

    const handleChange = (e) => {
      if (!e.matches) setIsSidebarOpen(false);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const categoryOptions = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const cat = p.category;
      if (cat?.category_id && !map.has(cat.category_id)) {
        map.set(cat.category_id, {
          id: cat.category_id,
          label: cat.name,
        });
      }
    });
    return Array.from(map.values());
  }, [products]);

  const sizeOptions = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      (p.sizes || []).forEach((s) => set.add(String(s).toLowerCase()));
      (p.inventory || [])
        .map((inv) => inv.size)
        .filter((s) => s != null)
        .forEach((s) => set.add(String(s).toLowerCase()));
    });

    return Array.from(set).map((code) => ({
      code,
      label: code.toUpperCase(),
    }));
  }, [products]);

  const colorOptions = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      (p.colors || []).forEach((c) => set.add(c));
    });
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const selectedCollections = (filters.collection || []).filter((id) => id !== 'latest');

    return [...products]
      .filter((p) => {
        const pid = p.collection?.collection_id ?? null;

        const matchCollection =
          selectedCollections.length === 0 || selectedCollections.includes(pid);

        const allSizes = [
          ...(p.sizes?.map((s) => String(s).toLowerCase()) ?? []),
          ...(p.inventory
            ?.map((inv) => inv.size)
            .filter(Boolean)
            .map((s) => String(s).toLowerCase()) ?? []),
        ];
        const matchSizes =
          filters.sizes.length === 0 || allSizes.some((s) => filters.sizes.includes(s));

        const allColors = p.colors ?? [];
        const matchColors =
          filters.colors.length === 0 || allColors.some((c) => filters.colors.includes(c));

        const matchRatings =
          filters.ratings.length === 0 ||
          filters.ratings.some((r) => p.rating >= r && p.rating < r + 1);

        const matchCategory =
          filters.category.length === 0 || filters.category.includes(p.category?.category_id);

        return matchCollection && matchSizes && matchColors && matchRatings && matchCategory;
      })
      .sort((a, b) => {
        const sortKey = filters.sort || 'created';
        const dir = filters.direction || 'desc';

        let aValue;
        let bValue;

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
        setFilters((prev) => ({
          ...prev,
          sort: 'popular',
          direction: 'desc',
        }));
        break;
      case 'rating':
        setFilters((prev) => ({
          ...prev,
          sort: 'rating',
          direction: 'desc',
        }));
        break;
      case 'created':
      default:
        setFilters((prev) => ({
          ...prev,
          sort: 'created',
          direction: 'desc',
        }));
        break;
    }
  };

  const hasMore = pagination?.has_more ?? false;

  return (
    <div className={theme.productListing.page}>
      <div className={theme.productListing.shell}>
        <div className={`${theme.productListing.layout} relative`}>
          <button
            className={`${theme.filterSidebar.filterButton} ${isSidebarOpen ? 'hidden' : ''}`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <FiFilter className={theme.filterSidebar.filterIcon} />
            <span className={theme.filterSidebar.filterText}>Filter</span>
          </button>

          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            collections={collections}
            categories={categoryOptions}
            sizes={sizeOptions}
            colors={colorOptions}
          />

          {isSidebarOpen && (
            <div
              className="fixed inset-0 md:hidden z-30 bg-transparent"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div className={theme.productListing.container}>
            <div className={`${theme.shared.header} ${theme.productListing.header}`}>
              <span></span>

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
                <option value="created">Newest</option>
                <option value="popular">Most popular</option>
                <option value="rating">Best rating</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
              </select>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <ProductGrid
              products={filteredProducts}
              className={theme.productGrid.productListingCols}
              isLoading={loading}
              currentPage={page}
            />

            {(page > 1 || hasMore) && (
              <div className="flex justify-center items-center mt-8 gap-4">
                <button
                  disabled={page === 1 || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span>Page {page}</span>

                <button
                  disabled={!hasMore || loading}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
