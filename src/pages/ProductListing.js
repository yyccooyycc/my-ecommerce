import { useParams } from "react-router-dom";



const ProductListing = () => {
  const { id } = useParams();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
      ProductListing
    </div>
  );
};

export default ProductListing;