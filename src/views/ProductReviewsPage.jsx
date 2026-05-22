'use client';

import { useRouter } from 'next/navigation';
import ProductReviews from '../components/product/ProductReviews';
import theme from '../assets/styles/theme';

export default function ProductReviewsPage({ productId }) {
  const router = useRouter();
  const id = productId;

  return (
    <main className={theme.productReviewsPage?.page || 'mx-auto max-w-[1280px] px-4 py-8'}>
      <button
        type="button"
        onClick={() => router.push(`/product/${id}`)}
        className={
          theme.productReviewsPage?.backButton ||
          'mb-6 text-sm text-neutral-600 hover:text-neutral-900'
        }
      >
        ← Back to product
      </button>

      <ProductReviews productId={id} />
    </main>
  );
}
