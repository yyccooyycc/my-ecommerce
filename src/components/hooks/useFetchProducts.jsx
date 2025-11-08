import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products',
          { signal: ac.signal }
        );
        if (!res.ok) throw new Error('Failed to fetch products');
        const json = await res.json();
        setProducts(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
