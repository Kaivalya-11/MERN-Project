import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

// Import Watch & Shop GIFs
import watch1 from "../assets/gifs/watch-1.gif";
import watch2 from "../assets/gifs/watch-2.gif";
import watch3 from "../assets/gifs/watch-3.gif";
import watch4 from "../assets/gifs/watch-4.gif";
import watch5 from "../assets/gifs/watch-5.gif";
import watch6 from "../assets/gifs/watch-6.gif";
import watch7 from "../assets/gifs/watch-7.gif";
import watch8 from "../assets/gifs/watch-8.gif";
import watch9 from "../assets/gifs/watch-9.gif";
import watch10 from "../assets/gifs/watch-10.gif";
import watch11 from "../assets/gifs/watch-11.gif";
import watch12 from "../assets/gifs/watch-12.gif";
// watch-13 is missing
import watch14 from "../assets/gifs/watch-14.gif";
import watch15 from "../assets/gifs/watch-15.gif";
import watch16 from "../assets/gifs/watch-16.gif";
import watch17 from "../assets/gifs/watch-17.gif";
import watch18 from "../assets/gifs/watch-18.gif";

const WatchShop = () => {
    const categories = [
        {
            title: "Cross Body Bags",
            items: [
                { id: 1, src: watch1, name: "Crossbody Style 1" },
                { id: 2, src: watch2, name: "Crossbody Style 2" },
                { id: 3, src: watch3, name: "Crossbody Style 3" },
                { id: 4, src: watch4, name: "Crossbody Style 4" },
                { id: 5, src: watch5, name: "Crossbody Style 5" }
            ]
        },
        {
            title: "Box Bags",
            items: [
                { id: 6, src: watch6, name: "Box Bag Style 1" },
                { id: 7, src: watch7, name: "Box Bag Style 2" },
                { id: 8, src: watch8, name: "Box Bag Style 3" },
                { id: 9, src: watch9, name: "Box Bag Style 4" }
            ]
        },
        {
            title: "Tote Bags",
            items: [
                { id: 10, src: watch10, name: "Tote Bag Style 1" },
                { id: 11, src: watch11, name: "Tote Bag Style 2" },
                { id: 12, src: watch12, name: "Tote Bag Style 3" },
                { id: 14, src: watch14, name: "Tote Bag Style 4" },
                { id: 15, src: watch15, name: "Tote Bag Style 5" }
            ]
        },
        {
            title: "Kids Collection",
            items: [
                { id: 16, src: watch16, name: "Kids Style 1" },
                { id: 17, src: watch17, name: "Kids Style 2" },
                { id: 18, src: watch18, name: "Kids Style 3" },
                { id: 19, src: watch16, name: "Kids Style 4" }
            ]
        }
    ];

    return (
        <>
            <TopBar />
            <Header />

            <main className="pt-24 pb-16 max-w-[1440px] mx-auto overflow-hidden">
                {/* Page Header */}
                <div className="text-center mb-12 px-4">
                    <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4 uppercase">Watch & Shop</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                        Experience our products in motion.
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-col gap-6">
                            {/* Category Title */}
                            <h2 className="text-2xl font-light text-center uppercase tracking-wider text-amber-900/80">
                                {category.title}
                            </h2>

                            {/* Horizontal Scroll Container */}
                            <div className="relative group">
                                {/* Left Fade/Arrow (Optional enhancement) */}

                                <div className="flex gap-4 overflow-x-auto pb-8 px-4 md:px-12 scrollbar-hide snap-x snap-mandatory">
                                    {category.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex-none w-[280px] md:w-[320px] aspect-[9/16] bg-gray-200 relative snap-center rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            {/* GIF Display */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                                                <img
                                                    src={item.src}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Overlay Content */}
                                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                                                <p className="font-medium text-lg mb-2">{item.name}</p>
                                                <button className="bg-white text-black text-xs px-6 py-2 uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors">
                                                    Shop Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Fade/Arrow (Optional enhancement) */}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default WatchShop;
