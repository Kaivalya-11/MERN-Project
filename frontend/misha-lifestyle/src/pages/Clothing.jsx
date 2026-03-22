import { useState } from "react";
import useFilterSort from "../hooks/useFilterSort";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import ProductToolbar from "../components/product/ProductToolbar";
import merchProducts from "../data/merchProducts";

// Import Clothing Images
import floraGreen from "../assets/images/clothing/flora-green.jpg";
import littleBlack from "../assets/images/clothing/little-black.jpg";
import mellowYellow from "../assets/images/clothing/mellow-yellow.jpg";
import roseMidi from "../assets/images/clothing/rose-midi.jpg";

const clothingImages = [
    { src: floraGreen, name: "Flora Green Dress", price: "₹3,200" },
    { src: littleBlack, name: "Little Black Dress", price: "₹2,800" },
    { src: mellowYellow, name: "Mellow Yellow Dress", price: "₹3,500" },
    { src: roseMidi, name: "Rose Midi Dress", price: "₹3,000" }
];

// Create products from local images
export const products = clothingImages.map((item, i) => ({
    id: i + 1,
    name: item.name,
    price: item.price,
    priceValue: Number(String(item.price).replace(/[^0-9]/g, '')),
    productType: 'clothing',
    inStock: i % 3 !== 0,
    images: [item.src, item.src], // Same image for hover
    badge: i === 0 ? "New" : (i === 1 ? "Bestseller" : null)
}));

const Clothing = () => {
    const [viewMode, setViewMode] = useState("grid-4");
    const allProducts = [...products, ...products.map(p => ({
        ...p,
        id: p.id + products.length,
        name: p.name + " (Premium)",
        priceValue: p.priceValue + 1000,
        price: `₹${p.priceValue + 1000}`,
        inStock: true,
        badge: p.badge ? null : "Premium"
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
                    <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4 uppercase">Clothing</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                        Discover our latest fashion collection.
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
                            showThumbnails={true}
                        />
                    ))}
                </div>

                {/* Pagination / Load More */}
                <div className="mt-16 text-center">
                    <div className="flex justify-center gap-2 text-xs font-medium text-gray-500 mb-4">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Clothing;
