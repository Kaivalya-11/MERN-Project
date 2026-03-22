import { useState } from "react";
import useFilterSort from "../hooks/useFilterSort";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import ProductToolbar from "../components/product/ProductToolbar";
import merchProducts from "../data/merchProducts";

// Import New Arrival Images
import new1 from "../assets/images/new/new1.webp";
import new2 from "../assets/images/new/new2.webp";
import new3 from "../assets/images/new/new3.webp";
import new4 from "../assets/images/new/new4.webp";
import new5 from "../assets/images/new/new5.webp";
import new6 from "../assets/images/new/new6.jpg";
import new7 from "../assets/images/new/new7.webp";
import new8 from "../assets/images/new/new8.webp";
import new9 from "../assets/images/new/new9.webp";
import new10 from "../assets/images/new/new10.webp";
import new11 from "../assets/images/new/new11.webp";
import new12 from "../assets/images/new/new12.jpg";

const newArrivalImages = [
    new1, new2, new3, new4, new5, new6,
    new7, new8, new9, new10, new11, new12
];

// Create products from local images
// For New Arrivals, we'll just use the order as is, or maybe reverse if desired.
// Let's keep it simple and just map them.
export const products = newArrivalImages.map((img, i) => ({
    id: i + 1,
    name: `Misha Fresh Collection ${i + 1}`,
    price: `₹${2200 + (i * 120)}`,
    priceValue: 2200 + (i * 120),
    productType: i % 3 === 0 ? "accessory" : "bag",
    inStock: i % 5 !== 0,
    images: [img, img], // Using same image for hover
    badge: i < 4 ? "Just In" : (i % 3 === 0 ? "Trending" : null)
}));

const NewArrivals = () => {
    const [viewMode, setViewMode] = useState("grid-4");
    const allProducts = [...products, ...products.map(p => ({
        ...p,
        id: p.id + products.length,
        name: p.name + " (Exclusive)",
        priceValue: p.priceValue + 300,
        price: `₹${p.priceValue + 300}`,
        inStock: true,
        badge: p.badge ? null : "Exclusive"
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
                    <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4 uppercase">New Arrivals</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                        Check out the latest additions to our collection. Stylish, sustainable, and handcrafted just for you.
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

export default NewArrivals;
