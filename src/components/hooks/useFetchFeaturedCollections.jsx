import { useEffect, useState } from 'react';
import { fetchProductCollections } from '../../services/productCollectionsApi';

export default function useFetchFeaturedCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadCollections() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProductCollections();

        if (!isMounted) return;
        setCollections((data || []).slice(0, 3));
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Failed to load collections.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCollections();

    return () => {
      isMounted = false;
    };
  }, []);

  return { collections, loading, error };
}
