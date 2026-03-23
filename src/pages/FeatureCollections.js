import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../assets/styles/theme';
import CollectionCard from '../components/product/CollectionCard';
import useFetchFeaturedCollections from '../components/hooks/useFetchFeaturedCollections';

function FeaturedCollections() {
  const styles = theme.featuredCollections;
  const navigate = useNavigate();
  const { collections, loading, error } = useFetchFeaturedCollections();

  const handleCollectionClick = (collection) => {
    navigate(`/product-listing?collection=${collection.collection_id}`);
  };

  if (error) {
    return (
      <section className={styles.section} aria-labelledby="featured-collections-title">
        <div className={styles.container}>
          <h2 id="featured-collections-title" className={styles.heading}>
            Our Collections
          </h2>
          <p className="mt-4 text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="featured-collections-title">
      <div className={styles.container}>
        <h2 id="featured-collections-title" className={styles.heading}>
          Our Collections
        </h2>

        {loading ? (
          <div className={styles.grid}>
            <div className={`${styles.skeleton} ${styles.skeletonPrimary}`} />
            <div className={styles.secondaryColumn}>
              <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
              <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {collections[0] && (
              <CollectionCard
                collection={collections[0]}
                variant="primary"
                onClick={handleCollectionClick}
              />
            )}

            <div className={styles.secondaryColumn}>
              {collections.slice(1).map((collection) => (
                <CollectionCard
                  key={collection.collection_id}
                  collection={collection}
                  variant="secondary"
                  onClick={handleCollectionClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCollections;
