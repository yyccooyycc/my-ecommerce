import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchProducts from "../components/hooks/useFetchProducts";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";

const ProductListing = () => {
  const { id } = useParams();
  const { products, loading, error } = useFetchProducts({ collection: "latest" });

  const [filters, setFilters] = useState({
    category: ["latest"],
    sizes: [],
    color: [],
    rating: [],
    sort: "created",
    direction: "desc",
  });
  const productList = Array.isArray(products) ? products : [];
  const [gridCols, setGridCols] = useState("grid-cols-3");

    useEffect(() => {
    const updateGridCols = () => {
      const screenWidth = window.innerWidth;
       const sidebar = document.getElementById("sidebar"); 
      const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 250;
      const availableWidth = screenWidth - sidebarWidth;      

      if (availableWidth > 1025) {
        setGridCols("grid-cols-4");
      } else {
        setGridCols("grid-cols-3");
      }
    };

    updateGridCols();
    window.addEventListener("resize", updateGridCols);

    return () => window.removeEventListener("resize", updateGridCols);
  }, []);
  return (
    <div className="flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Product Grid */}
      <div className="flex-1 p-4">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ProductGrid products={productList}  className={`grid ${gridCols}`}  filters={filters} categoryId={id} />
        )}
      </div>
    </div>
  );
};

export default ProductListing;
