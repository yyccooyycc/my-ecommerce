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
    sort: "",
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
      case "popular": 
        aValue = a.sold ?? 0;
        bValue = b.sold ?? 0;
        break;

      case "rating": 
        aValue = a.rating ?? 0;
        bValue = b.rating ?? 0;
        break;

      case "price": 
        if (filters.direction === "asc") {
          aValue = a.priceRange?.lowest ?? 0; 
          bValue = b.priceRange?.lowest ?? 0;
        } else {
          aValue = a.priceRange?.highest ?? 0; 
          bValue = b.priceRange?.highest ?? 0;
        }
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


  const handleSortChange = (e) => {
    const value = e.target.value;

    switch (value) {
      case "price-asc":
        setFilters((prev) => ({
          ...prev,
          sort: "price",
          direction: "asc",
        }));
        break;

      case "price-desc":
        setFilters((prev) => ({
          ...prev,
          sort: "price",
          direction: "desc",
        }));
        break;

      case "popular":
        setFilters((prev) => ({
          ...prev,
          sort: "popular",
          direction: "desc",
        }));
        break;

      case "rating":
        setFilters((prev) => ({
          ...prev,
          sort: "rating", 
          direction: "desc",
        }));
        break;

      case "created":
      default:
        setFilters((prev) => ({
          ...prev,
          sort: "created", 
          direction: "desc",
        }));
        break;
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Product section */}
      <div className={theme.productListing.container}>
        <div
          className={`${theme.shared.header} ${theme.productListing.header}`}
        >
          <span className={theme.productListing.title}>All Products</span>
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className={theme.productListing.sortSelect}
          >
            <option value="" disabled>Sort by</option>
            <option value="popular">Most popular</option>
            <option value="rating">Best rating</option>
            <option value="created">Newest</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>
        {/* Product Grid */}
        <div className="flex-1 p-4">
          <ProductGrid
            products={filteredProducts}
            className={theme.productListing.grid}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
