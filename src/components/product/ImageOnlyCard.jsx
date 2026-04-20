import { useEffect, useState } from 'react';
import theme from '../../assets/styles/theme';
import { getOptimizedImageUrl } from '../common/utils/imageUtils';

const loadedImages = new Set();

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

  const [isLoaded, setIsLoaded] = useState(false);
  const optimizedImageUrl = getOptimizedImageUrl(imageUrl, 900);

  const variantMap = {
    secondary: styles.secondaryCard,
    half: styles.halfCard,
    darkLarge: styles.darkLargeCard,
  };

  const cardClass = variantMap[variant] || styles.secondaryCard;

  useEffect(() => {
    if (!optimizedImageUrl) {
      setIsLoaded(false);
      return;
    }

    if (loadedImages.has(optimizedImageUrl)) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
  }, [optimizedImageUrl]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <article className={cardClass}>
      <div
        className={`${styles.cardButton} relative overflow-hidden bg-neutral-200`}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={alt}
      >
        {!isLoaded && <div className="absolute inset-0 z-20 animate-pulse bg-neutral-200" />}

        <img
          src={optimizedImageUrl}
          alt={alt}
          className={`${styles.image} ${isLoaded ? 'opacity-100' : 'opacity-0'} ${
            priority ? '' : 'transition-opacity duration-150'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => {
            loadedImages.add(optimizedImageUrl);
            setIsLoaded(true);
          }}
          onError={() => {
            setIsLoaded(true);
          }}
        />

        <div className={`${styles.overlay} absolute inset-0 z-10`} />

        <div className={`${styles.content} relative z-30`}>
          {eyebrow ? <p className={styles.name}>{eyebrow}</p> : null}
          {title ? <h3 className={styles.description}>{title}</h3> : null}
        </div>
      </div>
    </article>
  );
}

export default ImageOnlyCard;
