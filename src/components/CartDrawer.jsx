import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CartDrawer = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-black border-l border-neutral-800 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 flex items-center justify-center">
              <i className="fa-solid fa-bag-shopping text-lime-400 text-lg"></i>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Cart</h2>
              <p className="text-xs text-neutral-400">{cartCount} items</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-xl hover:bg-neutral-800 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-neutral-400"></i>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8">
              <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
                <i className="fa-solid fa-bag-shopping text-5xl text-neutral-600"></i>
              </div>

              <h2 className="text-2xl font-bold text-white">
                Your cart is empty
              </h2>

              <p className="text-neutral-500 text-center mt-2 max-w-xs">
                Looks like you haven't added anything yet. Browse our latest
                products and start shopping.
              </p>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/shop");
                }}
                className="mt-8 flex items-center gap-3 rounded-xl bg-lime-500 px-6 py-3 font-semibold text-black transition hover:bg-lime-400 cursor-pointer"
              >
                <i className="fa-solid fa-store"></i>
                Browse Products
              </button>
            </div>
          ) : (
            items.map(({ product, qty }) => (
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

                    <p className="mt-1 text-xl font-bold text-lime-400">
                      ${(product.price * qty).toFixed(2)}
                      <span className="ml-2 text-xs font-normal text-neutral-500">
                        (${product.price} each)
                      </span>
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => {
                      updateQty(product.id, qty - 1);
                      toast.info("Quantity decreased");
                    }}
                    className="w-9 h-9 rounded-xl border border-neutral-700 text-white hover:border-red-500 hover:bg-red-500 hover:text-white transition cursor-pointer"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>

                  <span className="text-white font-semibold">{qty}</span>

                  <button
                    onClick={() => {
                      updateQty(product.id, qty + 1);
                      toast.success("Quantity updated");
                    }}
                    className="w-9 h-9 rounded-xl border border-neutral-700 text-white hover:border-lime-400 hover:bg-lime-400 hover:text-black transition cursor-pointer"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>

                  <button
                    onClick={() => {
                      removeFromCart(product.id);
                      toast.error("Removed from cart");
                    }}
                    className="ml-auto w-9 h-9 rounded-xl border border-neutral-700 text-neutral-400 hover:border-red-500 hover:text-red-500 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-800 px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-400">Total</span>
              <span className="text-2xl font-bold text-white">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                clearCart();
                setIsCartOpen(false);
                toast.success("Order placed successfully 🎉(Demo)");
              }}
              className="w-full rounded-xl bg-lime-500 py-3 font-semibold text-black hover:bg-lime-400 transition cursor-pointer mb-2"
            >
              <i className="fa-solid fa-arrow-right mr-2"></i>
              Checkout
            </button>
            <button
              onClick={() => {
                clearCart();
                toast.success("Cart cleared successfully!");
              }}
              className="w-full rounded-xl border border-red-500 py-3 font-medium text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
