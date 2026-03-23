import { useNavigate } from 'react-router-dom';
import theme from '../assets/styles/theme';
import CollectionCard from '../components/product/CollectionCard';
import ImageOnlyCard from '../components/product/ImageOnlyCard';
import useFetchFeaturedCollections from '../components/hooks/useFetchFeaturedCollections';
import useFetchProducts from '../components/hooks/useFetchProducts';

function FeatureCollections() {
  const styles = theme.featuredCollections;
  const navigate = useNavigate();

  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useFetchFeaturedCollections();

  const {
    products: orangeProducts,
    loading: orangeLoading,
    error: orangeError,
  } = useFetchProducts({
    color: ['orange'],
    page: 1,
    perPage: 2,
  });

  const {
    products: blackProducts,
    loading: blackLoading,
    error: blackError,
  } = useFetchProducts({
    color: ['black'],
    page: 1,
    perPage: 3,
  });

  const handleCollectionClick = (collection) => {
    navigate(`/product-listing?collection=${collection.collection_id}`);
  };

  const handleColorCollectionClick = (color) => {
    navigate(`/product-listing?color=${color}`);
  };

  const error = collectionsError || orangeError || blackError;
  const isLoading = collectionsLoading || orangeLoading || blackLoading;

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Our Collections</h2>
          <p className="mt-4 text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Collections</h2>

        {isLoading ? (
          <div className={styles.sectionStack}>
            <div className={styles.gridPrimary}>
              <div className={`${styles.skeleton} ${styles.skeletonPrimary}`} />
              <div className={styles.secondaryColumn}>
                <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
                <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
              </div>
            </div>

            <div className={styles.gridOrange}>
              <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
              <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
            </div>

            <div className={styles.gridDark}>
              <div className={styles.darkLeftColumn}>
                <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
                <div className={`${styles.skeleton} ${styles.skeletonSecondary}`} />
              </div>
              <div className={`${styles.skeleton} ${styles.skeletonPrimary}`} />
            </div>
          </div>
        ) : (
          <div className={styles.sectionStack}>
            <div className={styles.gridPrimary}>
              {collections[0] && (
                <CollectionCard
                  collection={collections[0]}
                  variant="primary"
                  onClick={handleCollectionClick}
                />
              )}

              <div className={styles.secondaryColumn}>
                {collections[1] && (
                  <CollectionCard
                    collection={collections[1]}
                    variant="secondary"
                    onClick={handleCollectionClick}
                  />
                )}
                {collections[2] && (
                  <CollectionCard
                    collection={collections[2]}
                    variant="secondary"
                    onClick={handleCollectionClick}
                  />
                )}
              </div>
            </div>

            <div className={styles.gridOrange}>
              {orangeProducts[0] && (
                <ImageOnlyCard
                  imageUrl={orangeProducts[0].images?.[0]?.image_url || orangeProducts[0].image_url}
                  alt={orangeProducts[0].name}
                  eyebrow="Orange Collection"
                  title={orangeProducts[0].name}
                  variant="half"
                  onClick={() => handleColorCollectionClick('orange')}
                />
              )}
              {orangeProducts[1] && (
                <ImageOnlyCard
                  imageUrl={orangeProducts[1].images?.[0]?.image_url || orangeProducts[1].image_url}
                  alt={orangeProducts[1].name}
                  eyebrow="Orange Collection"
                  title={orangeProducts[1].name}
                  variant="half"
                  onClick={() => handleColorCollectionClick('orange')}
                />
              )}
            </div>

            <div className={styles.gridDark}>
              <div className={styles.darkLeftColumn}>
                {blackProducts[0] && (
                  <ImageOnlyCard
                    imageUrl={blackProducts[0].images?.[0]?.image_url || blackProducts[0].image_url}
                    alt={blackProducts[0].name}
                    eyebrow="Black Collection"
                    title={blackProducts[0].name}
                    variant="secondary"
                    onClick={() => handleColorCollectionClick('black')}
                  />
                )}
                {blackProducts[1] && (
                  <ImageOnlyCard
                    imageUrl={blackProducts[1].images?.[0]?.image_url || blackProducts[1].image_url}
                    alt={blackProducts[1].name}
                    eyebrow="Black Collection"
                    title={blackProducts[1].name}
                    variant="secondary"
                    onClick={() => handleColorCollectionClick('black')}
                  />
                )}
              </div>

              {blackProducts[2] && (
                <ImageOnlyCard
                  imageUrl={blackProducts[2].images?.[0]?.image_url || blackProducts[2].image_url}
                  alt={blackProducts[2].name}
                  eyebrow="Black Collection"
                  title={blackProducts[2].name}
                  variant="darkLarge"
                  onClick={() => handleColorCollectionClick('black')}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeatureCollections;
