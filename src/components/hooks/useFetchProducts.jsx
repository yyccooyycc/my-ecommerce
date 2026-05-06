import { useEffect, useMemo, useState } from 'react';
import { API_ENDPOINTS } from '../../constants/api';

const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const productsCache = new Map();

const useFetchProducts = ({
  page = 1,
  perPage = 9,
  collection,
  category,
  color,
  rating,
  sort = '',
  direction = '',
  minLoadingMs = 0,
  enabled = true,
} = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const normalizedCollection = useMemo(() => toArray(collection), [collection]);
  const normalizedCategory = useMemo(() => toArray(category), [category]);
  const normalizedColor = useMemo(() => toArray(color), [color]);
  const normalizedRating = useMemo(() => toArray(rating), [rating]);

  const requestUrl = useMemo(() => {
    const url = new URL(API_ENDPOINTS.products);

    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', String(perPage));

    normalizedCollection.forEach((value) => url.searchParams.append('collection', value));
    normalizedCategory.forEach((value) => url.searchParams.append('category', value));
    normalizedColor.forEach((value) => url.searchParams.append('color', value));
    normalizedRating.forEach((value) => url.searchParams.append('rating', value));

    if (sort) {
      url.searchParams.set('sort', sort);
    }

    if (sort && direction) {
      url.searchParams.set('direction', direction);
    }

    return url.toString();
  }, [
    page,
    perPage,
    normalizedCollection,
    normalizedCategory,
    normalizedColor,
    normalizedRating,
    sort,
    direction,
  ]);

  useEffect(() => {
    if (!enabled) return;

    const ac = new AbortController();

    const fetchProducts = async () => {
      const start = Date.now();

      try {
        const cachedResponse = productsCache.get(requestUrl);

        if (cachedResponse) {
          setProducts(cachedResponse.products);
          setPagination(cachedResponse.pagination);
          setError(null);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const res = await fetch(requestUrl, { signal: ac.signal });

        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const json = await res.json();

        if (ac.signal.aborted) return;

        setProducts(Array.isArray(json?.data) ? json.data : []);
        setPagination(json?.pagination || null);
        productsCache.set(requestUrl, {
          products: Array.isArray(json?.data) ? json.data : [],
          pagination: json?.pagination || null,
        });
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message || String(e));
        }
      } finally {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minLoadingMs - elapsed);

        if (remaining > 0) {
          await sleep(remaining);
        }

        if (!ac.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => ac.abort();
  }, [requestUrl, minLoadingMs, enabled]);

  return { products, loading, error, pagination };
};

export default useFetchProducts;
