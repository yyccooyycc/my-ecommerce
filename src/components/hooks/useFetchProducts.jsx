import { useState, useEffect } from 'react';

const API_URL = 'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products';

const useFetchProducts = ({ page = 1, perPage = 9 } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}?page=${page}&per_page=${perPage}`, {
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
  }, [page, perPage]);

  return { products, loading, error, pagination };
};

export default useFetchProducts;
