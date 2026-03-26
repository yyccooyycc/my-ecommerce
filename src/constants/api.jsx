export const API_BASE_URL = 'https://www.greatfrontend.com/api/projects/challenges/e-commerce';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  collections: `${API_BASE_URL}/collections`,
  productDetails: (productId) => `${API_BASE_URL}/products/${productId}`,
  productReviews: (productId) => `${API_BASE_URL}/products/${productId}/reviews`,
};

export const DEFAULT_PARAMS = {
  page: 1,
  per_page: 9,
  collection: [],
  category: [],
  color: [],
  rating: [],
  sort: 'created',
  direction: 'desc',
};

export const DEFAULT_REVIEW_PARAMS = {
  page: 1,
  per_page: 12,
  rating: null,
};
