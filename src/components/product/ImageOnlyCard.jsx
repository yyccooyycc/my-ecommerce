import React from 'react';
import theme from '../../assets/styles/theme';

function ImageOnlyCard({ imageUrl, alt, variant = 'secondary', eyebrow, title, onClick }) {
  const styles = theme.featuredCollections;

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
        <img src={imageUrl} alt={alt} className={styles.image} loading="lazy" />
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
