import { useState } from "react";
import useFilterSort from "../hooks/useFilterSort";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import ProductToolbar from "../components/product/ProductToolbar";
import merchProducts from "../data/merchProducts";

// Mocking data - In real app, filter for jewellery box items
export const products = merchProducts.map((p, i) => ({ ...p, id: i + 1, priceValue: p.priceValue ?? Number(String(p.price).replace(/[^0-9]/g, '')), productType: p.productType ?? 'accessory', inStock: p.inStock ?? true }));

const JewelleryBox = () => {
    const [viewMode, setViewMode] = useState("grid-4");
    const allProducts = [...products, ...products.map(p => ({
        ...p,
        id: p.id + products.length,
        name: p.name + " (Rose Gold)",
        priceValue: p.priceValue + 800,
        price: `₹${p.priceValue + 800}`,
        inStock: !p.inStock,
        badge: p.badge ? null : "Rose Gold"
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
                    <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4 uppercase">Jewellery Box</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm mt-2">
                        Keep your treasures safe and organized.
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

export default JewelleryBox;
