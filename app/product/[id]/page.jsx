import ProductDetails from '../../../src/views/ProductDetails';

export default async function Page({ params }) {
  const { id } = await params;

  return <ProductDetails productId={id} />;
}
