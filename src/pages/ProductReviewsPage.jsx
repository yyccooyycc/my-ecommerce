import { useNavigate, useParams } from 'react-router-dom';
import ProductReviews from '../components/product/ProductReviews';
import theme from '../assets/styles/theme';

export default function ProductReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <main className={theme.productReviewsPage?.page || 'mx-auto max-w-[1280px] px-4 py-8'}>
      <button
        type="button"
        onClick={() => navigate(`/product/${id}`)}
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
