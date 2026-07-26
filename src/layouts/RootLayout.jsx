import { Outlet } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ProductsProvider } from "../context/ProductsContext";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import WishlistDrawer from "../components/WishlistDrawer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <Outlet />
            <CartDrawer />
            <WishlistDrawer />
          </WishlistProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
};

export default RootLayout;