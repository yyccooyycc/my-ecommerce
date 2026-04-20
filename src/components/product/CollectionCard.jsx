import { useEffect, useState } from 'react';
import theme from '../../assets/styles/theme';
import { getOptimizedImageUrl } from '../common/utils/imageUtils';

const loadedCollectionImages = new Set();

function CollectionCard({ collection, variant = 'secondary', onClick, priority = false }) {
  const styles = theme.featuredCollections;
  const cardClass = variant === 'primary' ? styles.primaryCard : styles.secondaryCard;

  const [isLoaded, setIsLoaded] = useState(false);

  const optimizedImageUrl = getOptimizedImageUrl(collection.image_url, 900);

  useEffect(() => {
    if (!optimizedImageUrl) {
      setIsLoaded(false);
      return;
    }

    if (loadedCollectionImages.has(optimizedImageUrl)) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
  }, [optimizedImageUrl]);

  const handleClick = () => {
    onClick?.(collection);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article className={cardClass}>
      <div
        className={`${styles.cardButton} relative overflow-hidden bg-neutral-200`}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`${collection.name} collection`}
      >
        {!isLoaded && <div className="absolute inset-0 z-20 animate-pulse bg-neutral-200" />}

        <img
          src={optimizedImageUrl}
          alt={collection.name}
          className={`${styles.image} ${isLoaded ? 'opacity-100' : 'opacity-0'} ${
            priority ? '' : 'transition-opacity duration-150'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => {
            loadedCollectionImages.add(optimizedImageUrl);
            setIsLoaded(true);
          }}
          onError={() => {
            setIsLoaded(true);
          }}
        />

        <div className={`${styles.overlay} absolute inset-0 z-10`} />

        <div className={`${styles.content} relative z-30`}>
          <p className={styles.name}>{collection.name}</p>
          <h3 className={styles.description}>{collection.description}</h3>
        </div>
      </div>
    </article>
  );
}

export default CollectionCard;
