import { useState, useEffect } from "react";

const useFetchProducts = ({ collection }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const cachedData = localStorage.getItem(`products-${collection}`);
    if (cachedData) {
      setProducts(JSON.parse(cachedData));
      setLoading(false); 
      return;
    } 

    fetch(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=${collection}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((response) => {
        if (isMounted) {
          setProducts(response.data || []);
          localStorage.setItem(`products-${collection}`, JSON.stringify(response.data || []));
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [collection]);

  return { products, loading, error };
};

export default useFetchProducts;
