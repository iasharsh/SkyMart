import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";

const ProductsContext = createContext();

const CATEGORY_MAP = {
  smartphones: "Electronics",
  laptops: "Electronics",
  tablets: "Electronics",
  "mobile-accessories": "Electronics",

  "mens-shirts": "Clothing",
  "womens-dresses": "Clothing",
  tops: "Clothing",

  furniture: "Furniture",

  "home-decoration": "Home",
  "kitchen-accessories": "Home",
  groceries: "Home",

  "sports-accessories": "Sports",

  "mens-watches": "Accessories",
  "womens-watches": "Accessories",
  "womens-bags": "Accessories",
  "womens-jewellery": "Accessories",
  sunglasses: "Accessories",
  "mens-shoes": "Accessories",
  "womens-shoes": "Accessories",
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const normalized = data.products.map((p) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          description: p.description,
          image: p.thumbnail,
          category: CATEGORY_MAP[p.category] || "Home",
          rating: p.rating ?? 4.5,
          reviews: p.reviews?.length ?? Math.floor(Math.random() * 150) + 20,
        }));
        setProducts(normalized);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
