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
    <div className="group flex flex-col overflow-hidden rounded-[28px] border border-lime-500/40 bg-[#171717] hover:border-lime-400 hover:-translate-y-1 transition-all duration-300">
      {/* Image + Title wrapped in Link */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative flex h-60 items-center justify-center bg-white p-5">
          <span className="absolute top-3 left-4 rounded-full bg-gray-500 px-3 py-1 text-xs font-semibold text-white capitalize">
            {product.category}
          </span>

          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col p-5">
          <p className="text-sm font-semibold capitalize text-gray-500">
            {product.category}
          </p>

          <h3 className="mt-2 h-14 overflow-hidden text-l font-bold leading-7 text-gray-300">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-1 mb-2">
            <div className="text-sm text-yellow-400">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
        </div>
      </Link>

      {/* Bottom Section (outside Link) */}
      <div className="flex items-center justify-between border-t border-neutral-800 px-5 py-4 mt-auto">
        <span className="text-xl font-bold text-lime-400">
          ${product.price}
        </span>

        {!isInCart ? (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 font-semibold text-black transition-all duration-200 hover:bg-lime-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping text-sm"></i>
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
              className="flex h-10 w-10 items-center justify-center text-lime-400 transition hover:bg-lime-400 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-minus text-xs"></i>
            </button>

            <span className="min-w-[40px] text-center font-semibold text-white">
              {qty}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                updateQty(product.id, qty + 1);
                toast.success("Quantity updated");
              }}
              className="flex h-10 w-10 items-center justify-center text-lime-400 transition hover:bg-lime-400 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-plus text-xs"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
