import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FiHeart } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/product/ProductCard";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <TopBar />
      <Header />

      <main className="flex-grow flex flex-col items-center py-24 px-6 sm:px-12 w-full max-w-[1440px] mx-auto font-sans">

        {wishlist && wishlist.length > 0 ? (
          <div className="w-full">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-3xl font-light tracking-wide text-gray-900 mb-2">
                Your Wishlist
              </h1>
              <p className="text-gray-500 text-[15px]">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {wishlist.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            {/* Wishlist Icon Placeholder */}
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100">
              <FiHeart className="w-8 h-8 text-gray-300 fill-gray-50" strokeWidth={1.5} />
            </div>

            <h1 className="text-3xl md:text-3xl font-light tracking-wide mb-4 text-gray-900">
              Your Wishlist is Empty
            </h1>

            <p className="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed mb-10">
              Looks like you haven't added anything to your wishlist yet. Discover our latest collections and find something you love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop-category"
                className="bg-black hover:bg-neutral-800 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
              >
                Explore Categories
              </Link>
              <Link
                to="/bestsellers"
                className="bg-white border text-black hover:bg-gray-50 border-gray-200 px-10 py-4 text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
              >
                View Bestsellers
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
