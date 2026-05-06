import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import theme from '../assets/styles/theme';
import useFetchCollectionOptions from '../components/hooks/useFetchCollectionOptions';
import useFetchProducts from '../components/hooks/useFetchProducts';
import FilterSidebar from '../components/filters/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { FiFilter } from 'react-icons/fi';

const perPage = 6;

const VALID_CATEGORY_IDS = ['unisex', 'women', 'men'];
const VALID_COLLECTION_IDS = ['cozy', 'urban', 'fresh'];

const areArraysEqual = (a = [], b = []) =>
  a.length === b.length && a.every((item, index) => item === b[index]);

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    collection: [],
    category: [],
    sizes: [],
    colors: [],
    ratings: [],
    sort: '',
    direction: '',
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { collections } = useFetchCollectionOptions();

  const buildSearchFromFilters = (nextFilters) => {
    const params = new URLSearchParams();

    (nextFilters.collection || []).forEach((value) => {
      if (value) params.append('collection', value);
    });

    (nextFilters.category || []).forEach((value) => {
      if (value) params.append('category', value);
    });

    (nextFilters.colors || []).forEach((value) => {
      if (value) params.append('color', value);
    });

    (nextFilters.sizes || []).forEach((value) => {
      if (value) params.append('size', value);
    });

    (nextFilters.ratings || []).forEach((value) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append('rating', String(value));
      }
    });

    // Only persist sort params when a sort option is selected.
    if (nextFilters.sort) {
      params.set('sort', nextFilters.sort);
    }

    if (nextFilters.direction) {
      params.set('direction', nextFilters.direction);
    }

    return params.toString();
  };

  const updateFiltersAndUrl = (updater) => {
    setFilters((prev) => {
      const nextFilters = typeof updater === 'function' ? updater(prev) : updater;

      const query = buildSearchFromFilters(nextFilters);
      const nextUrl = query ? `${location.pathname}?${query}` : location.pathname;
      const currentUrl = `${location.pathname}${location.search}`;

      if (nextUrl !== currentUrl) {
        navigate(nextUrl, { replace: true });
      }

      return nextFilters;
    });
  };

  useEffect(() => {
    const nextCollection = searchParams
      .getAll('collection')
      .filter((value) => VALID_COLLECTION_IDS.includes(value));

    const nextCategory = searchParams
      .getAll('category')
      .filter((value) => VALID_CATEGORY_IDS.includes(value));

    const nextColors = searchParams.getAll('color').map((value) => value.toLowerCase());

    const nextSizes = searchParams.getAll('size').map((value) => value.toLowerCase());

    const nextRatings = searchParams.getAll('rating');

    const rawSort = searchParams.get('sort') || '';
    const rawDirection = searchParams.get('direction') || '';

    // Validate sort params from the URL before syncing them into state.
    const validSortPairs = [
      { sort: 'created', direction: 'desc' },
      { sort: 'popular', direction: 'desc' },
      { sort: 'rating', direction: 'desc' },
      { sort: 'price', direction: 'asc' },
      { sort: 'price', direction: 'desc' },
    ];

    const matchedSortPair = validSortPairs.find(
      (item) => item.sort === rawSort && item.direction === rawDirection
    );

    const nextSort = matchedSortPair?.sort || '';
    const nextDirection = matchedSortPair?.direction || '';

    setFilters((prev) => {
      const sameCollection = areArraysEqual(prev.collection, nextCollection);
      const sameCategory = areArraysEqual(prev.category, nextCategory);
      const sameColors = areArraysEqual(prev.colors, nextColors);
      const sameSizes = areArraysEqual(prev.sizes, nextSizes);
      const sameRatings = areArraysEqual(prev.ratings.map(String), nextRatings.map(String));
      const sameSort = prev.sort === nextSort;
      const sameDirection = prev.direction === nextDirection;

      if (
        sameCollection &&
        sameCategory &&
        sameColors &&
        sameSizes &&
        sameRatings &&
        sameSort &&
        sameDirection
      ) {
        return prev;
      }

      return {
        ...prev,
        collection: nextCollection,
        category: nextCategory,
        colors: nextColors,
        sizes: nextSizes,
        ratings: nextRatings,
        sort: nextSort,
        direction: nextDirection,
      };
    });

    setPage(1);
  }, [searchParams]);

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
  }, [
    filters.collection,
    filters.category,
    filters.sizes,
    filters.colors,
    filters.ratings,
    filters.sort,
    filters.direction,
  ]);

  const { products, loading, error, pagination } = useFetchProducts({
    page,
    perPage,
    collection: filters.collection,
    category: filters.category,
    color: filters.colors,
    rating: filters.ratings,
    sort: filters.sort || undefined,
    direction: filters.direction || undefined,
  });

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
      (p.colors || []).forEach((c) => {
        set.add(String(c).toLowerCase());
      });
    });

    return Array.from(set);
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (!filters.sizes.length) return products;

    return products.filter((p) => {
      const allSizes = [
        ...(p.sizes?.map((s) => String(s).toLowerCase()) ?? []),
        ...(p.inventory
          ?.map((inv) => inv.size)
          .filter(Boolean)
          .map((s) => String(s).toLowerCase()) ?? []),
      ];

      return allSizes.some((s) => filters.sizes.includes(s));
    });
  }, [products, filters.sizes]);

  const handleSortChange = (e) => {
    const value = e.target.value;

    updateFiltersAndUrl((prev) => {
      switch (value) {
        case 'price-asc':
          return { ...prev, sort: 'price', direction: 'asc' };
        case 'price-desc':
          return { ...prev, sort: 'price', direction: 'desc' };
        case 'popular':
          return { ...prev, sort: 'popular', direction: 'desc' };
        case 'rating':
          return { ...prev, sort: 'rating', direction: 'desc' };
        case 'created':
          return { ...prev, sort: 'created', direction: 'desc' };
        case '':
        default:
          return { ...prev, sort: '', direction: '' };
      }
    });
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
            setFilters={updateFiltersAndUrl}
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
                    : filters.sort || ''
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
              products={visibleProducts}
              className={theme.productGrid.productListingCols}
              isLoading={loading}
              currentPage={page}
              priorityCount={4}
              skeletonCount={perPage}
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
