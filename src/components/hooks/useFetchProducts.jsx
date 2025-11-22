import { useState, useEffect } from 'react';

const API_URL = 'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        let page = 1;
        const perPage = 9;
        let all = [];

        while (true) {
          const res = await fetch(`${API_URL}?page=${page}&per_page=${perPage}`, {
            signal: ac.signal,
          });
          if (!res.ok) throw new Error('Failed to fetch products');

          const json = await res.json();
          const data = Array.isArray(json?.data) ? json.data : [];
          all = all.concat(data);

          const pag = json.pagination;
          if (!pag || !pag.has_more) break;
          page += 1;
        }

        setProducts(all);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message || String(e));
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
