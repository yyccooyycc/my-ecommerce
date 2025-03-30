import { useState } from "react";
import theme from "../assets/styles/theme";
import useFetchProducts from "../components/hooks/useFetchProducts";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";

const ProductListing = () => {
  const { products, loading, error } = useFetchProducts({ collection: "latest" });

  const [filters, setFilters] = useState({
    category: ["latest"],
    sizes: [],
    color: [],
    rating: [],
    sort: "created",
    direction: "desc",
  });
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Product Grid */}
      <div className="flex-1 p-4">
        <ProductGrid products={products} className={theme.productListing.grid} isLoading={loading} />
      </div>
    </div>
  );
};

export default ProductListing;
