import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart, items, updateQty, setIsCartOpen } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const cartItem = product && items.find((i) => i.product.id === product.id);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const liked = product && isWishlisted(product.id);
  const [animateHeart, setAnimateHeart] = useState(false);

  const handleWishlist = () => {
    toggleWishlist(product);

    setAnimateHeart(true);

    setTimeout(() => {
      setAnimateHeart(false);
    }, 800);

    if (!liked) {
      toast.success("Product added to wishlist ❤️");
    } else {
      toast.info("Product removed from wishlist 💔");
    }
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, products.length);
  }, [products, product]);

  const currentIndex = products.findIndex((p) => p.id === product?.id);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex >= 0 && currentIndex < products.length - 1
      ? products[currentIndex + 1]
      : null;

  if (loading) {
    return <p className="text-white text-center py-20">Loading...</p>;
  }

  if (!product) {
    return <p className="text-white text-center py-20">Product not found.</p>;
  }
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-lime-400 hover:text-lime-300 cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Back to Shop
        </button>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link to="/shop" className="hover:text-white flex items-center gap-1">
            <i className="fa-solid fa-arrow-left text-xs"></i> Products
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-white rounded-2xl aspect-square flex items-center justify-center p-10">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <span className="inline-block bg-lime-400/15 text-lime-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold text-white mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-amber-400 text-lg mb-5">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
              <span className="text-neutral-400 font-semibold">
                {product.rating}
              </span>
              <span className="text-neutral-500">
                ({product.reviews} reviews)
              </span>
            </div>

            <hr className="border-white mb-5" />

            <p className="text-3xl font-bold text-lime-400 mb-5">
              ${product.price}
            </p>

            <hr className="border-white mb-5" />

            <p className="text-neutral-400 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Actions */}
            {cartItem ? (
              <div className="mb-3">
                <div className="flex items-center justify-between border border-white rounded-xl px-5 py-4 mb-3">
                  <span className="text-neutral-400 text-l">In cart:</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQty(product.id, cartItem.qty - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 text-lg font-semibold text-white transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <i className="fa-solid fa-minus text-sm"></i>
                    </button>

                    <span className="min-w-[32px] text-center text-lg font-semibold text-white">
                      {cartItem.qty}
                    </span>

                    <button
                      onClick={() => updateQty(product.id, cartItem.qty + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 text-lg font-semibold text-white transition-all duration-200 hover:border-lime-400 hover:bg-lime-400 hover:text-black hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <i className="fa-solid fa-plus text-sm"></i>
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mb-3">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-lime-400 bg-gradient-to-r from-lime-500/15 to-lime-400/10 py-4 text-lg font-semibold text-lime-300 transition-all hover:from-lime-500/25 hover:to-lime-400/20 hover:shadow-lg hover:shadow-lime-500/20 cursor-pointer"
                  >
                    <i className="fa-solid fa-check"></i>
                    Added to Cart
                  </button>
                  <button
                    onClick={handleWishlist}
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 text-xl transition-all cursor-pointer ${
                      liked
                        ? "border-red-400 text-red-400 bg-red-400/10"
                        : "border-neutral-800 text-neutral-600 hover:text-red-400 hover:border-red-400"
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <i
                        className={`${
                          liked ? "fa-solid fa-heart" : "fa-regular fa-heart"
                        } ${animateHeart ? "animate-heart" : ""}`}
                      ></i>

                      {animateHeart && (
                        <>
                          <span className="heart-particle heart1">❤</span>
                          <span className="heart-particle heart2">❤</span>
                          <span className="heart-particle heart3">❤</span>
                          <span className="heart-particle heart4">❤</span>
                          <span className="heart-particle heart5">❤</span>
                          <span className="heart-particle heart6">❤</span>
                          <span className="heart-particle heart7">❤</span>
                          <span className="heart-particle heart8">❤</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="group mb-6 w-full rounded-2xl border border-lime-500/40 bg-neutral-900 py-3 font-semibold text-white transition-all duration-300 hover:border-lime-400 hover:bg-lime-400 hover:text-black hover:shadow-lg hover:shadow-lime-500/20 active:scale-[0.98] cursor-pointer"
                >
                  View Cart
                  <i className="fa-solid fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                </button>
              </div>
            ) : (
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex-1 bg-lime-400 text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 text-xl transition-all cursor-pointer ${
                    liked
                      ? "border-red-400 text-red-400 bg-red-400/10"
                      : "border-neutral-800 text-neutral-600 hover:text-red-400 hover:border-red-400"
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <i
                      className={`${
                        liked ? "fa-solid fa-heart" : "fa-regular fa-heart"
                      } ${animateHeart ? "animate-heart" : ""}`}
                    ></i>

                    {animateHeart && (
                      <>
                        <span className="heart-particle heart1">❤</span>
                        <span className="heart-particle heart2">❤</span>
                        <span className="heart-particle heart3">❤</span>
                        <span className="heart-particle heart4">❤</span>
                        <span className="heart-particle heart5">❤</span>
                        <span className="heart-particle heart6">❤</span>
                        <span className="heart-particle heart7">❤</span>
                        <span className="heart-particle heart8">❤</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="border border-white rounded-2xl p-4 text-center">
                <i className="fa-solid fa-truck text-lime-400 mb-2"></i>
                <p className="text-white text-xs font-semibold">
                  Free Delivery
                </p>
                <p className="text-neutral-500 text-[11px]">On orders $50+</p>
              </div>
              <div className="border border-white rounded-2xl p-4 text-center">
                <i className="fa-solid fa-shield-halved text-lime-400 mb-2"></i>
                <p className="text-white text-xs font-semibold">Secure Pay</p>
                <p className="text-neutral-500 text-[11px]">256-bit SSL</p>
              </div>
              <div className="border border-white rounded-2xl p-4 text-center">
                <i className="fa-solid fa-rotate-left text-lime-400 mb-2"></i>
                <p className="text-white text-xs font-semibold">Easy Returns</p>
                <p className="text-neutral-500 text-[11px]">30-day policy</p>
              </div>
            </div>

            {/* Prev/Next */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  prevProduct && navigate(`/product/${prevProduct.id}`)
                }
                disabled={!prevProduct}
                className="flex-1 border border-neutral-700 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-lime-400 transition cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i> Previous
              </button>
              <button
                onClick={() =>
                  nextProduct && navigate(`/product/${nextProduct.id}`)
                }
                disabled={!nextProduct}
                className="flex-1 bg-lime-400 text-black font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-lime-300 transition cursor-pointer"
              >
                Next <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Related Products
          </h2>
          {relatedProducts.length === 0 ? (
            <p className="text-neutral-500">No related products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
