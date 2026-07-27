import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { Auth } from "../context/AuthContext";
import Headphone3D from "../components/Headphone3D";

const CATEGORY_ICONS = {
  Electronics: "fa-laptop",
  Clothing: "fa-shirt",
  Furniture: "fa-couch",
  Home: "fa-house",
  Sports: "fa-basketball",
  Accessories: "fa-gem",
};

const CATEGORY_COLORS = {
  Electronics: "text-sky-500",
  Clothing: "text-orange-500",
  Furniture: "text-orange-500",
  Home: "text-orange-500",
  Sports: "text-orange-500",
  Accessories: "text-orange-500",
};

const Home = () => {
  const { products, loading } = useProducts();
  const { addToCart, cartCount, cartTotal } = useCart();
  const { loggedInUser } = useContext(Auth);

  // Count of products per category
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const categories = Object.keys(categoryCounts);

  // Highly rated = rating >= 4.5
  const topProductsCount = useMemo(
    () => products.filter((p) => p.rating >= 4.5).length,
    [products],
  );

  // Top 5 by rating
  const topRated = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [products],
  );

  // "New arrivals" = last 5 products returned by the API (highest ids)
  const newArrivals = useMemo(
    () => [...products].sort((a, b) => b.id - a.id).slice(0, 5),
    [products],
  );

  const hour = new Date().getHours();
  let greeting = "Good Evening";
  let emoji = "🌙";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    emoji = "🌅";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
    emoji = "☀️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
    emoji = "🌇";
  } else {
    greeting = "Good Night";
    emoji = "🌙";
  }

  return (
    <div className="bg-black bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pt-8">
      {/* Hero banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-neutral-950 border border-white rounded-2xl p-10 flex items-center justify-between gap-8">
          {/* Left side - text */}
          <div className="max-w-xl">
            <p className="text-lime-400 text-sm font-bold tracking-wide mb-3">
              {greeting} <span>{emoji}</span>
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
              Welcome,{" "}
              <span className="text-lime-400">
                {loggedInUser?.name?.split(" ")[0]}!
              </span>{" "}
              👋
            </h1>
            <p className="text-neutral-400 mb-7">
              Discover today's picks — hand-curated products across electronics,
              fashion, and more.
            </p>
            <div className="flex gap-3">
              <NavLink
                to="/shop"
                className="bg-lime-400 text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition"
              >
                Shop Now <i className="fa-solid fa-arrow-right"></i>
              </NavLink>
              <NavLink
                to="/shop"
                className="border border-neutral-700 text-white font-semibold px-6 py-3 rounded-lg hover:border-lime-400 transition"
              >
                View All Products
              </NavLink>
            </div>
          </div>

          {/* Right side - badges */}
          <div className="relative flex justify-center items-center flex-1">
            <div className="absolute w-[250px] h-[250px] rounded-full bg-lime-400/20 blur-[100px]" />
            <Headphone3D />
          </div>

          <div className="hidden lg:flex flex-col gap-4 flex-shrink-0">
            <div className="bg-lime-400/10 border border-lime-400/30 rounded-xl px-8 py-5 text-center min-w-[170px]">
              <p className="text-2xl font-bold text-lime-400">
                {loading ? "…" : `${products.length}+`}
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                Products Available
              </p>
            </div>
            <div className="border border-neutral-700 rounded-xl px-8 py-5 text-center min-w-[170px]">
              <p className="text-2xl font-bold text-white">Free</p>
              <p className="text-sm text-neutral-400 mt-1">Delivery on ₹999+</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-6 px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Cart Items */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex items-center gap-4">
          <span className="w-11 h-11 rounded-lg bg-lime-400/15 text-lime-400 flex items-center justify-center text-lg">
            <i className="fa-solid fa-box"></i>
          </span>
          <div>
            <p className="text-xl font-bold text-white">{cartCount}</p>
            <p className="text-sm text-white">Cart Items</p>
            <p className="text-xs text-neutral-500">In your bag</p>
          </div>
        </div>

        {/* Cart Value */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex items-center gap-4">
          <span className="w-11 h-11 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center text-lg">
            <i className="fa-solid fa-arrow-trend-up"></i>
          </span>
          <div>
            <p className="text-xl font-bold text-white">
              ${cartTotal.toFixed(2)}
            </p>
            <p className="text-sm text-white">Cart Value</p>
            <p className="text-xs text-neutral-500">Ready to checkout</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex items-center gap-4">
          <span className="w-11 h-11 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center text-lg">
            <i className="fa-solid fa-star"></i>
          </span>
          <div>
            <p className="text-xl font-bold text-white">
              {loading ? "…" : topProductsCount}
            </p>
            <p className="text-sm text-white">Top Products</p>
            <p className="text-xs text-neutral-500">Highly rated</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex items-center gap-4">
          <span className="w-11 h-11 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center text-lg">
            <i className="fa-solid fa-tag"></i>
          </span>
          <div>
            <p className="text-xl font-bold text-white">
              {loading ? "…" : categories.length}
            </p>
            <p className="text-sm text-white">Categories</p>
            <p className="text-xs text-neutral-500">To explore</p>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto mt-10 px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Shop by Category</h2>
          <NavLink to="/shop" className="text-lime-400 text-sm font-semibold">
            View All <i className="fa-solid fa-arrow-right"></i>
          </NavLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <NavLink
              to={`/shop?category=${encodeURIComponent(cat)}`}
              key={cat}
              className="bg-white rounded-xl p-8 text-center cursor-pointer hover:-translate-y-1 transition block"
            >
              <i
                className={`fa-solid ${
                  CATEGORY_ICONS[cat] || "fa-tag"
                } text-2xl ${CATEGORY_COLORS[cat] || "text-orange-500"} mb-3`}
              ></i>
              <p className="font-bold text-black">{cat}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {categoryCounts[cat]} items
              </p>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Top Rated & New Arrivals */}
      <section className="max-w-7xl mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {/* Top Rated */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 font-bold text-lg text-black">
              <i className="fa-solid fa-star text-amber-400"></i> Top Rated
            </h2>
            <NavLink to="/shop" className="text-lime-500 text-sm font-semibold">
              See all <i className="fa-solid fa-arrow-right"></i>
            </NavLink>
          </div>

          <div className="flex flex-col gap-3">
            {topRated.map((item) => (
              <NavLink
                to={`/product/${item.id}`}
                key={item.id}
                className="flex items-center gap-3 border border-neutral-200 rounded-lg px-3 py-3 hover:border-lime-400 transition cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-md object-cover bg-neutral-100"
                />
                <span className="flex-1 font-semibold text-lime-600 truncate">
                  {item.name}
                </span>
                <span className="font-semibold text-lime-600">
                  ${item.price}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(item, 1);
                    toast.success("Added to cart");
                  }}
                  className="w-8 h-8 rounded-md bg-lime-400/20 text-lime-600 flex items-center justify-center cursor-pointer"
                >
                  <i className="fa-solid fa-bag-shopping text-sm"></i>
                </button>
              </NavLink>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 font-bold text-lg text-black">
              <i className="fa-solid fa-bolt text-lime-500"></i> New Arrivals
            </h2>
            <NavLink to="/shop" className="text-lime-500 text-sm font-semibold">
              See all <i className="fa-solid fa-arrow-right"></i>
            </NavLink>
          </div>

          <div className="flex flex-col gap-3">
            {newArrivals.map((item) => (
              <NavLink
                to={`/product/${item.id}`}
                key={item.id}
                className="flex items-center gap-3 border border-neutral-200 rounded-lg px-3 py-3 hover:border-lime-400 transition cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-md object-cover bg-neutral-100"
                />
                <span className="flex-1 font-semibold text-lime-600 truncate">
                  {item.name}
                </span>
                <span className="font-semibold text-lime-600">
                  ${item.price}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(item, 1);
                    toast.success("Added to cart");
                  }}
                  className="w-8 h-8 rounded-md bg-lime-400/20 text-lime-600 flex items-center justify-center cursor-pointer"
                >
                  <i className="fa-solid fa-bag-shopping text-sm"></i>
                </button>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* Perks footer */}
      <section className="max-w-7xl mx-auto  px-6 grid grid-cols-1 md:grid-cols-3 gap-4 pb-12">
        <div className="bg-neutral-950 border border-white rounded-xl p-5 flex items-center gap-4">
          <i className="fa-solid fa-bolt text-lime-400 text-lg"></i>
          <div>
            <p className="font-semibold text-white text-l">Fast Delivery</p>
            <p className="text-xs text-neutral-500">Same-day on select items</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-white rounded-xl p-5 flex items-center gap-4">
          <i className="fa-solid fa-shield-halved text-blue-400 text-lg"></i>
          <div>
            <p className="font-semibold text-white text-l">Secure Payments</p>
            <p className="text-xs text-neutral-500">100% encrypted checkout</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-white rounded-xl p-5 flex items-center gap-4">
          <i className="fa-solid fa-tag text-lime-400 text-lg"></i>
          <div>
            <p className="font-semibold text-white text-l">Best Prices</p>
            <p className="text-xs text-neutral-500">Price-match guarantee</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
