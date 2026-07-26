import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Furniture",
  "Home",
  "Sports",
  "Accessories",
];

const Shop = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All Categories";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "Featured";

  const hasActiveFilters =
    category !== "All Categories" ||
    search.trim() !== "" ||
    sort !== "Featured";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "All Categories" || value === "Featured") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearAll = () => setSearchParams(new URLSearchParams());

  const filteredProducts = useMemo(() => {
    let result = products;

    if (category !== "All Categories") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sort === "Price: Low to High") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "Price: High to Low") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "Top Rated") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <div className="bg-black min-h-screen">
      {/* Page header */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold text-white">
          {category === "All Categories" ? "All Products" : category}
        </h1>
        <p className="text-neutral-400 text-sm mt-1">
          {loading ? (
            "Loading products..."
          ) : (
            <>
              {filteredProducts.length} products found
              {category !== "All Categories" && (
                <>
                  {" "}
                  in{" "}
                  <span className="text-lime-400 font-semibold">
                    {category}
                  </span>
                </>
              )}
            </>
          )}
        </p>
      </section>

      {/* Toolbar: search + filters */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex flex-col md:flex-row items-center gap-4 rounded-2xl border border-neutral-300 px-4 py-4">
          {/* Search */}
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-3 w-full">
            <i className="fa-solid fa-magnifying-glass text-neutral-500 text-sm"></i>

            <input
              type="text"
              value={search}
              onChange={(e) => updateParam("search", e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
            />
          </div>

          {/* Category */}
          <div className="relative min-w-[180px] w-full md:w-auto">
            <select
              value={category}
              onChange={(e) => updateParam("category", e.target.value)}
              className={`w-full appearance-none rounded-xl border bg-neutral-900 pl-5 pr-12 py-3 text-sm text-white outline-none cursor-pointer transition ${
                category !== "All Categories"
                  ? "border-lime-400 ring-1 ring-lime-400/40"
                  : "border-neutral-800"
              }`}
            >
              <option>All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          </div>

          {/* Sort */}
          <div className="relative min-w-[180px] w-full md:w-auto">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className={`w-full appearance-none rounded-xl border bg-neutral-900 pl-5 pr-12 py-3 text-sm text-white outline-none cursor-pointer transition ${
                sort !== "Featured"
                  ? "border-lime-400 ring-1 ring-lime-400/40"
                  : "border-neutral-800"
              }`}
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>

            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition cursor-pointer whitespace-nowrap"
            >
              <i className="fa-solid fa-xmark"></i>
              Clear
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-800">
            {category !== "All Categories" && (
              <span className="flex items-center gap-2 bg-lime-400/15 text-lime-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                {category}
                <button
                  onClick={() => updateParam("category", "All Categories")}
                  className="hover:text-white cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </span>
            )}
            {search.trim() && (
              <span className="flex items-center gap-2 bg-lime-400/15 text-lime-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                "{search}"
                <button
                  onClick={() => updateParam("search", "")}
                  className="hover:text-white cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </span>
            )}
            {sort !== "Featured" && (
              <span className="flex items-center gap-2 bg-lime-400/15 text-lime-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                {sort}
                <button
                  onClick={() => updateParam("sort", "Featured")}
                  className="hover:text-white cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </span>
            )}
          </div>
        )}
      </section>

      {/* Product grid */}
      {loading ? (
        <p className="text-neutral-400 text-center py-20">
          Loading products...
        </p>
      ) : error ? (
        <p className="text-red-400 text-center py-20">
          Failed to load products: {error}
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-neutral-400 text-center py-20">
          No products match your filters.
        </p>
      ) : (
        <section className="max-w-7xl mx-auto px-6 mt-8 pb-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Shop;
