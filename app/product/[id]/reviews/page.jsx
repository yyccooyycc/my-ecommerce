import ProductReviewsPage from '../../../../src/views/ProductReviewsPage';

export default async function Page({ params }) {
  const { id } = await params;

  return <ProductReviewsPage productId={id} />;
}
