import { useState, useEffect } from 'react';
import { DEFAULT_COLLECTIONS } from '../filters/filterOptions';

const useFetchCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch('https://www.greatfrontend.com/api/projects/challenges/e-commerce/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch collections');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data?.data) {
          const apiCollections = Array.from(
            new Map(
              data.data
                .filter((p) => p.collection)
                .map((p) => [p.collection.collection_id, p.collection.name])
            )
          ).map(([collection_id, name]) => ({ collection_id, name }));

          const merged = [...DEFAULT_COLLECTIONS, ...apiCollections];
          const deduped = Array.from(new Map(merged.map((c) => [c.collection_id, c])).values());

          setCollections(deduped);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { collections, loading, error };
};

export default useFetchCollections;
