import { useState } from "react";
import useFilterSort from "../hooks/useFilterSort";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import ProductToolbar from "../components/product/ProductToolbar";
import merchProducts from "../data/merchProducts";

// Import Category Images
import cate1 from "../assets/images/cate/cate1.webp";
import cate2 from "../assets/images/cate/cate2.webp";
import cate3 from "../assets/images/cate/cate3.webp";
import cate4 from "../assets/images/cate/cate4.webp";
import cate5 from "../assets/images/cate/cate5.webp";
import cate6 from "../assets/images/cate/cate6.webp";
import cate7 from "../assets/images/cate/cate7.webp";
import cate8 from "../assets/images/cate/cate8.webp";
import cate9 from "../assets/images/cate/cate9.webp";
import cate10 from "../assets/images/cate/cate10.webp";
import cate11 from "../assets/images/cate/cate11.jpg";
import cate12 from "../assets/images/cate/cate12.webp";

const categoryImages = [
    cate1, cate2, cate3, cate4, cate5, cate6,
    cate7, cate8, cate9, cate10, cate11, cate12
];

// Create products from local images
export const products = categoryImages.map((img, i) => ({
    id: i + 1,
    // Alternate categories for demo
    name: i % 2 === 0 ? "Misha Handheld Bag" : "Misha Sling Bag",
    price: `₹${1800 + (i * 150)}`,
    priceValue: 1800 + (i * 150),
    productType: i % 2 === 0 ? "bag" : "sling",
    inStock: i % 4 !== 0,
    images: [img, img], // Using same image for hover
    badge: i === 0 ? "Bestseller" : (i === 5 ? "New" : null)
}));

const ShopCategory = () => {
    const [viewMode, setViewMode] = useState("grid-4");
    const allProducts = [...products, ...products.map(p => ({
        ...p,
        id: p.id + products.length,
        name: p.name.includes("Bag") ? p.name.replace("Bag", "Tote") : p.name + " - Variant",
        priceValue: p.priceValue + 200,
        price: `₹${p.priceValue + 200}`,
        inStock: !p.inStock,
        badge: p.badge ? null : "Trending"
    }))];
    const processedProducts = useFilterSort(allProducts);

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
                    <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4 uppercase">Shop Category</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                        Explore our curated collections.
                    </p>
                </div>

                {/* Toolbar */}
                <ProductToolbar
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    productCount={processedProducts.length}
                />
                {/* Product Grid */}
                <div className={`grid ${getGridClass()} gap-x-6 gap-y-12 transition-all duration-500`}>
                    {processedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            showThumbnails={true} // Enable thumbnails for this page
                        />
                    ))}
                </div>

                {/* Pagination / Load More */}
                <div className="mt-16 text-center">
                    <button className="px-8 py-3 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        Load More
                    </button>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default ShopCategory;
