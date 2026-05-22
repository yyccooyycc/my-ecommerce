'use client';

import { useEffect, useMemo, useState } from 'react';
import theme from '../../assets/styles/theme';
import useFetchReviews from '../../components/hooks/useFetchReviews';

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

function formatReviewDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function StarRating({ rating = 0 }) {
  return (
    <div className={theme.productReviews.starRow} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;
        return (
          <span
            key={index}
            className={filled ? theme.productReviews.starFilled : theme.productReviews.starEmpty}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function ReviewAvatar({ user }) {
  if (user?.avatar_url) {
    return (
      <img src={user.avatar_url} alt={user.name} className={theme.productReviews.avatarImage} />
    );
  }

  return (
    <div className={theme.productReviews.avatarFallback} aria-hidden="true">
      {getInitials(user?.name || '')}
    </div>
  );
}

function ReviewItem({ review }) {
  return (
    <article className={theme.productReviews.reviewCard}>
      <div className={theme.productReviews.reviewHeader}>
        <div className={theme.productReviews.reviewUserBlock}>
          <ReviewAvatar user={review.user} />

          <div className={theme.productReviews.reviewMeta}>
            <h4 className={theme.productReviews.reviewUserName}>
              {review.user?.name || 'Anonymous'}
            </h4>
            <StarRating rating={review.rating} />
          </div>
        </div>

        <time className={theme.productReviews.reviewDate}>
          {formatReviewDate(review.created_at)}
        </time>
      </div>

      {review.content ? <p className={theme.productReviews.reviewText}>{review.content}</p> : null}
    </article>
  );
}

export default function ProductReviews({ productId }) {
  const [activeRating, setActiveRating] = useState(null);
  const [perPage, setPerPage] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024 ? 12 : 10
  );

  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.innerWidth >= 1024 ? 12 : 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { reviews, aggregate, pagination, isLoading, isLoadingMore, error, loadMore } =
    useFetchReviews({
      productId,
      perPage,
      rating: activeRating,
    });

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const bandMap = useMemo(() => {
    const counts = Array.isArray(aggregate?.counts) ? aggregate.counts : [];
    const total = aggregate?.total || 0;

    return [5, 4, 3, 2, 1].map((rating) => {
      const matched = counts.find((item) => item.rating === rating);
      const count = matched?.count || 0;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

      return {
        rating,
        count,
        percentage,
      };
    });
  }, [aggregate]);

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 5:
        return 'Excellent';
      case 4:
        return 'Good';
      case 3:
        return 'Average';
      case 2:
        return 'Below Average';
      case 1:
        return 'Poor';
      default:
        return '';
    }
  };

  const handleBandClick = (rating) => {
    setActiveRating((prev) => {
      const nextRating = prev === rating ? null : rating;
      return nextRating;
    });
  };
  const handleClearFilter = () => {
    setActiveRating(null);
  };

  const remainingCount = Math.max((pagination?.total || 0) - reviews.length, 0);
  const nextLoadCount = Math.min(remainingCount, perPage);

  return (
    <section id="product-reviews" className={theme.productReviews.section}>
      <div className={theme.productReviews.container}>
        <aside className={theme.productReviews.summaryPanel}>
          <h2 className={theme.productReviews.heading}>Overall Rating</h2>

          <div className={theme.productReviews.overallRow}>
            <span className={theme.productReviews.overallScore}>
              {(aggregate?.rating || 0).toFixed(1)}
            </span>
            <StarRating rating={Math.round(aggregate?.rating || 0)} />
            <span className={theme.productReviews.totalReviews}>
              Based on {aggregate?.total || 0} reviews
            </span>
          </div>

          <div className={theme.productReviews.bandList}>
            {bandMap.map((band) => {
              const isActive = activeRating === band.rating;

              return (
                <button
                  key={band.rating}
                  type="button"
                  className={`${theme.productReviews.bandRow} ${
                    isActive ? theme.productReviews.bandRowActive : ''
                  }`}
                  onClick={() => handleBandClick(band.rating)}
                  aria-pressed={isActive}
                >
                  <span className={theme.productReviews.bandLabel}>
                    {getRatingLabel(band.rating)}
                  </span>

                  <span className={theme.productReviews.bandTrack}>
                    <span
                      className={theme.productReviews.bandFill}
                      style={{ width: `${band.percentage}%` }}
                    />
                  </span>

                  <span className={theme.productReviews.bandPercent}>{band.percentage}%</span>
                </button>
              );
            })}
          </div>

          {activeRating ? (
            <button
              type="button"
              className={theme.productReviews.clearFilterButton}
              onClick={handleClearFilter}
            >
              Clear filter
            </button>
          ) : null}
        </aside>

        <div className={theme.productReviews.listPanel}>
          {isLoading ? (
            <div className={theme.productReviews.loadingWrap}>
              <p className={theme.productReviews.loadingText}>Loading reviews...</p>
            </div>
          ) : error ? (
            <div className={theme.productReviews.errorWrap}>
              <p className={theme.productReviews.errorText}>{error}</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className={theme.productReviews.emptyState}>
              <h3 className={theme.productReviews.emptyTitle}>No reviews found</h3>
              <p className={theme.productReviews.emptyText}>
                Try clearing the current filter to see all reviews.
              </p>
            </div>
          ) : (
            <>
              <div className={theme.productReviews.reviewList}>
                {sortedReviews.map((review, index) => (
                  <ReviewItem
                    key={`${review.user?.user_id || 'user'}-${review.created_at}-${index}`}
                    review={review}
                  />
                ))}
              </div>

              {pagination?.has_more ? (
                <div className={theme.productReviews.loadMoreWrap}>
                  <button
                    type="button"
                    className={theme.productReviews.loadMoreButton}
                    onClick={loadMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? 'Loading...' : `Show ${nextLoadCount} more reviews`}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
