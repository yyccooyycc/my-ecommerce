export function getOptimizedImageUrl(originalUrl, width = 600, options = {}) {
  if (!originalUrl) return originalUrl;

  try {
    const url = new URL(originalUrl);

    if (!url.pathname.includes('/storage/v1/object/public/')) {
      return originalUrl;
    }

    const { height, quality = 75, resize = 'contain', format } = options;

    url.pathname = url.pathname.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );

    url.searchParams.delete('size');
    url.searchParams.set('width', String(width));
    url.searchParams.set('quality', String(quality));
    url.searchParams.set('resize', resize);

    if (height) {
      url.searchParams.set('height', String(height));
    }

    if (format) {
      url.searchParams.set('format', format);
    }

    return url.toString();
  } catch {
    return originalUrl;
  }
}
