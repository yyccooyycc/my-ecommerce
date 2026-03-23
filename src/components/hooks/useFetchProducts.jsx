import { useState, useEffect } from 'react';

const API_URL = 'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products';

const useFetchProducts = ({
  page = 1,
  perPage = 9,
  collection = [],
  category = [],
  color = [],
  rating = [],
  sort = '',
  direction = 'desc',
} = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    const buildUrl = () => {
      const url = new URL(API_URL);

      url.searchParams.set('page', page);
      url.searchParams.set('per_page', perPage);

      collection.forEach((value) => url.searchParams.append('collection', value));
      category.forEach((value) => url.searchParams.append('category', value));
      color.forEach((value) => url.searchParams.append('color', value));
      rating.forEach((value) => url.searchParams.append('rating', value));

      if (sort) {
        url.searchParams.set('sort', sort);
      }

      if (direction) {
        url.searchParams.set('direction', direction);
      }

      return url.toString();
    };

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(buildUrl(), {
          signal: ac.signal,
        });

        if (!res.ok) throw new Error('Failed to fetch products');

        const json = await res.json();
        setProducts(Array.isArray(json?.data) ? json.data : []);
        setPagination(json?.pagination || null);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message || String(e));
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [
    page,
    perPage,
    JSON.stringify(collection),
    JSON.stringify(category),
    JSON.stringify(color),
    JSON.stringify(rating),
    sort,
    direction,
  ]);

  return { products, loading, error, pagination };
};

export default useFetchProducts;
