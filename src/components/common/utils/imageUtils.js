export function getOptimizedImageUrl(originalUrl, size = 'medium') {
  if (!originalUrl) return originalUrl;

  const url = new URL(originalUrl);

  url.searchParams.set('size', size);

  return url.toString();
}
