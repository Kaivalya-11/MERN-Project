import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import productsData from "../data/products"; // Fallback static data
import { FiMessageCircle, FiChevronDown, FiTruck, FiInfo, FiCalendar, FiStar, FiX } from "react-icons/fi"; // Simple icons for placeholders

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  // Try to grab the product dynamically passed from the ProductCard, otherwise fallback to static data
  const passedProduct = location.state?.product;
  const product = passedProduct || productsData.find((p) => p.id === Number(id)) || productsData.find((p) => String(p.id) === id);

  if (!product) {
    // Fallback UI if totally missing (like direct refresh on dynamic route)
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <TopBar />
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">Product not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle varying image data structures between our different mock products
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image || "https://placehold.co/800x800?text=No+Image"];

  // Add some fallback mock images if there's only one, just to simulate the thumbnail rail in the design
  const galleryImages = productImages.length > 1 ? productImages : [
    productImages[0],
    productImages[0],
    productImages[0],
    productImages[0],
    productImages[0]
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [purchaseType, setPurchaseType] = useState('product'); // 'product' or 'bundle'

  // Reviews State
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, text: "" });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) return;

    const newReview = {
      id: Date.now(),
      ...reviewForm,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setReviews([newReview, ...reviews]);
    setReviewForm({ name: "", rating: 5, text: "" });
    setShowReviewDrawer(false);
  };

  const actualPriceStr = product.price || "Rs. 2,499.00";
  // Just parsing some mock prices for the bundle logic
  const rawPrice = Number(actualPriceStr.replace(/[^0-9.-]+/g, "")) || 2499;
  const bundlePrice = `Rs. ${(rawPrice * 1.3).toLocaleString('en-IN')}.00`;
  const bundleOldPrice = `Rs. ${(rawPrice * 1.5).toLocaleString('en-IN')}.00`;

  const AccordionItem = ({ title }) => (
    <div className="border-b border-gray-200 py-4 flex justify-between items-center cursor-pointer hover:text-gray-600 transition-colors">
      <span className="text-[11px] font-medium tracking-widest uppercase text-gray-800">{title}</span>
      <span className="text-gray-400 font-light">+</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <TopBar />
      <Header />

      <main className="flex-grow w-full mx-auto pb-20">

        {/* Main Product Section */}
        <div className="max-w-[1440px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Left Side: Gallery */}
          <div className="flex gap-4 xl:gap-6 h-auto lg:sticky lg:top-4 items-start">
            {/* Thumbnails */}
            <div className="hidden lg:flex flex-col gap-3 w-[70px] flex-shrink-0 hide-scrollbar overflow-y-auto max-h-[700px]">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`cursor-pointer border-2 transition-colors ${activeImage === img ? 'border-gray-800' : 'border-transparent hover:border-gray-200'} bg-[#f2f2f2] aspect-[3/4] overflow-hidden`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main Large Image */}
            <div className="flex-grow bg-[#f8f8f8] flex items-center justify-center overflow-hidden h-[500px] sm:h-[600px] lg:h-[700px] w-full">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Mobile Thumbnails Scroll (visible below main image on small screens) */}
            <div className="flex lg:hidden gap-3 w-full overflow-x-auto hide-scrollbar absolute bottom-[-4rem] left-0 mt-4 px-6 snap-x">
              {/* Just adding basic horizontal thumbnails for mobile */}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col pt-2 lg:pt-0">
            <h1 className="text-2xl font-light tracking-widest uppercase mb-2 text-gray-900 leading-snug">
              {product.name}
            </h1>

            <p className="text-[15px] text-gray-500 mb-1">{product.price}</p>
            <p className="text-[11px] text-gray-400 tracking-wide mb-10">Inclusive of all taxes.</p>

            {/* Purchase Options */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Buy Product Option */}
              <div
                onClick={() => setPurchaseType('product')}
                className={`border rounded flex items-center justify-between p-4 cursor-pointer transition-colors ${purchaseType === 'product' ? 'border-gray-900 bg-gray-50/50 shadow-sm' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden p-1">
                    <img src={galleryImages[0]} alt="Product" className="w-full h-full object-cover rounded-sm" />
                  </div>
                  <span className="text-[13px] font-medium text-gray-800 tracking-wide">Buy The Product</span>
                </div>
                <span className="text-[13px] font-medium text-gray-900">{product.price}</span>
              </div>

              {/* Buy Bundle Option */}
              <div
                onClick={() => setPurchaseType('bundle')}
                className={`border rounded flex items-center justify-between p-4 cursor-pointer transition-colors ${purchaseType === 'bundle' ? 'border-gray-900 bg-gray-50/50 shadow-sm' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden p-1 flex relative">
                    {/* Simulated tiny bundle images */}
                    <img src={galleryImages[0]} alt="Bundle Base" className="w-full h-full object-cover rounded-sm absolute left-[-4px] rotate-[-5deg]" />
                    <img src={galleryImages[0]} alt="Bundle Top" className="w-1/2 h-1/2 object-cover rounded-sm border border-white absolute right-1 bottom-1 z-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium text-gray-800 tracking-wide mb-1">Buy The Bundle</span>
                    <span className="text-[10px] text-gray-500 tracking-wide flex items-center gap-1">Includes 👜 👝</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-medium text-gray-900 mb-0.5">{bundlePrice}</span>
                  <span className="text-[11px] text-gray-400 line-through">{bundleOldPrice}</span>
                </div>
              </div>
            </div>

            {/* Add To Cart */}
            <button
              onClick={() => addToCart(product)}
              className="w-full border border-gray-300 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              ADD TO CART
            </button>

            {/* Info Boxes */}
            <div className="border border-gray-200 divide-y divide-gray-200 mb-8 rounded-sm">
              <div className="flex items-center gap-4 p-4 text-gray-700">
                <FiTruck className="text-xl flex-shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium">Shipping and delivery</span>
                  <span className="text-[11px] text-gray-500 mt-0.5">Free shipping on all orders</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 text-gray-700">
                <FiInfo className="text-xl flex-shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium">No discount applicable on these products</span>
                  <span className="text-[11px] text-gray-500 mt-0.5">Shopper Bags are already discounted</span>
                </div>
              </div>
            </div>

            {/* Delivery Estimates */}
            <div className="border border-gray-200 flex mb-14 rounded-sm bg-gray-50/30 relative">
              <div className="flex flex-col items-center justify-center py-5 w-1/2 border-r border-gray-200">
                <FiCalendar className="text-gray-700 mb-2.5 text-xl" strokeWidth={1.5} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-800 mb-1.5">Ordered</span>
                <span className="text-[11px] text-gray-500 font-medium tracking-wide">FEB 22ND</span>
              </div>
              {/* Tiny arrow pointing right in center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-200 rotate-45 z-10 hidden sm:block"></div>

              <div className="flex flex-col items-center justify-center py-5 w-1/2 hover:bg-white transition-colors">
                <FiTruck className="text-gray-700 mb-2.5 text-xl" strokeWidth={1.5} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-800 mb-1.5">Est. Delivery Date</span>
                <span className="text-[11px] text-gray-500 font-medium tracking-wide">FEB 28TH - MAR 04TH</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="flex flex-col mb-10 border-t border-gray-200">
              <AccordionItem title="Description" />
              <AccordionItem title="Product Care" />
              <AccordionItem title="Discounts / Offers" />
              <AccordionItem title="Return / Exchange" />
              <AccordionItem title="International Shipping" />
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="border-t border-gray-200 max-w-[1440px] mx-auto mt-6"></div>
        <div className="max-w-[1440px] mx-auto px-6 py-20 pb-10">
          <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-gray-900 mb-2.5">Customer Reviews</h2>
              <div className="flex items-center gap-3">
                <div className="flex gap-1 text-black text-lg">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={reviews.length > 0 && star <= Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) ? "text-yellow-400" : "text-gray-300"}>
                      {reviews.length > 0 && star <= Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-[13px] text-gray-500">
                  {reviews.length > 0 ? `${reviews.length} Review${reviews.length > 1 ? 's' : ''}` : 'Be the first to write a review'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowReviewDrawer(true)}
              className="border border-gray-800 text-gray-800 px-6 py-2.5 text-[13px] hover:bg-gray-800 hover:text-white transition-colors"
            >
              Write a review
            </button>
          </div>

          {/* Display submitted reviews */}
          {reviews.length > 0 && (
            <div className="mt-10 flex flex-col gap-6 border-t border-gray-200 pt-10">
              {reviews.map((rev) => (
                <div key={rev.id} className="flex flex-col mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`text-sm ${star <= rev.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[14px] font-bold text-gray-900">{rev.name}</span>
                    <span className="text-[11px] text-gray-400">{rev.date}</span>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Floating Action Button (Chat bubble placeholder) */}
      <div className="fixed bottom-6 right-6 w-[56px] h-[56px] bg-[#4cc3b9] rounded-full flex items-center justify-center shadow-md text-white cursor-pointer hover:bg-teal-500 transition-colors z-[80] overflow-hidden">
        {/* Simplified Chat Icon to match screenshot's blue chat bubble */}
        <div className="relative flex items-center justify-center w-full h-full">
          <FiMessageCircle size={28} className="text-white fill-white" />
        </div>
      </div>

      {/* Write a Review Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-[998] transition-opacity duration-300 ${showReviewDrawer ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setShowReviewDrawer(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[999] shadow-2xl flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${showReviewDrawer ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <span className="text-[14px] tracking-[0.2em] font-medium text-gray-800 uppercase">WRITE A REVIEW</span>
          <button
            onClick={() => setShowReviewDrawer(false)}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <FiX size={24} strokeWidth={1} />
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6 flex-grow overflow-y-auto hide-scrollbar">
          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-6">

            {/* Product Snippet */}
            <div className="flex gap-4 items-center mb-4">
              <img src={activeImage} alt={product.name} className="w-16 h-16 object-cover bg-gray-50" />
              <span className="text-[13px] font-bold tracking-wide uppercase">{product.name}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] uppercase tracking-wide text-gray-600 font-medium">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors ${star <= reviewForm.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] uppercase tracking-wide text-gray-600 font-medium">Name</label>
              <input
                type="text"
                required
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                className="border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] uppercase tracking-wide text-gray-600 font-medium">Review</label>
              <textarea
                rows="5"
                required
                value={reviewForm.text}
                onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                className="border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                placeholder="Write your comments here"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 mt-4 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors shadow-none"
            >
              SUBMIT REVIEW
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
