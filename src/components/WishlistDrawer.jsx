import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const WishlistDrawer = () => {
  const navigate = useNavigate();
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useWishlist();

  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div
      onClick={() => setIsWishlistOpen(false)}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-black border-l border-neutral-800 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <i className="fa-solid fa-heart text-rose-500 text-lg"></i>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Wishlist</h2>

              <p className="text-xs text-neutral-400">
                {wishlist.length} saved products
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-10 h-10 rounded-xl hover:bg-neutral-800 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-neutral-400"></i>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8">
              <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
                <i className="fa-solid fa-heart text-5xl text-rose-500"></i>
              </div>

              <h2 className="text-2xl font-bold text-white">
                Your wishlist is empty
              </h2>

              <p className="text-center text-neutral-500 mt-2 max-w-xs">
                Save products you love and they'll appear here for easy access
                later.
              </p>

              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigate("/shop");
                }}
                className="mt-8 flex items-center gap-3 rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-500 transition cursor-pointer"
              >
                <i className="fa-solid fa-heart"></i>
                Browse Products
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 hover:border-lime-400 transition"
              >
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-neutral-800"
                  />

                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{product.name}</h3>

                    <p className="text-neutral-500 text-xs mt-1">
                      {product.category}
                    </p>

                    <div className="flex items-center gap-2 text-amber-400 text-sm mt-2 mb-2">
                      {"★".repeat(Math.round(product.rating))}
                      {"☆".repeat(5 - Math.round(product.rating))}

                      <span className="text-white font-semibold">
                        {product.rating.toFixed(1)}
                      </span>

                      <span className="text-neutral-500">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <p className="mt-3 text-xl font-bold text-lime-400">
                      ${product.price}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                      toast.success("Moved to cart");
                    }}
                    className="flex-1 rounded-xl bg-lime-500 py-2.5 font-semibold text-black hover:bg-lime-400 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-cart-shopping mr-2"></i>
                    Move to Cart
                  </button>

                  <button
                    onClick={() => {
                      removeFromWishlist(product.id);
                      toast.error("Removed from wishlist");
                    }}
                    className="w-11 rounded-xl border border-neutral-700 text-neutral-400 hover:border-red-500 hover:text-red-500 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="border-t border-neutral-800 px-6 py-5">
            <button
              onClick={() => {
                clearWishlist();
                setIsWishlistOpen(false);
                toast.success("Wishlist cleared!");
              }}
              className="w-full rounded-xl border border-red-500 py-3 font-medium text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
