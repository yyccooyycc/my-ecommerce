import { useState, useEffect } from 'react';
import { DEFAULT_COLLECTIONS } from '../filters/filterOptions';
import { API_ENDPOINTS } from '../../constants/api';

const useFetchCollectionOptions = () => {
  const [collections, setCollections] = useState(DEFAULT_COLLECTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(API_ENDPOINTS.products)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch collection options');
        return res.json();
      })
      .then((data) => {
        if (!isMounted || !data?.data) return;

        const apiCollections = Array.from(
          new Map(
            data.data
              .filter((product) => product.collection)
              .map((product) => [
                product.collection.collection_id,
                {
                  collection_id: product.collection.collection_id,
                  name: product.collection.name,
                },
              ])
          ).values()
        );

        const mergedCollections = [...DEFAULT_COLLECTIONS, ...apiCollections];

        const dedupedCollections = Array.from(
          new Map(
            mergedCollections.map((collection) => [collection.collection_id, collection])
          ).values()
        );

        setCollections(dedupedCollections);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { collections, loading, error };
};

export default useFetchCollectionOptions;
