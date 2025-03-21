import { useState } from "react";
import { useParams } from "react-router-dom";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";

const ProductListing = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    category: ['latest'],
    sizes: [],
    color: [],
    rating: [],
    sort: "created",
    direction: "desc",
  });
  

  return (
    <div className="flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />
      
      {/* Product Grid */}
      <div className="flex-1 p-4">
        <ProductGrid filters={filters} categoryId={id} />
      </div>
    </div>
  );
};

export default ProductListing;
