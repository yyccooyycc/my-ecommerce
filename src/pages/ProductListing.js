import { useState, useMemo } from "react";
import theme from "../assets/styles/theme";
import useFetchProducts from "../components/hooks/useFetchProducts";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";

const ProductListing = () => {
  const { products, loading, error } = useFetchProducts({
    collection: "latest",
  });

  const [filters, setFilters] = useState({
    category: ["latest"],
    sizes: [],
    colors: [],
    ratings: [],
    sort: "created",
    direction: "desc",
  });

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productSizes =
        (product.sizes && product.sizes.length > 0
          ? product.sizes
          : product.inventory?.map((inv) => inv.size).filter(Boolean)) || [];

      const productColors =
        (product.colors && product.colors.length > 0
          ? product.colors
          : product.inventory?.map((inv) => inv.color).filter(Boolean)) || [];

      const sizeMatch =
        filters.sizes.length === 0 ||
        productSizes.some((s) => filters.sizes.includes(s));

      const colorMatch =
        filters.colors.length === 0 ||
        productColors.some((c) => filters.colors.includes(c));

      const ratingMatch =
        filters.ratings.length === 0 ||
        filters.ratings.some(
          (r) => product.rating >= r && product.rating < r + 1
        );

      return sizeMatch && colorMatch && ratingMatch;
    });

    result = [...result].sort((a, b) => {
      let aValue, bValue;

      switch (filters.sort) {
        case "price":
          aValue = a.priceRange?.lowest ?? 0;
          bValue = b.priceRange?.lowest ?? 0;
          break;
        case "rating":
          aValue = a.rating ?? 0;
          bValue = b.rating ?? 0;
          break;
        case "created":
        default:
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
      }

      return filters.direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    return result;
  }, [products, filters]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Product Grid */}
      <div className="flex-1 p-4">
        <ProductGrid
          products={filteredProducts}
          className={theme.productListing.grid}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default ProductListing;
