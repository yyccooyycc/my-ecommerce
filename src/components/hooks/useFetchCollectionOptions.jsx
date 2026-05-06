import { useState, useEffect } from 'react';
import { DEFAULT_COLLECTIONS } from '../filters/filterOptions';
import { API_ENDPOINTS } from '../../constants/api';

const useFetchCollectionOptions = () => {
  const [collections, setCollections] = useState(DEFAULT_COLLECTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_ENDPOINTS.collections, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch collection options');
        return res.json();
      })
      .then((data) => {
        const apiCollections = (data?.data || [])
          .filter((collection) => collection?.collection_id)
          .map((collection) => ({
            collection_id: collection.collection_id,
            name: collection.name,
          }));

        const dedupedCollections = Array.from(
          new Map(
            [...DEFAULT_COLLECTIONS, ...apiCollections].map((collection) => [
              collection.collection_id,
              collection,
            ])
          ).values()
        );

        setCollections(dedupedCollections);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { collections, loading, error };
};

export default useFetchCollectionOptions;
