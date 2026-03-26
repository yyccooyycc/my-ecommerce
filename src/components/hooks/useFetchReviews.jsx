import { useCallback, useEffect, useState } from 'react';
import { API_ENDPOINTS, DEFAULT_REVIEW_PARAMS } from '../../constants/api';

export default function useFetchReviews({
  productId,
  perPage = DEFAULT_REVIEW_PARAMS.per_page,
  rating = DEFAULT_REVIEW_PARAMS.rating,
}) {
  const [reviews, setReviews] = useState([]);
  const [aggregate, setAggregate] = useState({
    counts: [],
    rating: 0,
    total: 0,
  });
  const [pagination, setPagination] = useState({
    has_more: false,
    page: DEFAULT_REVIEW_PARAMS.page,
    per_page: perPage,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');

  const fetchReviews = useCallback(
    async ({ page = DEFAULT_REVIEW_PARAMS.page, append = false } = {}) => {
      if (!productId) return;

      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }

        setError('');

        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('per_page', String(perPage));

        if (rating) {
          params.set('rating', String(rating));
        }

        console.log('rating', rating);
        console.log('perPage', perPage);
        console.log(
          'request url',
          `${API_ENDPOINTS.productReviews(productId)}?${params.toString()}`
        );

        const response = await fetch(
          `${API_ENDPOINTS.productReviews(productId)}?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const result = await response.json();
        const nextReviews = Array.isArray(result?.data) ? result.data : [];

        setAggregate(
          result?.aggregate || {
            counts: [],
            rating: 0,
            total: 0,
          }
        );

        setPagination(
          result?.pagination || {
            has_more: false,
            page,
            per_page: perPage,
            total: nextReviews.length,
          }
        );

        setReviews((prev) => (append ? [...prev, ...nextReviews] : nextReviews));
      } catch (err) {
        setError(err?.message || 'Something went wrong while fetching reviews.');

        if (!append) {
          setReviews([]);
          setAggregate({
            counts: [],
            rating: 0,
            total: 0,
          });
          setPagination({
            has_more: false,
            page: DEFAULT_REVIEW_PARAMS.page,
            per_page: perPage,
            total: 0,
          });
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },

    [productId, perPage, rating]
  );

  useEffect(() => {
    setReviews([]);
    fetchReviews({ page: DEFAULT_REVIEW_PARAMS.page, append: false });
  }, [fetchReviews]);

  const loadMore = useCallback(() => {
    if (!pagination?.has_more || isLoadingMore) return;

    fetchReviews({
      page: pagination.page + 1,
      append: true,
    });
  }, [fetchReviews, pagination, isLoadingMore]);

  return {
    reviews,
    aggregate,
    pagination,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
  };
}
