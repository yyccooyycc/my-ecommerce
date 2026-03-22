import React from 'react';
import theme from '../../assets/styles/theme';

function CollectionCard({ collection, variant = 'secondary', onClick }) {
  const styles = theme.featuredCollections;
  const cardClass = variant === 'primary' ? styles.primaryCard : styles.secondaryCard;

  const handleClick = () => {
    if (onClick) onClick(collection);
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
          src={collection.image_url}
          alt={collection.name}
          className={styles.image}
          loading="lazy"
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
