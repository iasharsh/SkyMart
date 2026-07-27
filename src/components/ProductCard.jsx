import React from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart, items, updateQty, setIsCartOpen } = useCart();

  const cartItem = items.find((item) => item.product.id === product.id);
  const qty = cartItem?.qty || 0;
  const isInCart = !!cartItem;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
    toast.success("Added to cart");
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-[#171717] hover:border-lime-400 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(163,230,53,0.12)] transition-all duration-300 w-full">
      {/* Image + Title wrapped in Link */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative flex h-64 items-center justify-center bg-gradient-to-b from-neutral-100 to-white p-8 overflow-hidden">
          <span className="absolute top-3 left-4 rounded-full bg-gray-500 px-3 py-1 text-xs font-semibold text-white capitalize">
            {product.category}
          </span>

          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col p-4 sm:p-5">
          <p className="text-xs sm:text-sm font-semibold capitalize text-gray-500">
            {product.category}
          </p>

          <h3 className="mt-2 h-12 sm:h-14 overflow-hidden text-sm sm:text-base font-bold leading-6 sm:leading-7 text-gray-300">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-1 mb-2">
            <div className="text-xs sm:text-sm text-yellow-400">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-xs sm:text-sm text-gray-500">
              ({product.reviews})
            </span>
          </div>
        </div>
      </Link>

      {/* Bottom Section (outside Link) */}
      <div className="flex items-center justify-between border-t border-neutral-800 px-4 sm:px-5 py-3 sm:py-4 mt-auto gap-3">
        <span className="text-lg sm:text-xl font-bold text-lime-400">
          ${product.price}
        </span>

        {!isInCart ? (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-full bg-lime-400 px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-black text-xs sm:text-sm transition-all duration-200 hover:bg-lime-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping text-xs sm:text-sm"></i>
            Add
          </button>
        ) : (
          <div className="flex items-center overflow-hidden rounded-full border border-lime-400 bg-neutral-900">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateQty(product.id, qty - 1);
                toast.info("Quantity decreased");
              }}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center text-lime-400 transition hover:bg-lime-400 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-minus text-[10px] sm:text-xs"></i>
            </button>

            <span className="min-w-[32px] sm:min-w-[40px] text-center font-semibold text-white text-xs sm:text-sm">
              {qty}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateQty(product.id, qty + 1);
                toast.success("Quantity updated");
              }}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center text-lime-400 transition hover:bg-lime-400 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[10px] sm:text-xs"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
