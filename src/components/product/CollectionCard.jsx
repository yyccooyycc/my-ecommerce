import React from 'react';
import theme from '../../assets/styles/theme';
import { getOptimizedImageUrl } from '../common/utils/imageUtils';

function CollectionCard({ collection, variant = 'secondary', onClick, priority = false }) {
  const styles = theme.featuredCollections;
  const cardClass = variant === 'primary' ? styles.primaryCard : styles.secondaryCard;
  const imageUrl = getOptimizedImageUrl(collection.image_url, 900);

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
        className={styles.cardButton}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`${collection.name} collection`}
      >
        <img
          src={imageUrl}
          alt={collection.name}
          className={styles.image}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <p className={styles.name}>{collection.name}</p>
          <h3 className={styles.description}>{collection.description}</h3>
        </div>
      </div>
    </article>
  );
}

export default CollectionCard;
