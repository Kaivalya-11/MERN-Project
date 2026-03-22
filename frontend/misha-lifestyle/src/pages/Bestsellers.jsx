import { useState } from "react";
import useFilterSort from "../hooks/useFilterSort";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import ProductToolbar from "../components/product/ProductToolbar";
import merchProducts from "../data/merchProducts"; // Keeping for reference or fallback

// Import Bestseller Images
import best1 from "../assets/images/best/best1.jpg";
import best2 from "../assets/images/best/best2.webp";
import best3 from "../assets/images/best/best3.jpg";
import best4 from "../assets/images/best/best4.webp";
import best5 from "../assets/images/best/best5.jpg";
import best6 from "../assets/images/best/best6.webp";
import best7 from "../assets/images/best/best7.webp";
import best8 from "../assets/images/best/best8.jpg";
import best9 from "../assets/images/best/best9.webp";
import best10 from "../assets/images/best/best10.webp";
import best11 from "../assets/images/best/best11.webp";
import best12 from "../assets/images/best/best12.webp";

const bestsellerImages = [
    best1, best2, best3, best4, best5, best6,
    best7, best8, best9, best10, best11, best12
];

// Create products from local images
export const products = bestsellerImages.map((img, i) => ({
    id: i + 1,
    name: `Misha Signature Style ${i + 1}`,
    price: `₹${2000 + (i * 100)}`,
    priceValue: 2000 + (i * 100),
    productType: i % 3 === 0 ? 'accessory' : 'bag',
    inStock: i % 6 !== 0,
    images: [img, img], // Using same image for hover since we don't have pairs
    badge: i % 4 === 0 ? "Bestseller" : (i % 5 === 0 ? "Trending" : null)
}));

const Bestsellers = () => {
    const [viewMode, setViewMode] = useState("grid-4");
    const allProducts = [...products, ...products.map(p => ({
        ...p,
        id: p.id + products.length,
        name: p.name + " (Special Edition)",
        priceValue: p.priceValue + 500,
        price: `₹${p.priceValue + 500}`,
        inStock: !p.inStock,
        badge: p.badge ? null : "New"
    }))];
    const processedProducts = useFilterSort(allProducts);

    // Dynamic grid classes based on viewMode
    const getGridClass = () => {
        switch (viewMode) {
            case "grid-2": return "grid-cols-2";
            case "grid-3": return "grid-cols-2 md:grid-cols-3";
            case "grid-4": return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
            default: return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
        }
    };

    return (
        <>
            <TopBar />
            <Header />

            <main className="pt-24 pb-16 px-4 md:px-8 max-w-[1440px] mx-auto">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">BESTSELLERS</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                        Discover our most loved pieces. Handcrafted with care and designed to make a statement.
                    </p>
                </div>

                {/* Toolbar */}
                <ProductToolbar
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    productCount={processedProducts.length}
                />

                {/* Product Grid */}
                <div className={`grid ${getGridClass()} gap-x-6 gap-y-10 transition-all duration-500`}>
                    {processedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination / Load More */}
                <div className="mt-16 text-center">
                    <button className="border border-black px-8 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        Load More
                    </button>
                </div>

            </main>

            <Footer />
        </>
    );
};

export default Bestsellers;
