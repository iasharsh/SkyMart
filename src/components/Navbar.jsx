import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const { loggedInUser, setLoggedInUser } = useContext(Auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-black border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 h-[76px] grid grid-cols-3 items-center">
        {" "}
        {/* Logo */}
        <div className="justify-self-start flex items-center gap-2 font-bold text-xl text-white">
          <span className="w-8 h-8 rounded-lg bg-lime-400 text-black flex items-center justify-center">
            <i className="fa-solid fa-bolt text-lg"></i>
          </span>
          Sky<span className="text-lime-400 -ml-1">Mart</span>
        </div>
        {/* Nav links */}
        <nav className="hidden md:flex justify-self-center items-center gap-10 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-1 transition-colors duration-300
   after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-lime-400
   after:transition-all after:duration-300
   ${
     isActive
       ? "text-lime-400 after:w-full"
       : "text-neutral-400 hover:text-white after:w-0 hover:after:w-full"
   }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `relative py-1 transition-colors duration-300
   after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-lime-400
   after:transition-all after:duration-300
   ${
     isActive
       ? "text-lime-400 after:w-full"
       : "text-neutral-400 hover:text-white after:w-0 hover:after:w-full"
   }`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-1 transition-colors duration-300
   after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-lime-400
   after:transition-all after:duration-300
   ${
     isActive
       ? "text-lime-400 after:w-full"
       : "text-neutral-400 hover:text-white after:w-0 hover:after:w-full"
   }`
            }
          >
            About
          </NavLink>
        </nav>
        {/* Right actions */}
        <div className="justify-self-end flex items-center gap-3">
          {loggedInUser && (
            <div className="hidden md:flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full pl-1.5 pr-3 py-1">
              <span className="w-6 h-6 rounded-full bg-lime-400 text-black text-xs font-bold flex items-center justify-center">
                {loggedInUser.name?.[0]?.toUpperCase() ?? "U"}
              </span>
              <span className="text-sm text-white">{loggedInUser.name}</span>
            </div>
          )}

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative w-10 h-10 rounded-lg border border-neutral-800 flex items-center justify-center hover:border-rose-500 transition cursor-pointer"
          >
            <i className="fa-solid fa-heart text-rose-500"></i>
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-lg border border-neutral-800 flex items-center justify-center hover:border-lime-400 transition cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping text-l text-lime-400"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-lime-400 text-black text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {loggedInUser && (
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-lg border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
            >
              <i className="fa-solid fa-right-from-bracket text-lg"></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
