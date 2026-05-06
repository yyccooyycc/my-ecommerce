import React from 'react';
import theme from '../../assets/styles/theme';
import { getOptimizedImageUrl } from '../common/utils/imageUtils';

function ImageOnlyCard({
  imageUrl,
  alt,
  variant = 'secondary',
  eyebrow,
  title,
  onClick,
  priority = false,
}) {
  const styles = theme.featuredCollections;
  const optimizedImageUrl = getOptimizedImageUrl(imageUrl, 900);

  const variantMap = {
    secondary: styles.secondaryCard,
    half: styles.halfCard,
    darkLarge: styles.darkLargeCard,
  };

  const cardClass = variantMap[variant] || styles.secondaryCard;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <article className={cardClass}>
      <div
        className={styles.cardButton}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={alt}
      >
        <img
          src={optimizedImageUrl}
          alt={alt}
          className={styles.image}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        <div className={styles.overlay} />

        <div className={styles.content}>
          {eyebrow ? <p className={styles.name}>{eyebrow}</p> : null}
          {title ? <h3 className={styles.description}>{title}</h3> : null}
        </div>
      </div>
    </article>
  );
}

export default ImageOnlyCard;
