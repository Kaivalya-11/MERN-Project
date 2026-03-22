import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import FilterDrawer from "./components/product/FilterDrawer";
import CartDrawer from "./components/commerce/CartDrawer";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import Bestsellers from "./pages/Bestsellers";
import NewArrivals from "./pages/NewArrivals";
import ShopCategory from "./pages/ShopCategory";
import HandbagsTotes from "./pages/HandbagsTotes";
import KidsCollection from "./pages/KidsCollection";
import JewelleryBox from "./pages/JewelleryBox";
import WatchShop from "./pages/WatchShop";
import Clothing from "./pages/Clothing"; // ← NEW // ← NEW // ← NEW // ← NEW // ← NEW // ← NEW
import Login from "./pages/Login";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Home />
            </motion.div>
          }
        />

        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <About />
            </motion.div>
          }
        />

        <Route
          path="/bestsellers"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Bestsellers />
            </motion.div>
          }
        />

        <Route
          path="/new-arrivals"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NewArrivals />
            </motion.div>
          }
        />

        <Route
          path="/shop-category"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShopCategory />
            </motion.div>
          }
        />

        <Route
          path="/handbags-totes"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HandbagsTotes />
            </motion.div>
          }
        />

        <Route
          path="/kids-collection"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <KidsCollection />
            </motion.div>
          }
        />

        <Route
          path="/jewellery-box"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <JewelleryBox />
            </motion.div>
          }
        />

        <Route
          path="/watch-and-shop"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WatchShop />
            </motion.div>
          }
        />

        <Route
          path="/clothing"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Clothing />
            </motion.div>
          }
        />

        <Route
          path="/product/:id"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductPage />
            </motion.div>
          }
        />

        <Route
          path="/login"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/account"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Account />
            </motion.div>
          }
        />
        <Route
          path="/cart"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CartPage />
            </motion.div>
          }
        />
        <Route
          path="/wishlist"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Wishlist />
            </motion.div>
          }
        />
        <Route
          path="/admin"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <FilterProvider>
            <BrowserRouter>
              <AnimatedRoutes />
              <FilterDrawer />
              <CartDrawer />
            </BrowserRouter>
          </FilterProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;