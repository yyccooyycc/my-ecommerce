import { useState, useEffect } from "react";

const useFetchProducts = ({ collection }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // 避免組件卸載時仍執行 setState
    setLoading(true);

    fetch(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=${collection}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setProducts(data);
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
      isMounted = false; // 清理函數，避免不必要的 state 更新
    };
  }, [collection]); // 只有當 `collection` 變更時才會重新發送請求

  return { products, loading, error };
};

export default useFetchProducts;
