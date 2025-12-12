export const ratings = [5, 4, 3, 2, 1];

export const FILTER_KEYS = {
  COLLECTIONS: 'collection',
  CATEGORY: 'category',
  SIZES: 'sizes',
  COLORS: 'colors',
  RATINGS: 'ratings',
};

// Collections
export const DEFAULT_COLLECTIONS = [
  { collection_id: 'latest', name: 'Latest Arrivals' },
  { collection_id: 'cozy', name: 'Cozy Comfort' },
  { collection_id: 'urban', name: 'Urban Oasis' },
  { collection_id: 'fresh', name: 'Fresh Fusion' },
];

export const fallbackCategories = [
  { id: 'unisex', label: 'Unisex' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
];

export const fallbackSizes = [
  { code: 'xs', label: 'XS' },
  { code: 's', label: 'S' },
  { code: 'sm', label: 'S' },
  { code: 'm', label: 'M' },
  { code: 'md', label: 'M' },
  { code: 'l', label: 'L' },
  { code: 'lg', label: 'L' },
  { code: 'xl', label: 'XL' },
];

export const fallbackColors = [
  'white',
  'black',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'brown',
  'beige',
  'pink',
];
